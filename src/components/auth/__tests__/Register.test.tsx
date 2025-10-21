import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../Register";

test("register form renders properly", () => {
  render(<Register />);
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByText(/register/i)).toBeInTheDocument();
});
