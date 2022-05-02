import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();
const mockedUseHref = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useHref: () => mockedUseHref,
}));

function wrappedHome() {
  return (
    <>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </>
  );
}

describe("Home Page", () => {
  beforeEach(() => jest.resetAllMocks());
  afterEach(() => cleanup());

  // it("should display a call to action button that redirects to login", () => {
  //   render(wrappedHome());
  //   fireEvent.click(screen.getByRole("button", { name: "Start Now" }));

  //   expect(mockedUseHref.mock.calls).toHaveLength(1);
  // });

  // it("should display the login button", () => {
  //   render(wrappedHome());
  //   fireEvent.click(screen.getByText("Login"));
  //   expect(mockedUseHref.mock.calls).toHaveLength(1);
  // });

  it("should display a hero", () => {
    render(wrappedHome());
    expect(screen.getByAltText("hero")).toBeInTheDocument();
  });

  it("should display all of the contributor's names", () => {
    render(wrappedHome());
    expect(screen.getByText("Benson Jin")).toBeInTheDocument();
    expect(screen.getByText("Joseph Chen")).toBeInTheDocument();
    expect(screen.getByText("Daniel Lee")).toBeInTheDocument();
    expect(screen.getByText("Jody Zhou")).toBeInTheDocument();
    expect(screen.getByText("David Tang")).toBeInTheDocument();
    expect(screen.getByText("Jalen Xu")).toBeInTheDocument();
  });
});
