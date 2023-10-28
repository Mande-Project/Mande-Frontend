import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import the jest-dom extensions for expect
import Register from "../src/pages/register";
/* eslint-disable no-undef */

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

jest.mock("../src/components/Layout.jsx", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

describe("Register page", () => {
  it('Muestra el título "Register"', () => {
    render(<Register />);
    const title = screen.getByText("Register");
    expect(title).toBeInTheDocument();
  });

  it("Shows selector user and options", () => {
    render(<Register />);
    const typeUserLabel = screen.getByText("Type of User");
    const selectInput = screen.getByRole("combobox");
    
    expect(typeUserLabel).toBeInTheDocument();
    expect(selectInput).toBeInTheDocument();
  });
  
});
  // it('Validación del formulario en el primer paso', async () => {
  //   // Mock de la función handleSignUp
  //   const handleSignUp = jest.fn();
  
  //   render(<Register />);
  
  //   // Selecciona los campos y botón necesarios
  //   const firstNameInput = screen.getByLabelText('First Name');
  //   const lastNameInput = screen.getByLabelText('Last Name');
  //   const emailInput = screen.getByLabelText('Email');
  //   const passwordInput = screen.getByLabelText('Password');
  //   const confirmPasswordInput = screen.getByLabelText('Confirm Password');
  //   const continueButton = screen.getByText('Continue');
  
  //   // Simula completar el formulario con datos incorrectos
  //   fireEvent.change(firstNameInput, { target: { value: 'J' } });
  //   fireEvent.change(lastNameInput, { target: { value: 'D' } });
  //   fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  //   fireEvent.change(passwordInput, { target: { value: 'short' } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: 'password'} });
  
  //   // Hacer clic en el botón "Continue"
  //   // userEvent.click(continueButton);
  
  //   // Espera a que las validaciones se completen
  //   // await screen.findByText('Error'); // Espera a que aparezca un mensaje de error
  
  //   // Verifica que handleSignUp no haya sido llamado (ya que no debería haber pasado la validación)
  //   // expect(handleSignUp).not.toHaveBeenCalled();
  // });
