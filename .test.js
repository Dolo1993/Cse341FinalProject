const sum = require("./jestTest");

test("It should return an error message", () => {
  expect(sum()).toBe(404);
});
