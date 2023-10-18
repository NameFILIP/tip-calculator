import { keepNumbersAndDecimal, humanFriendlyNumber } from "./shared";

test("keepNumbersAndDecimal", () => {
  expect(keepNumbersAndDecimal("123.45")).toBe("123.45");
  expect(keepNumbersAndDecimal("abc123.45")).toBe("123.45");
  expect(keepNumbersAndDecimal("abc")).toBe("");
});

test("humanFriendlyNumber", () => {
  expect(humanFriendlyNumber(123.45)).toBe("123.45");
  expect(humanFriendlyNumber("123.45")).toBe("123.45");
  expect(humanFriendlyNumber(123.456)).toBe("123.46");
  expect(humanFriendlyNumber("abc")).toBe("");
});
