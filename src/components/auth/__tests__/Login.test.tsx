import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login";
import { AuthContext } from "../../../context/AuthContext";

// Mock AuthProvider for test context
const mockLogin = jest.fn();
const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider
    value={{
      user: null,
      login: mockLogin,
      logout: jest.fn(),
      register: jest.fn(),
    }}
  >
    {children}
  </AuthContext.Provider>
);

describe("Login Component", () => {
  beforeEach(() => {
    mockLogin.mockClear();
  });

  it("renders email, password inputs and login button", () => {
    render(
      <Provider>
        <Login />
      </Provider>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("calls login with correct values", () => {
    render(
      <Provider>
        <Login />
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" }
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(mockLogin).toHaveBeenCalledWith("user@example.com", "password123");
  });
});
