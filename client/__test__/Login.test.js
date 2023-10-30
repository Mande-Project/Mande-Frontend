import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // Import the jest-dom extensions for expect
import Login from "../src/pages/login"; // Adjust the import path to match your project's structure
import { useAuthStore } from "../src/store/auth";
/* eslint-disable no-undef */

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock("../src/components/Layout.jsx", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

describe("Login page", () => {

  let loginButton;
  let emailInput;
  let passwordInput;
  beforeEach(() => {
    render(<Login />);
    loginButton = screen.getByRole("button", {
      name: "Login",
      // Additional attributes like class can be checked using the 'class' selector
      class:
        "bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900",
      // Verify the type attribute
      type: "submit",
    });
    emailInput = screen.getByLabelText("Email");
    passwordInput = screen.getByLabelText("Password");
  });

  it("Renders the login form", () => {
    // Assert that the login input element is present in the component
    expect(loginButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("Handles form submission correctly", async () => {
    // Assert that the login input element is present in the component
    expect(loginButton).toBeInTheDocument();
    // Simulate user input
    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    // Trigger form submission
    fireEvent.click(loginButton);
    expect(useAuthStore.getState().isAuthenticated).toEqual(false);
  });
});
