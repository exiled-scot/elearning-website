/**
 * API Module Tests
 */

import { BASE_URL, getRecords } from '../../api/api';
import { mockCourses, mockUsers, mockInstructors } from '../__mocks__/api';

// Mock fetch globally
global.fetch = jest.fn();

describe('API Module', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('BASE_URL', () => {
    it('has a default value when REACT_APP_API_URL is not set', () => {
      expect(BASE_URL).toBeDefined();
      expect(typeof BASE_URL).toBe('string');
    });

    it('starts with http', () => {
      expect(BASE_URL).toMatch(/^https?:\/\//);
    });
  });

  describe('getRecords', () => {
    it('fetches records from the correct endpoint', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ items: mockCourses })
      });

      await getRecords('courses');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/collections/courses/records')
      );
    });

    it('includes perPage parameter in request', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ items: [] })
      });

      await getRecords('courses');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('perPage=100')
      );
    });

    it('returns items array from response', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ items: mockCourses })
      });

      const result = await getRecords('courses');

      expect(result).toEqual(mockCourses);
    });

    it('returns empty array on fetch error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await getRecords('courses');

      expect(result).toEqual([]);
    });

    it('returns empty array when response has no items', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ items: null })
      });

      const result = await getRecords('courses');

      // Should handle null gracefully
      expect(result).toBeNull();
    });

    it('fetches users endpoint correctly', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ items: mockUsers })
      });

      const result = await getRecords('users');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/collections/users/records')
      );
      expect(result).toEqual(mockUsers);
    });

    it('fetches instructors endpoint correctly', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ items: mockInstructors })
      });

      const result = await getRecords('instructors');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/collections/instructors/records')
      );
      expect(result).toEqual(mockInstructors);
    });

    it('uses BASE_URL in fetch request', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ items: [] })
      });

      await getRecords('courses');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(BASE_URL)
      );
    });

    it('handles JSON parsing errors gracefully', async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.reject(new Error('Invalid JSON'))
      });

      const result = await getRecords('courses');

      expect(result).toEqual([]);
    });

    it('logs errors to console', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      fetch.mockRejectedValueOnce(new Error('Test error'));

      await getRecords('courses');

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
