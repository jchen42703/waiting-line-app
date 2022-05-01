import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { IQueue } from "@lyne/shared-dto";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AllQueuesTable from "./AllQueuesTable";
import {
  LandingPageTableRow,
  LandingPageTableRowProps,
} from "./LandingPageTableRow";

test("renders learn react link", () => {
  const onDelete = jest.fn();
  const opts: LandingPageTableRowProps = {
    queueId: "test q-id",
    queueName: "test queue",
    numUsers: "1",
    timeCreated: 0,
    liveTime: 0,
    closeTime: undefined,
    repeatCycle: undefined,
    status: true,
    canDelete: false,
    onDelete,
  };

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
      queueId: "test q-id",
      adminId: "test admin id",
      // metadata
      queueName: "test queue",
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
  const linkElement = screen.getByText(/test queue/i);
  expect(linkElement).toBeInTheDocument();
});
