import { getAdminMetadata } from "../src/lib/services/admin.service";

test("basic test", () => {
  expect(2 + 2).toEqual(4);
  expect(getAdminMetadata).not.toBeUndefined();
});
