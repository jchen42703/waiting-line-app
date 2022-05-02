import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();
const mockedUseParams = jest.fn(() => {
  return {
    queueId: "q-326d4295-0bf7-4724-b9aa-17820572f4c0",
    userId: "u-test",
  };
});

const theme = extendTheme({
  colors: {
    brand: {
      // light: "#F4F1DE",
      // red: "#E07A5F",
      // navy: "#3D405B",
      // blue: "#81B29A",
      // peach: "#F2CC8F",
      "primary-light": "#F7F5F2",
      navy: "#8D8DAA",
      grey: "#DFDFDE",
      secondary: "#F56D91",
    },
  },
});

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockedUseParams,
}));

describe("Login Page", () => {
  beforeEach(() => jest.resetAllMocks());
  afterEach(() => cleanup());

  it("should render properly", async () => {
    render(
      <>
        <ChakraProvider resetCSS={true} theme={theme}>
          <Login />
        </ChakraProvider>
      </>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });
});
