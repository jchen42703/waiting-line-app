import { cleanup, render, screen } from "@testing-library/react";
import UserSignupPage from "./UserSignupPage";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();
const mockedUseParams = jest.fn(() => {
  return {
    queueId: "q-test",
  };
});

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockedUseParams,
}));

describe("UserSignupPage", () => {
  beforeEach(() => jest.resetAllMocks());
  afterEach(() => cleanup());

  it("should display a form", async () => {
    render(<UserSignupPage />);
    expect(
      screen.getByText(/Please fill out this form to join queue/i),
    ).toBeInTheDocument();

    const joinButton = screen.getByRole("button", { name: "Join" });
    expect(joinButton).toBeInTheDocument();
  });
});
