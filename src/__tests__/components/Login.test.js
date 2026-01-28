/**
 * Login Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/Login';

// Mock react-modal
jest.mock('react-modal', () => {
  const Modal = ({ isOpen, children, onRequestClose, contentLabel }) => {
    return isOpen ? (
      <div data-testid="modal" aria-label={contentLabel}>
        {children}
        <button onClick={onRequestClose} data-testid="close-modal">Close</button>
      </div>
    ) : null;
  };
  Modal.setAppElement = jest.fn();
  return Modal;
});

// Mock the auth module
const mockAuthenticate = jest.fn();
jest.mock('../../utils/auth', () => ({
  authenticate: (...args) => mockAuthenticate(...args),
  isAuthenticated: jest.fn(() => false),
  getToken: jest.fn(() => null),
  getUserId: jest.fn(() => null)
}));

// Mock window.location.reload
const mockReload = jest.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true
});

describe('Login Component', () => {
  const mockCloseModal = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthenticate.mockReset();
  });

  const renderLogin = () => {
    return render(
      <Login closeModal={mockCloseModal} onSuccess={mockOnSuccess} />
    );
  };

  it('renders without crashing', () => {
    renderLogin();
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('renders email input field', () => {
    renderLogin();
    const emailInput = document.querySelector('input[type="email"]');
    expect(emailInput).toBeInTheDocument();
  });

  it('renders password input field', () => {
    renderLogin();
    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders login button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('updates email field on input', () => {
    renderLogin();

    const emailInput = document.querySelector('input[type="email"]');
    userEvent.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('updates password field on input', () => {
    renderLogin();

    const passwordInput = document.querySelector('input[type="password"]');
    userEvent.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('calls authenticate with email and password on submit', async () => {
    mockAuthenticate.mockResolvedValueOnce({ token: 'test-token' });
    renderLogin();

    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = screen.getByRole('button', { name: /log in/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAuthenticate).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('calls onSuccess callback on successful login', async () => {
    mockAuthenticate.mockResolvedValueOnce({ token: 'test-token' });
    renderLogin();

    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = screen.getByRole('button', { name: /log in/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('calls closeModal on successful login', async () => {
    mockAuthenticate.mockResolvedValueOnce({ token: 'test-token' });
    renderLogin();

    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = screen.getByRole('button', { name: /log in/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });

  it('displays error message on authentication failure', async () => {
    mockAuthenticate.mockRejectedValueOnce(new Error('Authentication failed'));
    renderLogin();

    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = screen.getByRole('button', { name: /log in/i });

    userEvent.type(emailInput, 'wrong@example.com');
    userEvent.type(passwordInput, 'wrongpassword');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('does not call onSuccess on authentication failure', async () => {
    mockAuthenticate.mockRejectedValueOnce(new Error('Authentication failed'));
    renderLogin();

    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = screen.getByRole('button', { name: /log in/i });

    userEvent.type(emailInput, 'wrong@example.com');
    userEvent.type(passwordInput, 'wrongpassword');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockCloseModal).not.toHaveBeenCalled();
  });

  it('has correct input types for security', () => {
    renderLogin();

    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
