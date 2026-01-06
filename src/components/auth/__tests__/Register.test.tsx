import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../Register";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";

/**
 * Mock the firebase configuration module
 * This prevents the import.meta error during Jest test runs
 */
jest.mock('../../../config/firebase', () => ({
  auth: {},
  db: {}
}));

const mockRegister = jest.fn();
const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider
    value={{
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      register: mockRegister,
    } as AuthContextType}
  >
    {children}
  </AuthContext.Provider>
);

test("register form renders properly", () => {
  render(
    <Provider>
      <Register />
    </Provider>
  );
  // Check form renders with create account button
  expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
});
