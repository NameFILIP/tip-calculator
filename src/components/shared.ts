export const leftInputOverrides = {
  Root: {
    style: {
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
    },
  },
};

export const rightInputOverrides = {
  Root: {
    style: {
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
    },
  },
};

export function keepNumbersAndDecimal(input: string) {
  return input.replace(/[^0-9.]/g, "");
}

export function humanFriendlyNumber(input: string | number): string {
  const numInput = Number(input);

  if (isNaN(numInput)) {
    return "";
  }

  // Round up the last cent which is how restaurants calculate it
  return (Math.round(numInput * 100) / 100).toFixed(2);
}

export function calculateExpression(expression: string): string {
  return expression
    .split("+")
    .map((number) => number.trim())
    .filter(Boolean)
    .reduce((sum, num) => sum + Number(num), 0)
    .toString();
}
