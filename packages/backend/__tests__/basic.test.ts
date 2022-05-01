import { expect } from "chai";
import mongoose from "mongoose";
import { createMainServer } from "../src/app";

describe("basic test", () => {
  it("start server", () => {
    const app = createMainServer();
    expect(app.path()).equal("");
  });

  afterEach(() => {
    mongoose.connection.close();
  });
});
