# Development Guide

This guide covers the development workflow for the eLearning application.

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git
- SQLite3 (for database scripts)

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd elearning-website
npm install
```

### 2. Environment Setup

Copy the environment template and configure:

```bash
cp .env.example .env.development
```

Edit `.env.development` with your local settings.

### 3. Start Development Server

```bash
npm start
```

The app runs at `http://localhost:3000`

## Branch Strategy

We use a GitFlow-inspired branching model:

| Branch | Purpose |
|--------|---------|
| `master` | Production-ready code |
| `development` | Integration branch for features |
| `feature/*` | New features |
| `bugfix/*` | Bug fixes |
| `hotfix/*` | Urgent production fixes |

### Workflow

1. **Feature Development**
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/my-feature
   # ... make changes ...
   git push -u origin feature/my-feature
   # Create PR to development
   ```

2. **Bug Fixes**
   ```bash
   git checkout development
   git checkout -b bugfix/fix-description
   # ... fix bug ...
   git push -u origin bugfix/fix-description
   # Create PR to development
   ```

3. **Hotfixes** (urgent production fixes)
   ```bash
   git checkout master
   git checkout -b hotfix/critical-fix
   # ... fix issue ...
   git push -u origin hotfix/critical-fix
   # Create PRs to both master AND development
   ```

## Code Quality

### Linting

```bash
npm run lint
```

### Testing

```bash
# Run tests in watch mode
npm test

# Run tests once with coverage
npm run test:ci

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

## Project Structure

```
elearning-website/
├── config/                 # Configuration files
│   ├── jest.config.js     # Jest configuration
│   └── playwright.config.js # Playwright configuration
├── docs/                   # Documentation
├── scripts/               # Utility scripts
│   └── db/               # Database management
├── src/
│   ├── __tests__/        # Test files
│   │   ├── __mocks__/    # Test mocks
│   │   ├── api/          # API tests
│   │   ├── components/   # Component tests
│   │   ├── e2e/          # E2E tests (Playwright)
│   │   └── integration/  # Integration tests
│   ├── api/              # API modules
│   ├── components/       # React components
│   ├── pages/            # Page components
│   └── utils/            # Utility functions
├── Jenkinsfile           # CI/CD pipeline
├── docker-compose.prod.yml # Production Docker config
└── package.json
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | PocketBase API URL | `http://127.0.0.1:5002` |
| `E2E_BASE_URL` | Base URL for E2E tests | `http://localhost:3000` |

## Docker Development

### Build and run locally:

```bash
docker compose -f docker-compose.prod.yml up --build
```

### Restart PocketBase after database changes:

```bash
docker restart elearning-pocketbase
```

## Commit Guidelines

Follow conventional commit format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Example:
```
feat: add course enrollment functionality

- Add enrollment button to course page
- Create enrollment API endpoint
- Add success/error notifications
```

## Getting Help

- Check the [Testing Guide](TESTING.md) for testing procedures
- Check the [Database Guide](DATABASE.md) for database management
- Create an issue for bugs or feature requests
