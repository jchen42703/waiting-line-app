import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./dashboard";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();
const mockedUseParams = jest.fn(() => {
  return {
    queueId: "q-326d4295-0bf7-4724-b9aa-17820572f4c0",
    userId: "u-test",
  };
});

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockedUseParams,
}));

describe("UserWaitingPage", () => {
  beforeEach(() => jest.resetAllMocks());
  afterEach(() => cleanup());

  it("should display the table and the queue manager dashboard header", async () => {
    render(<Dashboard />, { wrapper: MemoryRouter });

    expect(screen.getByText("Queue Manager Dashboard")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
