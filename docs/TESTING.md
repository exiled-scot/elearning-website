# Testing Guide

This guide covers the testing infrastructure and practices for the eLearning application.

## Overview

We use a multi-layered testing approach:

| Layer | Framework | Purpose |
|-------|-----------|---------|
| Unit | Jest + React Testing Library | Component and function tests |
| Integration | Jest | Route and feature flow tests |
| E2E | Playwright | Full browser automation tests |

## Running Tests

### Unit & Integration Tests

```bash
# Watch mode (development)
npm test

# Single run with coverage (CI)
npm run test:ci

# Run specific test file
npm test -- Card.test.js

# Run tests matching pattern
npm test -- --testPathPattern=components
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run specific test file
npm run test:e2e -- navigation.spec.js

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run specific browser
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit
```

### All Tests

```bash
npm run test:all
```

## Test Structure

```
src/__tests__/
├── __mocks__/
│   ├── api.js           # API mock data and functions
│   ├── fileMock.js      # Asset file mock
│   └── pocketbase.js    # PocketBase mock
├── components/
│   ├── Card.test.js     # Card component tests
│   ├── Header.test.js   # Header component tests
│   └── Login.test.js    # Login component tests
├── api/
│   ├── api.test.js      # API module tests
│   └── auth.test.js     # Authentication tests
├── integration/
│   ├── routes.test.js   # Route rendering tests
│   └── auth.test.js     # Auth flow integration tests
└── e2e/
    ├── navigation.spec.js    # Navigation E2E tests
    └── course-flow.spec.js   # Course browsing E2E tests
```

## Writing Tests

### Component Tests

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MyComponent from '../../components/MyComponent';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('MyComponent', () => {
  it('renders correctly', () => {
    renderWithRouter(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    renderWithRouter(<MyComponent />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Result')).toBeInTheDocument();
  });
});
```

### API Tests

```javascript
import { getRecords } from '../../api/api';

global.fetch = jest.fn();

describe('API', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches records correctly', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ items: [{ id: '1' }] })
    });

    const result = await getRecords('courses');
    expect(result).toHaveLength(1);
  });
});
```

### E2E Tests

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Feature', () => {
  test('user can complete action', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Action")');
    await expect(page).toHaveURL('/result');
  });
});
```

## Mocking

### API Mocks

Located in `src/__tests__/__mocks__/api.js`:

```javascript
import { mockCourses, mockUsers, mockGetRecords } from '../__mocks__/api';

// Use in tests
jest.mock('../../api/api', () => ({
  getRecords: mockGetRecords
}));
```

### PocketBase Mock

Located in `src/__tests__/__mocks__/pocketbase.js`:

```javascript
jest.mock('pocketbase', () => require('../__mocks__/pocketbase'));
```

## Coverage

Coverage reports are generated in `coverage/` directory:

- `coverage/lcov-report/index.html` - HTML report
- `coverage/lcov.info` - LCOV format for CI tools

### Coverage Thresholds

Currently configured minimums (in `config/jest.config.js`):
- Branches: 30%
- Functions: 30%
- Lines: 30%
- Statements: 30%

These thresholds can be increased as test coverage improves.

## CI Integration

Tests run automatically in Jenkins pipeline:

1. **All branches**: Unit and integration tests
2. **development, master, PRs**: E2E tests also run

Test reports are published to Jenkins:
- Coverage Report (HTML)
- E2E Test Report (Playwright HTML)

## Debugging Tests

### Jest Tests

```bash
# Debug with node inspector
node --inspect-brk node_modules/.bin/jest --runInBand

# Verbose output
npm test -- --verbose
```

### Playwright Tests

```bash
# Debug mode
npm run test:e2e -- --debug

# UI mode (interactive)
npx playwright test --ui

# Generate trace
npm run test:e2e -- --trace on
```

## Best Practices

1. **Test behavior, not implementation** - Focus on what users see and do
2. **Use descriptive test names** - `it('shows error when login fails')`
3. **One assertion focus per test** - Keep tests focused and readable
4. **Arrange-Act-Assert pattern** - Structure tests clearly
5. **Mock external dependencies** - API calls, timers, etc.
6. **Clean up after tests** - Reset mocks, clear state
7. **Test edge cases** - Empty states, errors, loading

## Troubleshooting

### Common Issues

**Tests hang or timeout:**
- Check for unresolved promises
- Ensure mocks are properly configured
- Increase timeout if needed

**Module not found:**
- Check import paths
- Verify mock file locations

**React warnings:**
- Wrap state updates in `act()`
- Use `waitFor` for async operations

**E2E tests fail in CI:**
- Check if app is running
- Verify selectors haven't changed
- Review screenshots in test report
