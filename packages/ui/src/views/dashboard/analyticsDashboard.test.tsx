import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AnalyticsDashboard from "./analyticsDashboard";

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

describe("AnalyticsDashboard", () => {
  beforeEach(() => jest.resetAllMocks());
  afterEach(() => cleanup());

  it("should render properly", async () => {
    render(<AnalyticsDashboard />, { wrapper: MemoryRouter });

    expect(screen.getByText("Back to Queue Manager")).toBeInTheDocument();
  });
});
