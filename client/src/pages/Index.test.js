/* eslint-disable no-undef */
import React from "react";
import Index from "@/src/pages";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

jest.mock('../components/Layout.jsx', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

describe ('Index page', ()=>{

    it("Should have Dashboard text", () => {
        render(<Index/>);
        const Element = screen.getByRole("heading", { name: "Dashboard" });
        expect(Element).toBeInTheDocument();
      });

});

