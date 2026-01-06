import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { User } from "firebase/auth";

/**
 * Mock the firebase configuration module
 * This prevents the import.meta error during Jest test runs
 */
jest.mock('../../../config/firebase', () => ({
  auth: {},
  db: {}
}));

// Mock AuthProvider for test context
const mockLogin = jest.fn();
const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider
    value={{
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      register: jest.fn(),
    } as AuthContextType}
  >
    {children}
  </AuthContext.Provider>
);

describe("Login Component", () => {
  it("renders login form", () => {
    render(
      <Provider>
        <Login />
      </Provider>
    );
    // Check form renders with sign in button
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });
});
