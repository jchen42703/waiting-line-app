import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { IQueue } from "@lyne/shared-dto";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AllQueuesTable from "./AllQueuesTable";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("AllQueuesTable", () => {
  const onDelete = jest.fn();

  beforeEach(() => jest.resetAllMocks());
  afterEach(() => cleanup());

  test("renders queue table normally", () => {
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

    const queueList: IQueue[] = [
      {
        queueId: "open-q-id",
        adminId: "open admin id",
        // metadata
        queueName: "open queue",
        description: "",
        timeCreated: 0,
        liveTime: 0,
        closeTime: undefined,
        // whether to repeat this queue daily, weekly, monthly, or not at all
        repeatCycle: null,
        // users in queue
        queue: [],
        poppedUsers: [],
        bannedUsers: [],
        advanceNotice: 1,
      },
      {
        queueId: "closed-q-id",
        adminId: "closed admin id",
        // metadata
        queueName: "closed queue",
        description: "",
        timeCreated: 0,
        liveTime: 0,
        closeTime: 0,
        // whether to repeat this queue daily, weekly, monthly, or not at all
        repeatCycle: null,
        // users in queue
        queue: [],
        poppedUsers: [],
        bannedUsers: [],
        advanceNotice: 1,
      },
    ];

    render(
      <BrowserRouter>
        <ChakraProvider resetCSS={true} theme={theme}>
          <AllQueuesTable
            queueList={queueList}
            canDelete={false}
            onDelete={onDelete}
          />
        </ChakraProvider>
      </BrowserRouter>,
    );
    const opneQueueNameElement = screen.getByText(/open queue/i);
    expect(opneQueueNameElement).toBeInTheDocument();

    const closedQueueNameElement = screen.getByText(/closed queue/i);
    expect(closedQueueNameElement).toBeInTheDocument();

    // Clicking on queue should navigate to that queue link
    fireEvent.click(opneQueueNameElement);
    expect(mockedUsedNavigate.mock.calls).toHaveLength(1);
  });

  test("renders queue table with deletable queues", () => {
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

    const queueList: IQueue[] = [
      {
        queueId: "open q-id",
        adminId: "open admin id",
        // metadata
        queueName: "open queue",
        description: "",
        timeCreated: 0,
        liveTime: 0,
        closeTime: undefined,
        // whether to repeat this queue daily, weekly, monthly, or not at all
        repeatCycle: null,
        // users in queue
        queue: [],
        poppedUsers: [],
        bannedUsers: [],
        advanceNotice: 1,
      },
      {
        queueId: "closed q-id",
        adminId: "closed admin id",
        // metadata
        queueName: "closed queue",
        description: "",
        timeCreated: 0,
        liveTime: 0,
        closeTime: 0,
        // whether to repeat this queue daily, weekly, monthly, or not at all
        repeatCycle: null,
        // users in queue
        queue: [],
        poppedUsers: [],
        bannedUsers: [],
        advanceNotice: 1,
      },
    ];

    render(
      <BrowserRouter>
        <ChakraProvider resetCSS={true} theme={theme}>
          <AllQueuesTable
            queueList={queueList}
            canDelete={true}
            onDelete={onDelete}
          />
        </ChakraProvider>
      </BrowserRouter>,
    );
    // try deleting
    const openQueueNameElement = screen.getByText(/open queue/i);
    expect(openQueueNameElement).toBeInTheDocument();

    fireEvent.click(openQueueNameElement);
    expect(onDelete.mock.calls).toHaveLength(1);
  });
});
