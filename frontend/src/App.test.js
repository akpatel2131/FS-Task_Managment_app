import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders login page heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/track work with confidence/i);
  expect(headingElement).toBeInTheDocument();
});
