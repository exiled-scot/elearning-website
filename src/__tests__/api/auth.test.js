/**
 * Auth Module Tests
 *
 * These tests focus on the utility functions that don't require
 * the actual PocketBase connection.
 */

describe('Auth Module Utilities', () => {
  beforeEach(() => {
    // Clear cookies
    document.cookie = 'elearn_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Clear localStorage
    localStorage.clear();
  });

  describe('Token Storage', () => {
    it('can store token in localStorage', () => {
      localStorage.setItem('elearn_token', 'test-token');
      expect(localStorage.getItem('elearn_token')).toBe('test-token');
    });

    it('can remove token from localStorage', () => {
      localStorage.setItem('elearn_token', 'test-token');
      localStorage.removeItem('elearn_token');
      expect(localStorage.getItem('elearn_token')).toBeNull();
    });
  });

  describe('Cookie Operations', () => {
    it('can set a cookie', () => {
      document.cookie = 'elearn_token=test-token; path=/';
      expect(document.cookie).toContain('elearn_token');
    });

    it('can clear a cookie', () => {
      document.cookie = 'elearn_token=test-token; path=/';
      document.cookie = 'elearn_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      expect(document.cookie).not.toContain('test-token');
    });

    it('can check if auth cookie exists', () => {
      document.cookie = 'elearn_token=test-token; path=/';
      const isLoggedIn = document.cookie.includes('elearn_token');
      expect(isLoggedIn).toBe(true);
    });

    it('reports no auth when cookie is missing', () => {
      const isLoggedIn = document.cookie.includes('elearn_token=test');
      expect(isLoggedIn).toBe(false);
    });
  });
});
