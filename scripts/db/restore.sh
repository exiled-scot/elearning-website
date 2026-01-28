#!/bin/bash
# Database Restore Script for eLearning Application
# Restores the SQLite database from a backup

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DB_PATH="$PROJECT_ROOT/src/data/data.db"

# Determine environment (default to dev)
ENV="${1:-dev}"
BACKUP_FILE="$2"

if [[ "$ENV" != "dev" && "$ENV" != "prod" ]]; then
    echo "Usage: $0 [dev|prod] [backup_file]"
    echo "  dev  - Restore to development database (default)"
    echo "  prod - Restore to production database"
    echo ""
    echo "If backup_file is not specified, the most recent backup will be used."
    exit 1
fi

BACKUP_DIR="$PROJECT_ROOT/backups/$ENV"

# If no backup file specified, use the most recent
if [[ -z "$BACKUP_FILE" ]]; then
    BACKUP_FILE=$(ls -1t "$BACKUP_DIR"/data_*.db 2>/dev/null | head -n 1)
    if [[ -z "$BACKUP_FILE" ]]; then
        echo "Error: No backups found in $BACKUP_DIR"
        exit 1
    fi
    echo "Using most recent backup: $BACKUP_FILE"
else
    # If relative path, prepend backup directory
    if [[ ! "$BACKUP_FILE" = /* ]]; then
        BACKUP_FILE="$BACKUP_DIR/$BACKUP_FILE"
    fi
fi

# Check if backup file exists
if [[ ! -f "$BACKUP_FILE" ]]; then
    echo "Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Production safety check
if [[ "$ENV" == "prod" ]]; then
    echo ""
    echo "WARNING: You are about to restore the PRODUCTION database!"
    echo "Backup file: $BACKUP_FILE"
    echo ""
    read -p "Are you sure you want to continue? (yes/no): " CONFIRM
    if [[ "$CONFIRM" != "yes" ]]; then
        echo "Restore cancelled."
        exit 0
    fi
fi

# Create pre-restore backup
echo "Creating pre-restore backup..."
PRE_RESTORE_BACKUP="$BACKUP_DIR/pre_restore_$(date +"%Y%m%d_%H%M%S").db"
if [[ -f "$DB_PATH" ]]; then
    sqlite3 "$DB_PATH" ".backup '$PRE_RESTORE_BACKUP'"
    echo "Pre-restore backup created: $PRE_RESTORE_BACKUP"
else
    echo "No existing database found, skipping pre-restore backup"
fi

# Ensure database directory exists
mkdir -p "$(dirname "$DB_PATH")"

# Restore the database
echo "Restoring database from: $BACKUP_FILE"
cp "$BACKUP_FILE" "$DB_PATH"

# Verify the restored database
if sqlite3 "$DB_PATH" "SELECT 1;" > /dev/null 2>&1; then
    echo "Database restored and verified successfully!"
else
    echo "Error: Restored database appears to be corrupt"
    if [[ -f "$PRE_RESTORE_BACKUP" ]]; then
        echo "Attempting to restore from pre-restore backup..."
        cp "$PRE_RESTORE_BACKUP" "$DB_PATH"
    fi
    exit 1
fi

# Restart PocketBase if running in Docker
if docker ps --format '{{.Names}}' | grep -q "elearning-pocketbase"; then
    echo "Restarting PocketBase container..."
    docker restart elearning-pocketbase
    echo "PocketBase restarted"
fi

echo ""
echo "Restore complete!"
echo "Database: $DB_PATH"
