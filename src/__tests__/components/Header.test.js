/**
 * Header Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';

// Mock the auth module
jest.mock('../../utils/auth', () => ({
  isAuthenticated: jest.fn(() => false),
  getUserId: jest.fn(() => null)
}));

// Mock react-modal
jest.mock('react-modal', () => {
  const Modal = ({ isOpen, children, onRequestClose }) => {
    return isOpen ? <div data-testid="modal">{children}</div> : null;
  };
  Modal.setAppElement = jest.fn();
  return Modal;
});

// Helper to render with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    // Clear cookies before each test
    document.cookie = 'elearn_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });

  it('renders without crashing', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the site title/logo', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('eLearn')).toBeInTheDocument();
  });

  it('renders login and signup buttons when not authenticated', () => {
    renderWithRouter(<Header />);

    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('opens login modal when login button is clicked', async () => {
    renderWithRouter(<Header />);

    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  it('opens signup modal when signup button is clicked', async () => {
    renderWithRouter(<Header />);

    const signUpButton = screen.getByText('Sign Up');
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  it('has correct link to home page', () => {
    renderWithRouter(<Header />);

    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('applies button-active class when login is open', async () => {
    renderWithRouter(<Header />);

    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginButton).toHaveClass('button-active');
    });
  });

  it('closes login modal and opens signup when switching', async () => {
    renderWithRouter(<Header />);

    // Open login first
    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginButton).toHaveClass('button-active');
    });

    // Click signup
    const signUpButton = screen.getByText('Sign Up');
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(signUpButton).toHaveClass('button-active');
      expect(loginButton).not.toHaveClass('button-active');
    });
  });

  describe('when authenticated', () => {
    beforeEach(() => {
      // Set authentication cookie
      document.cookie = 'elearn_token=test-token; path=/';
    });

    afterEach(() => {
      document.cookie = 'elearn_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });

    it('shows avatar instead of login/signup buttons', () => {
      renderWithRouter(<Header />);

      // Should show avatar container
      const avatarContainer = document.querySelector('.avatar-container');
      expect(avatarContainer).toBeInTheDocument();
    });

    it('does not show login button when authenticated', () => {
      renderWithRouter(<Header />);

      // Login and signup buttons should have inactive class
      expect(screen.queryByText('Log in')).not.toBeInTheDocument();
      expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
    });
  });
});
