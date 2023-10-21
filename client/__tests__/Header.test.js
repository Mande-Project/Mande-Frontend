import React from "react";
import Header from "@/src/components/Header";
import { render, screen } from "@testing-library/react";

describe ('Header componet', ()=>{

    it("Button Login is in the document", () => {
        render(<Header/>);
        const botonLogin = screen.getByRole("button", { name: "Login" });
        expect(botonLogin).toBeInTheDocument();
      });
    
      it("Button Sign Up is in the document", () => {
        render(<Header />);
        const botonSignUp = screen.getByRole("button", { name: "Sign Up" });
        expect(botonSignUp).toBeInTheDocument();
      });

      it("Button Logout is not in the document at the beginning", () => {
        render(<Header />);
        expect(screen.queryByRole("button", { name: "Logout" })).not.toBeInTheDocument();
      });

});