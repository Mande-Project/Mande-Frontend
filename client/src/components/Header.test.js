import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import Header from './Header';
import { useAuthStore } from '@/src/store/auth';
import '@testing-library/jest-dom';

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe('Header component', () => {
  // Establecer el estado de autenticación para las pruebas
  beforeEach(() => {
    useAuthStore.getState().isAuthenticated = false;
  });

  it("Button Login is in the document for guest users", () => {
    render(<Header />);
    const botonLogin = screen.getByRole("button", { name: "Login" });
    expect(botonLogin).toBeInTheDocument();
  });

  it("Button Sign Up is in the document for guest users", () => {
    render(<Header />);
    const botonSignUp = screen.getByRole("button", { name: "Sign Up" });
    expect(botonSignUp).toBeInTheDocument();
  });

  it("Button Logout is not in the document for guest users", () => {
    render(<Header />);
    expect(screen.queryByRole("button", { name: "Logout" })).not.toBeInTheDocument();
  });

  it("Button Logout is in the document for authenticated users", () => {
    // Cambiar el estado de autenticación para simular un usuario autenticado
    useAuthStore.getState().isAuthenticated = true;
    render(<Header />);
    
    const botonLogout = screen.getByRole("button", { name: "Logout" });
    expect(botonLogout).toBeInTheDocument();
  });

});
