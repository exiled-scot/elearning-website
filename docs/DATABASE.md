# Database Management Guide

This guide covers database operations for the eLearning application using PocketBase/SQLite.

## Overview

The application uses PocketBase as the backend, which stores data in an SQLite database.

| Environment | Database Location | Backup Location |
|-------------|------------------|-----------------|
| Development | `src/data/data.db` | `backups/dev/` |
| Production | `src/data/data.db` | `backups/prod/` |

## Database Scripts

All database scripts are located in `scripts/db/`:

| Script | Purpose |
|--------|---------|
| `backup.sh` | Create timestamped database backups |
| `restore.sh` | Restore database from a backup |
| `seed-dev.sh` | Initialize dev database from production data |

### Backup

Create a backup of the database:

```bash
# Backup development database (default)
npm run db:backup dev

# Backup production database
npm run db:backup prod
```

Backups are:
- Stored with timestamps: `data_YYYYMMDD_HHMMSS.db`
- Auto-cleaned (keeps last 10)
- Created using SQLite's `.backup` command for consistency

### Restore

Restore from a backup:

```bash
# Restore development (uses most recent backup)
npm run db:restore dev

# Restore production (requires confirmation)
npm run db:restore prod

# Restore from specific backup file
npm run db:restore dev data_20240115_120000.db
```

Safety features:
- Creates pre-restore backup automatically
- Requires explicit confirmation for production
- Verifies database integrity after restore
- Restarts PocketBase container if running

### Seed Development Database

Create a development database from production data:

```bash
npm run db:seed-dev
```

This script:
1. Copies the latest production backup
2. Sanitizes sensitive data:
   - Emails changed to `[id]@test.elearning.local`
   - Names changed to `Test User [id]`
3. Verifies database integrity

## Manual Database Access

### Using SQLite CLI

```bash
# Open database
sqlite3 src/data/data.db

# Common commands
.tables           # List all tables
.schema users     # Show table schema
.headers on       # Show column headers
.mode column      # Column output mode

# Example queries
SELECT * FROM users LIMIT 5;
SELECT COUNT(*) FROM courses;
```

### Docker Access

If running in Docker:

```bash
# Execute SQLite in container
docker exec -it elearning-pocketbase sqlite3 /pb_data/data.db

# Copy database from container
docker cp elearning-pocketbase:/pb_data/data.db ./backup.db
```

## PocketBase Admin

Access the admin interface at:
- Development: `http://localhost:5002/_/`
- Production: `https://elearning-api.nihilanth.co.uk/_/`

## Schema Reference

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique identifier |
| username | TEXT | User's username |
| email | TEXT | Email address |
| name | TEXT | Display name |
| created | DATETIME | Creation timestamp |
| updated | DATETIME | Last update timestamp |

### Courses Table

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique identifier |
| title | TEXT | Course title |
| description | TEXT | Course description |
| instructor | TEXT | Instructor name |
| image | TEXT | Image filename |
| categories | TEXT | JSON array of categories |
| content | TEXT | Course content |
| courseContent | TEXT | JSON array of modules |
| requirements | TEXT | JSON array of prerequisites |
| reviews | TEXT | JSON array of reviews |
| created | DATETIME | Creation timestamp |

### Instructors Table

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique identifier |
| name | TEXT | Instructor name |
| title | TEXT | Professional title |
| about | TEXT | Bio/description |
| social_media | TEXT | JSON object of social links |
| profilePhoto | TEXT | Photo filename |

## Backup Strategy

### Development
- Backups created manually as needed
- Seed from production regularly for realistic data
- Safe to delete and recreate

### Production
- Automatic backup before each deployment (via Jenkins)
- Keep last 10 backups
- Store critical backups externally (recommended)

### Recommended Schedule

```
Daily (cron):
0 2 * * * /path/to/scripts/db/backup.sh prod

Before deployments:
npm run db:backup prod
```

## Migration Workflow

When making schema changes:

1. **Create backup**
   ```bash
   npm run db:backup prod
   ```

2. **Make changes in PocketBase Admin**
   - Add/modify collections
   - Update field types
   - Add indexes

3. **Test thoroughly**
   - Verify API responses
   - Check application functionality

4. **Document changes**
   - Update this guide
   - Note breaking changes

## Troubleshooting

### Database is locked

```bash
# Stop PocketBase container
docker stop elearning-pocketbase

# Perform operations
sqlite3 src/data/data.db "..."

# Restart container
docker start elearning-pocketbase
```

### Corrupt database

```bash
# Check integrity
sqlite3 src/data/data.db "PRAGMA integrity_check;"

# If corrupt, restore from backup
npm run db:restore dev
```

### Changes not visible

PocketBase caches data in memory. After direct database modifications:

```bash
docker restart elearning-pocketbase
```

### Permission denied

Ensure proper permissions:

```bash
chmod 644 src/data/data.db
chmod 755 scripts/db/*.sh
```

## Important Notes

1. **Never commit database files** - They're in `.gitignore`
2. **Always backup before modifications** - Use the scripts
3. **Restart PocketBase after direct changes** - Memory caching
4. **Test restores periodically** - Verify backups work
5. **Keep production backups secure** - Contains user data
