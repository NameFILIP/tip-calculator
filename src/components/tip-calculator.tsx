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
}) {
  if (subtotal === "" || tipAmount === "" || taxAmount === "") {
    return "";
  }
  const rawSum = Number(subtotal) + Number(tipAmount) + Number(taxAmount);
  return rawSum.toFixed(2);
}

function keepNumbersAndDecimal(input: string) {
  return input.replace(/[^0-9.]/g, "");
}

function humanFriendlyNumber(input: string | number) {
  return Number(input).toFixed(2);
}

export function TipCalculator() {
  const [css, theme] = useStyletron();
  const [subtotal, setSubtotal] = useState<string>("");

  const [taxAmount, setTaxAmount] = useState<string>("");
  const [taxPercent, setTaxPercent] = useLocalStorage("taxPercent", "");

  const [tipAmount, setTipAmount] = useState<string>("");
  const [tipPercent, setTipPercent] = useLocalStorage("tipPercent", "");

  return (
    <div
      className={css({
        marginLeft: theme.sizing.scale700,
        marginRight: theme.sizing.scale700,
      })}
    >
      <FormControl label="Subtotal">
        <Input
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
            value={tipPercent}
            onChange={(e) => {
              const numbersOnly = keepNumbersAndDecimal(e.target.value);
              setTipPercent(numbersOnly);
              if (subtotal !== "") {
                setTipAmount(
                  String(
                    humanFriendlyNumber(
                      (Number(numbersOnly) / 100) * Number(subtotal)
                    )
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
            value={taxPercent}
            onChange={(e) => {
              const numbersOnly = keepNumbersAndDecimal(e.target.value);
              setTaxPercent(numbersOnly);
              if (subtotal !== "") {
                setTaxAmount(
                  String(
                    humanFriendlyNumber(
                      (Number(numbersOnly) / 100) * Number(subtotal)
                    )
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
        <Input value={getTotal({ subtotal, tipAmount, taxAmount })} />
      </FormControl>
    </div>
  );
}
