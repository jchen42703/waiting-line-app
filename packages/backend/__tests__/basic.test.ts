import { createMainServer } from "../src/app";

test("basic test", () => {
  const app = createMainServer();
  expect(app).not.toBeUndefined();
});
