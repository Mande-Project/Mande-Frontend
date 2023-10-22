import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

jest.mock('../components/Layout.jsx', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));


it("Renders the login form", () => {
    render(<Login />);
  
    // Make sure the login form elements are in the document
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    // expect(screen.getByLabelText("Email")).toBeInTheDocument();
    // expect(screen.getByLabelText("Password")).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument(); // Using getByRole for the Login button
    // expect(screen.getByText("Do you want to register ?")).toBeInTheDocument(); // Use getByText for text content
  });