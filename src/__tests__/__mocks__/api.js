/**
 * API Mock Utilities for Testing
 *
 * Provides mock data and functions for testing components
 * that interact with the PocketBase API.
 */

// Mock course data
export const mockCourses = [
  {
    id: 'course1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React development',
    instructor: 'John Doe',
    image: 'react-course.jpg',
    categories: ['Programming'],
    collectionName: 'courses',
    content: 'Course content here',
    courseContent: ['Module 1', 'Module 2'],
    created: '2024-01-01T00:00:00Z',
    requirements: ['Basic JavaScript knowledge'],
    reviews: []
  },
  {
    id: 'course2',
    title: 'Advanced Python',
    description: 'Master Python programming techniques',
    instructor: 'Jane Smith',
    image: 'python-course.jpg',
    categories: ['Programming'],
    collectionName: 'courses',
    content: 'Advanced Python content',
    courseContent: ['Module 1', 'Module 2', 'Module 3'],
    created: '2024-01-15T00:00:00Z',
    requirements: ['Basic Python knowledge'],
    reviews: []
  },
  {
    id: 'course3',
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, and JavaScript',
    instructor: 'Bob Wilson',
    image: 'web-dev-course.jpg',
    categories: ['Technology'],
    collectionName: 'courses',
    content: 'Web development basics',
    courseContent: ['HTML', 'CSS', 'JavaScript'],
    created: '2024-02-01T00:00:00Z',
    requirements: [],
    reviews: []
  }
];

// Mock user data
export const mockUsers = [
  {
    id: 'user1',
    username: 'johndoe',
    email: 'john@example.com',
    name: 'John Doe'
  },
  {
    id: 'user2',
    username: 'janesmith',
    email: 'jane@example.com',
    name: 'Jane Smith'
  }
];

// Mock instructor data
export const mockInstructors = [
  {
    id: 'instructor1',
    name: 'John Doe',
    title: 'Senior Developer',
    about: 'Experienced React developer with 10+ years of experience',
    social_media: { twitter: '@johndoe', linkedin: 'johndoe' },
    profilePhoto: 'john-profile.jpg'
  },
  {
    id: 'instructor2',
    name: 'Jane Smith',
    title: 'Python Expert',
    about: 'Data scientist and Python instructor',
    social_media: { twitter: '@janesmith' },
    profilePhoto: 'jane-profile.jpg'
  }
];

// Mock authentication data
export const mockAuthData = {
  token: 'mock-jwt-token-12345',
  record: {
    id: 'user1',
    username: 'testuser',
    email: 'test@example.com',
    name: 'Test User'
  }
};

// Mock getRecords function
export const mockGetRecords = jest.fn((endpoint) => {
  switch (endpoint) {
    case 'courses':
      return Promise.resolve(mockCourses);
    case 'users':
      return Promise.resolve(mockUsers);
    case 'instructors':
      return Promise.resolve(mockInstructors);
    default:
      return Promise.resolve([]);
  }
});

// Mock authentication functions
export const mockAuthenticate = jest.fn((email, password) => {
  if (email === 'test@example.com' && password === 'password123') {
    return Promise.resolve(mockAuthData);
  }
  return Promise.reject(new Error('Authentication failed'));
});

export const mockLogout = jest.fn(() => {
  // Clear any mock state
});

export const mockIsAuthenticated = jest.fn(() => false);

export const mockGetToken = jest.fn(() => null);

export const mockGetUserId = jest.fn(() => null);

// Setup function to reset all mocks
export const resetMocks = () => {
  mockGetRecords.mockClear();
  mockAuthenticate.mockClear();
  mockLogout.mockClear();
  mockIsAuthenticated.mockClear();
  mockGetToken.mockClear();
  mockGetUserId.mockClear();
};

// Mock the api module
export const mockApiModule = {
  BASE_URL: 'http://localhost:5002',
  getRecords: mockGetRecords
};

// Mock the auth module
export const mockAuthModule = {
  authenticate: mockAuthenticate,
  logout: mockLogout,
  isAuthenticated: mockIsAuthenticated,
  getToken: mockGetToken,
  getUserId: mockGetUserId
};
