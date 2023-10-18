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
          id="subtotal"
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

      <div className={css({ display: "flex" })}>
        <div>
          <FormControl label="Tax amount">
            <Input
              id="taxAmount"
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
          </FormControl>
        </div>
        <div>
          <FormControl label="Tax percentage">
            <Input
              id="taxPercent"
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
          </FormControl>
        </div>
      </div>

      <div className={css({ display: "flex" })}>
        <div>
          <FormControl label="Tip amount">
            <Input
              id="tipAmount"
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
          </FormControl>
        </div>
        <div>
          <FormControl label="Tip percentage">
            <Input
              id="tipPercent"
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
          </FormControl>
        </div>
      </div>

      <FormControl label="Total">
        <Input id="total" value={total ? humanFriendlyNumber(total) : ""} />
      </FormControl>

      <div className={css({ display: "flex" })}>
        <div>
          <FormControl label="Per person">
            <Input
              id="perPersonAmount"
              value={
                total
                  ? humanFriendlyNumber(Number(total) / Number(persons))
                  : ""
              }
              startEnhancer="$"
              overrides={leftInputOverrides}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label="Persons">
            <Input
              id="numberOfPersons"
              inputMode="numeric"
              value={persons}
              onChange={(e) => {
                setPersons(e.target.value);
              }}
              overrides={rightInputOverrides}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
