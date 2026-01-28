/**
 * Authentication Integration Tests
 *
 * Tests authentication-related component behaviors
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import Login from '../../components/Login';

// Mock react-modal
jest.mock('react-modal', () => {
  const Modal = ({ children, isOpen, onRequestClose, contentLabel }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="modal" role="dialog" aria-label={contentLabel}>
        {children}
        <button onClick={onRequestClose} data-testid="close-modal">Close</button>
      </div>
    );
  };
  Modal.setAppElement = jest.fn();
  return Modal;
});

// Mock auth module
jest.mock('../../utils/auth', () => ({
  isAuthenticated: jest.fn(() => false),
  getUserId: jest.fn(() => null),
  authenticate: jest.fn(),
  logout: jest.fn(),
  getToken: jest.fn(() => null)
}));

// Mock window.location
const mockReload = jest.fn();
delete window.location;
window.location = { reload: mockReload, href: '' };

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Authentication Integration Tests', () => {
  beforeEach(() => {
    // Clear cookies
    document.cookie = 'elearn_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Clear localStorage
    localStorage.clear();
    // Reset mocks
    mockReload.mockClear();
  });

  describe('Unauthenticated State', () => {
    it('shows login and signup buttons when not authenticated', () => {
      renderHeader();

      expect(screen.getByText('Log in')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    it('opens login modal when clicking login button', async () => {
      renderHeader();

      fireEvent.click(screen.getByText('Log in'));

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });
    });

    it('opens signup modal when clicking signup button', async () => {
      renderHeader();

      fireEvent.click(screen.getByText('Sign Up'));

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });
    });

    it('can switch from login to signup modal', async () => {
      renderHeader();

      // Open login first
      fireEvent.click(screen.getByText('Log in'));

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });

      // Then click signup (closes login, opens signup)
      fireEvent.click(screen.getByText('Sign Up'));

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });
    });
  });

  describe('Authenticated State', () => {
    beforeEach(() => {
      // Set up authenticated state via cookie
      document.cookie = 'elearn_token=mock-token; path=/';
    });

    it('hides login/signup buttons when authenticated', () => {
      renderHeader();

      expect(screen.queryByText('Log in')).not.toBeInTheDocument();
      expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
    });

    it('shows avatar when authenticated', () => {
      renderHeader();

      const avatarContainer = document.querySelector('.avatar-container');
      expect(avatarContainer).toBeInTheDocument();
    });
  });

  describe('Login Modal Behavior', () => {
    it('login modal contains email and password fields', async () => {
      renderHeader();

      fireEvent.click(screen.getByText('Log in'));

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });

      expect(document.querySelector('input[type="email"]')).toBeInTheDocument();
      expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
    });

    it('can enter credentials in login form', async () => {
      renderHeader();

      fireEvent.click(screen.getByText('Log in'));

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });

      const emailInput = document.querySelector('input[type="email"]');
      const passwordInput = document.querySelector('input[type="password"]');

      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'password123');

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });
  });
});
