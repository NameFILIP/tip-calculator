import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./app";

test("renders Tip Calculator header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Tip Calculator/i);
  expect(headerElement).toBeInTheDocument();
});
