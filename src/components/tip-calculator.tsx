import React, { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";
import { AmountAndPercentage } from "./amount-and-percentage";
import {
  keepNumbersAndDecimal,
  humanFriendlyNumber,
  leftInputOverrides,
  rightInputOverrides,
} from "./shared";

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

export function TipCalculator() {
  const [css, theme] = useStyletron();
  const [subtotal, setSubtotal] = useState<string>("");

  const [taxAmount, setTaxAmount] = useState<string>("");
  const [taxPercentage, setTaxPercentage] = useLocalStorage(
    "taxPercentage",
    ""
  );

  const [tipAmount, setTipAmount] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useLocalStorage(
    "tipPercentage",
    ""
  );

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
            if (tipPercentage !== "") {
              setTipAmount(
                humanFriendlyNumber(
                  (Number(tipPercentage) / 100) * Number(numbersOnly)
                )
              );
            }
            if (taxPercentage !== "") {
              setTaxAmount(
                humanFriendlyNumber(
                  (Number(taxPercentage) / 100) * Number(numbersOnly)
                )
              );
            }
          }}
        />
      </FormControl>

      <AmountAndPercentage
        label="Tax"
        amount={taxAmount}
        percentage={taxPercentage}
        denominator={subtotal}
        setAmount={setTaxAmount}
        setPercentage={setTaxPercentage}
      />

      <AmountAndPercentage
        label="Tip"
        amount={tipAmount}
        percentage={tipPercentage}
        denominator={subtotal}
        setAmount={setTipAmount}
        setPercentage={setTipPercentage}
      />

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
