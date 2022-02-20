import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Hello world! text", () => {
  render(<App />);
  const text = screen.getByText(/Hello world!/i);
  expect(text).toBeInTheDocument();
});
