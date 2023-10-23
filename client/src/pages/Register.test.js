import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // Import the jest-dom extensions for expect
import Register from "./register";

jest.mock("react-toastify", () => ({
  toast: {
    loading: () => "Loading...",
  },
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock("../components/Layout.jsx", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

// Mock the geolocation API
// const geolocationMock = {
//   permissions: {
//     query: jest.fn().mockResolvedValue({ state: "granted" }),
//   },
//   getCurrentPosition: jest.fn(),
// };
// global.navigator.geolocation = geolocationMock;

test("it renders the Register component", async () => {
  render(<Register />);

  // Ensure that the component is initially displayed
  const registerHeader = screen.getByText("Register");
  expect(registerHeader).toBeInTheDocument();

//   // Fill out the first part of the form
//   // Find the element for Type of User directly
//   const typeOfUserElement = screen.getByText('Type of User');
//   // Click on the element to open the dropdown
//   fireEvent.click(typeOfUserElement);
//   // Find and select the option you want
//   const option = await screen.findByText('Customer');
//   fireEvent.click(option);

  //userEvent.selectOptions(screen.getByLabelText("Type of User"), "Customer");
  //const firstNameLabel = screen.getByLabelText("First Name");
  const firstNameInput = screen.getByRole('textbox', { name: "First Name" });  // O busca por 'id'
  userEvent.type(firstNameInput, "John");
  expect(firstNameInput).toHaveValue("John");
  //userEvent.type(screen.getByLabelText("First Name"), "John");
  
  userEvent.type(screen.getByLabelText("Last Name"), "Doe");
  userEvent.type(screen.getByLabelText("Email"), "johndoe@example.com");
  userEvent.type(screen.getByLabelText("Password"), "securepassword");
  userEvent.type(screen.getByLabelText("Confirm Password"), "securepassword");
  userEvent.type(screen.getByLabelText("Phone Number"), "1234567890");
  userEvent.click(screen.getByText("Continue"));

  // Wait for geolocation
//   await waitFor(() => {
//     expect(geolocationMock.permissions.query).toHaveBeenCalled();
//     expect(geolocationMock.getCurrentPosition).toHaveBeenCalled();
//   });

  // Fill out the second part of the form
  userEvent.type(screen.getByLabelText("Residence Address"), "123 Main St");
  userEvent.click(screen.getByText("Register"));
});
