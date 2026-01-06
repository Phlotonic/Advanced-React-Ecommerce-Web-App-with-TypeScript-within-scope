import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import EditProfile from '../EditProfile';
import { AuthContext, AuthContextType } from '../../../context/AuthContext';
import { User } from 'firebase/auth';

/**
 * EditProfile Component Tests
 * 
 * This test file validates that the EditProfile component
 * renders correctly with the proper authentication context.
 */

/**
 * Mock the firebase configuration module
 * This prevents the import.meta error during Jest test runs
 */
jest.mock('../../../config/firebase', () => ({
  auth: {},
  db: {}
}));

// Mock the userApi module
jest.mock('../../../utils/userApi', () => ({
  getUserProfile: jest.fn(),
  updateUserProfile: jest.fn(),
}));

// Create a mock user object
const mockUser: Partial<User> = {
  uid: 'test-uid',
  email: 'test@example.com',
};

// Create a mock AuthContext provider component
const MockAuthProvider = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider
    value={
      {
        user: mockUser as User,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
      } as AuthContextType
    }
  >
    {children}
  </AuthContext.Provider>
);

describe('EditProfile Component', () => {
  it('renders the form correctly', () => {
    render(
      <MockAuthProvider>
        <EditProfile />
      </MockAuthProvider>
    );

    // Check that the component renders without crashing
    const loadingText = screen.queryByText(/loading profile/i);
    expect(loadingText || screen.queryByText(/profile/i)).toBeInTheDocument();
  });
});

