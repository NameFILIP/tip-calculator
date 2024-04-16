import {
  keepNumbersAndDecimal,
  humanFriendlyNumber,
  calculateExpression,
} from "./shared";

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

test("calculateExpression", () => {
  expect(calculateExpression("1.1 + 2")).toBe("3.1");
  expect(calculateExpression("1 + 2 + 3")).toBe("6");
  expect(calculateExpression("1 + 2 + 3 + ")).toBe("6");
  expect(calculateExpression("1+2+3+")).toBe("6");
});
