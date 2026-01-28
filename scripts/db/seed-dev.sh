#!/bin/bash
# Development Database Seeding Script for eLearning Application
# Copies production backup and sanitizes sensitive data

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DB_PATH="$PROJECT_ROOT/src/data/data.db"
PROD_BACKUP_DIR="$PROJECT_ROOT/backups/prod"

# Get production backup to use
BACKUP_FILE="$1"

echo "eLearning Development Database Seeder"
echo "======================================"
echo ""

# If no backup file specified, use the most recent production backup
if [[ -z "$BACKUP_FILE" ]]; then
    BACKUP_FILE=$(ls -1t "$PROD_BACKUP_DIR"/data_*.db 2>/dev/null | head -n 1)
    if [[ -z "$BACKUP_FILE" ]]; then
        echo "Error: No production backups found in $PROD_BACKUP_DIR"
        echo "Please run 'npm run db:backup prod' first"
        exit 1
    fi
    echo "Using most recent production backup: $BACKUP_FILE"
else
    # If relative path, prepend backup directory
    if [[ ! "$BACKUP_FILE" = /* ]]; then
        BACKUP_FILE="$PROD_BACKUP_DIR/$BACKUP_FILE"
    fi
fi

# Check if backup file exists
if [[ ! -f "$BACKUP_FILE" ]]; then
    echo "Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Ensure database directory exists
mkdir -p "$(dirname "$DB_PATH")"

# Backup existing dev database if it exists
if [[ -f "$DB_PATH" ]]; then
    DEV_BACKUP="$PROJECT_ROOT/backups/dev/pre_seed_$(date +"%Y%m%d_%H%M%S").db"
    mkdir -p "$PROJECT_ROOT/backups/dev"
    echo "Backing up existing dev database to: $DEV_BACKUP"
    cp "$DB_PATH" "$DEV_BACKUP"
fi

# Copy production backup to dev
echo "Copying production backup to development..."
cp "$BACKUP_FILE" "$DB_PATH"

# Sanitize sensitive data
echo "Sanitizing sensitive data..."

# Update user emails to test emails (keeping the structure)
sqlite3 "$DB_PATH" <<EOF
-- Sanitize user emails (replace domain with test domain)
UPDATE users SET email = id || '@test.elearning.local' WHERE email IS NOT NULL;

-- Reset all passwords to a standard test password hash
-- Note: This is a placeholder - actual implementation depends on PocketBase's password format
-- Users will need to use 'testpassword123' or reset their passwords

-- Sanitize any other PII fields if they exist
UPDATE users SET name = 'Test User ' || substr(id, 1, 8) WHERE name IS NOT NULL;

-- Log the sanitization
SELECT 'Sanitized ' || changes() || ' user records';
EOF

# Verify database integrity
echo "Verifying database integrity..."
if sqlite3 "$DB_PATH" "PRAGMA integrity_check;" | grep -q "ok"; then
    echo "Database integrity check passed"
else
    echo "Warning: Database integrity check found issues"
fi

# Display summary
echo ""
echo "Seeding complete!"
echo "================"
echo "Database location: $DB_PATH"
echo ""
echo "User accounts have been sanitized:"
echo "  - Emails changed to [id]@test.elearning.local"
echo "  - Names changed to 'Test User [id]'"
echo ""
echo "Note: You may need to restart the development server for changes to take effect."

# Restart PocketBase if running in Docker (dev mode)
if docker ps --format '{{.Names}}' | grep -q "elearning-pocketbase"; then
    echo ""
    read -p "Restart PocketBase container? (y/n): " RESTART
    if [[ "$RESTART" == "y" || "$RESTART" == "Y" ]]; then
        docker restart elearning-pocketbase
        echo "PocketBase restarted"
    fi
fi
