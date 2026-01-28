/**
 * PocketBase Mock for Testing
 */

const mockAuthStore = {
  isValid: false,
  token: null,
  model: null,
  clear: jest.fn()
};

const mockCollection = {
  authWithPassword: jest.fn((email, password) => {
    if (email === 'test@example.com' && password === 'password123') {
      mockAuthStore.isValid = true;
      mockAuthStore.token = 'mock-token';
      mockAuthStore.model = { id: 'user1', email, username: 'testuser' };
      return Promise.resolve({
        token: 'mock-token',
        record: mockAuthStore.model
      });
    }
    return Promise.reject(new Error('Authentication failed'));
  }),
  getList: jest.fn(() => Promise.resolve({ items: [], totalItems: 0 })),
  getOne: jest.fn(() => Promise.resolve({})),
  create: jest.fn(() => Promise.resolve({})),
  update: jest.fn(() => Promise.resolve({})),
  delete: jest.fn(() => Promise.resolve(true))
};

class MockPocketBase {
  constructor(url) {
    this.baseUrl = url;
    this.authStore = mockAuthStore;
  }

  collection(name) {
    return mockCollection;
  }
}

// Export for use in tests
MockPocketBase.mockAuthStore = mockAuthStore;
MockPocketBase.mockCollection = mockCollection;
MockPocketBase.resetMocks = () => {
  mockAuthStore.isValid = false;
  mockAuthStore.token = null;
  mockAuthStore.model = null;
  mockAuthStore.clear.mockClear();
  Object.values(mockCollection).forEach(fn => fn.mockClear && fn.mockClear());
};

module.exports = MockPocketBase;
