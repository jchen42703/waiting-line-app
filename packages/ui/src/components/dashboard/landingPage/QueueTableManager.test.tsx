// import type { IQueue } from "@lyne/shared-dto";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { config } from "../../../lib/config";
import QueueTableManager from "./QueueTableManager";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("QueueTableManager", () => {
  const { hostUrl } = config;

  const server = setupServer(
    // capture "GET /greeting" requests
    rest.get(`${hostUrl}/api/admin/queues`, (_, res, ctx) => {
      // respond using a mocked JSON body
      return res(
        ctx.json({
          queues: [
            {
              _id: "62685d4880e783224b18f754",
              queueId: "q-326d4295-0bf7-4724-b9aa-17820572f4c0",
              queueName: "Test",
              description: "demo",
              timeCreated: 1651006792850,
              liveTime: 1650945960000,
              adminId: "62575bac15baf333ebba5fbf",
              queue: [],
              poppedUsers: [
                {
                  userId: "u-74b44cc4-eba9-453c-89e3-40c0ba403d87",
                  joinQTime: 1651006874373,
                  name: "jody",
                  email: "jody@gmail.com",
                  phoneNumber: "(216) 982-3652",
                  status: "popped",
                  _id: "62685d9a80e783224b18f764",
                },
                {
                  userId: "u-2ff214a0-54d7-47e8-8ac8-d7f8870cde7f",
                  joinQTime: 1651006893712,
                  name: "cl",
                  email: "changlinliu93@gmail.com",
                  phoneNumber: "(216) 304-1011",
                  status: "popped",
                  _id: "62685dad80e783224b18f76b",
                },
                {
                  userId: "u-1249f071-b7fa-48a4-9159-3ab84768bf7f",
                  joinQTime: 1651007115936,
                  name: "123",
                  email: "test123456@gmail.com",
                  phoneNumber: "(787) 898-7000",
                  status: "popped",
                  _id: "62685e8b80e783224b18f80d",
                },
                {
                  userId: "u-fe8495b9-20df-4aec-a8bb-35532254cca2",
                  joinQTime: 1651440843137,
                  name: "test",
                  email: "test@gmail.com",
                  phoneNumber: "(216) 238-7462",
                  status: "popped",
                  _id: "626efccb80e783224b18fb91",
                },
                {
                  userId: "u-ce3b41b7-c6cd-44a7-b2f0-fbd054d7e6dd",
                  joinQTime: 1651441602375,
                  name: "BannedName",
                  email: "bannedemail@gmail.com",
                  phoneNumber: "(710) 912-8321",
                  status: "popped",
                  _id: "626effc2faf82288d23a3d65",
                },
              ],
              bannedUsers: [
                {
                  userId: "u-a4488c3c-4946-4bb4-bdc1-e357c5351094",
                  joinQTime: 1651007038314,
                  name: "Benson Jin",
                  email: "bensonjin123@gmail.com",
                  phoneNumber: "(718) 595-7797",
                  status: "banned",
                  _id: "62685e3e80e783224b18f7d6",
                },
              ],
              advanceNotice: null,
              __v: 0,
            },
          ],
        }),
      );
    }),
  );

  beforeEach(() => {
    jest.resetAllMocks();
    server.listen();
  });

  afterEach(() => {
    server.close();
  });

  it("should render the queues properly", async () => {
    render(<QueueTableManager />);
    expect(await screen.findByText("Test")).toBeInTheDocument();
    // 0 Users in Queue
    expect(screen.getByText("0")).toBeInTheDocument();
    // Created Date & Live Time
    expect(screen.getAllByText("4/26/2022")).toHaveLength(2);
    // Close Date & Repeat Cycle
    expect(screen.getAllByText("N/A")).toHaveLength(2);
    // Status
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("delete button should properly render in the queue table manager", () => {
    render(<QueueTableManager />);
    const deleteButtonElement = screen.getByText("Delete Queue");
    fireEvent.click(deleteButtonElement);
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it("should open the delete queue modal properly", async () => {
    render(<QueueTableManager />);
    expect(await screen.findByText("Test")).toBeInTheDocument();

    const deleteButtonElement = screen.getByText("Delete Queue");
    fireEvent.click(deleteButtonElement);
    // Click the X button
    const allCells = screen.getAllByRole("gridcell");
    const deleteButtonCell = allCells[allCells.length - 1];
    fireEvent.click(within(deleteButtonCell).getByRole("button"));
    // Should open the model on click
    expect(
      screen.getByText(
        /Click "Delete" to confirm that you want to delete the queue./i,
      ),
    ).toBeInTheDocument();
  });

  it("should open the create queue modal properly", async () => {
    render(<QueueTableManager />);
    expect(await screen.findByText("Test")).toBeInTheDocument();

    const createButton = screen.getByText("Create Queue");
    fireEvent.click(createButton);
    // Should open the create queue model on click
    expect(screen.getByText(/Auto-Notify Place/i)).toBeInTheDocument();

    // const closeModalButton = screen.getByText("Close");
    // fireEvent.click(closeModalButton);
    // expect(screen.queryByText(/Auto-Notify Place/i)).toBeNull();
  });
});
