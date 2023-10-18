import React, { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";

const leftInputOverrides = {
  Root: {
    style: {
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
    },
  },
};

const rightInputOverrides = {
  Root: {
    style: {
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
    },
  },
};

function getTotal({
  subtotal,
  tipAmount,
  taxAmount,
}: {
  subtotal: string;
  tipAmount: string;
  taxAmount: string;
}): number | null {
  if (subtotal === "" || tipAmount === "" || taxAmount === "") {
    return null;
  }
  return Number(subtotal) + Number(tipAmount) + Number(taxAmount);
}

function keepNumbersAndDecimal(input: string) {
  return input.replace(/[^0-9.]/g, "");
}

function humanFriendlyNumber(input: string | number): string {
  const numInput = Number(input);
  // Round up the last cent which is how restaurants calculate it
  return (Math.ceil(numInput * 100) / 100).toFixed(2);
}

export function TipCalculator() {
  const [css, theme] = useStyletron();
  const [subtotal, setSubtotal] = useState<string>("");

  const [taxAmount, setTaxAmount] = useState<string>("");
  const [taxPercent, setTaxPercent] = useLocalStorage("taxPercent", "");

  const [tipAmount, setTipAmount] = useState<string>("");
  const [tipPercent, setTipPercent] = useLocalStorage("tipPercent", "");

  const [persons, setPersons] = useState<string>("1");

  const total = getTotal({ subtotal, tipAmount, taxAmount });

  return (
    <div
      className={css({
        marginLeft: theme.sizing.scale700,
        marginRight: theme.sizing.scale700,
      })}
    >
      <FormControl label="Subtotal">
        <Input
          inputMode="decimal"
          value={subtotal}
          onChange={(e) => {
            const numbersOnly = keepNumbersAndDecimal(e.target.value);
            setSubtotal(numbersOnly);
            if (tipPercent !== "") {
              setTipAmount(
                String(
                  humanFriendlyNumber(
                    (Number(tipPercent) / 100) * Number(numbersOnly)
                  )
                )
              );
            }
            if (taxPercent !== "") {
              setTaxAmount(
                String((Number(taxPercent) / 100) * Number(numbersOnly))
              );
            }
          }}
        />
      </FormControl>

      <FormControl label="Tax">
        <div className={css({ display: "flex" })}>
          <Input
            inputMode="decimal"
            value={taxAmount}
            onChange={(e) => {
              const numbersOnly = keepNumbersAndDecimal(e.target.value);
              setTaxAmount(numbersOnly);
              if (subtotal !== "") {
                setTaxPercent(
                  String((Number(numbersOnly) / Number(subtotal)) * 100)
                );
              }
            }}
            startEnhancer="$"
            overrides={leftInputOverrides}
          />
          <Input
            inputMode="decimal"
            value={taxPercent}
            onChange={(e) => {
              const numbersOnly = keepNumbersAndDecimal(e.target.value);
              setTaxPercent(numbersOnly);
              if (subtotal !== "") {
                setTaxAmount(
                  humanFriendlyNumber(
                    (Number(numbersOnly) / 100) * Number(subtotal)
                  )
                );
              }
            }}
            endEnhancer="%"
            overrides={rightInputOverrides}
          />
        </div>
      </FormControl>

      <FormControl label="Tip">
        <div className={css({ display: "flex" })}>
          <Input
            inputMode="decimal"
            value={tipAmount}
            onChange={(e) => {
              const numbersOnly = keepNumbersAndDecimal(e.target.value);
              setTipAmount(numbersOnly);
              if (subtotal !== "") {
                setTipPercent(
                  String((Number(numbersOnly) / Number(subtotal)) * 100)
                );
              }
            }}
            startEnhancer="$"
            overrides={leftInputOverrides}
          />
          <Input
            inputMode="decimal"
            value={tipPercent}
            onChange={(e) => {
              const numbersOnly = keepNumbersAndDecimal(e.target.value);
              setTipPercent(numbersOnly);
              if (subtotal !== "") {
                setTipAmount(
                  humanFriendlyNumber(
                    (Number(numbersOnly) / 100) * Number(subtotal)
                  )
                );
              }
            }}
            endEnhancer="%"
            overrides={rightInputOverrides}
          />
        </div>
      </FormControl>

      <FormControl label="Total">
        <Input value={total ? humanFriendlyNumber(total) : ""} />
      </FormControl>

      <FormControl label="Per person">
        <div className={css({ display: "flex" })}>
          <Input
            value={
              total ? humanFriendlyNumber(Number(total) / Number(persons)) : ""
            }
            startEnhancer="$"
            overrides={leftInputOverrides}
          />
          <Input
            inputMode="numeric"
            value={persons}
            onChange={(e) => {
              setPersons(e.target.value);
            }}
            overrides={rightInputOverrides}
          />
        </div>
      </FormControl>
    </div>
  );
}
