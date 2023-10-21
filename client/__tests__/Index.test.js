import React from "react";
import Index from "@/src/pages";
import { render, screen } from "@testing-library/react";

describe ('Index page', ()=>{

    it("Should have Dashboard text", () => {
        render(<Index/>);
        const Element = screen.getByRole("heading", { name: "Dashboard" });
        expect(Element).toBeInTheDocument();
      });

});

