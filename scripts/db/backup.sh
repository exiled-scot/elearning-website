#!/bin/bash
# Database Backup Script for eLearning Application
# Creates timestamped backups of the SQLite database

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DB_PATH="$PROJECT_ROOT/src/data/data.db"
MAX_BACKUPS=10

# Determine environment (default to dev)
ENV="${1:-dev}"

if [[ "$ENV" != "dev" && "$ENV" != "prod" ]]; then
    echo "Usage: $0 [dev|prod]"
    echo "  dev  - Backup development database (default)"
    echo "  prod - Backup production database"
    exit 1
fi

BACKUP_DIR="$PROJECT_ROOT/backups/$ENV"

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Check if database exists
if [[ ! -f "$DB_PATH" ]]; then
    echo "Error: Database not found at $DB_PATH"
    exit 1
fi

# Create timestamped backup filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/data_${TIMESTAMP}.db"

echo "Creating backup of $ENV database..."
echo "Source: $DB_PATH"
echo "Destination: $BACKUP_FILE"

# Use SQLite's .backup command for consistency
# This ensures a consistent snapshot even if the database is in use
sqlite3 "$DB_PATH" ".backup '$BACKUP_FILE'"

if [[ -f "$BACKUP_FILE" ]]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "Backup created successfully: $BACKUP_FILE ($BACKUP_SIZE)"
else
    echo "Error: Backup failed"
    exit 1
fi

# Cleanup old backups (keep last MAX_BACKUPS)
echo "Cleaning up old backups (keeping last $MAX_BACKUPS)..."
cd "$BACKUP_DIR"
BACKUP_COUNT=$(ls -1 data_*.db 2>/dev/null | wc -l)

if [[ $BACKUP_COUNT -gt $MAX_BACKUPS ]]; then
    DELETE_COUNT=$((BACKUP_COUNT - MAX_BACKUPS))
    ls -1t data_*.db | tail -n $DELETE_COUNT | xargs rm -f
    echo "Removed $DELETE_COUNT old backup(s)"
fi

# List current backups
echo ""
echo "Current backups in $BACKUP_DIR:"
ls -lh data_*.db 2>/dev/null || echo "  No backups found"

echo ""
echo "Backup complete!"
