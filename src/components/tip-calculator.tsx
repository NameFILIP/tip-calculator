import { useState, useRef } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";
import { Button, KIND as BUTTON_KIND } from "baseui/button";
import { AmountAndPercentage } from "./amount-and-percentage";
import {
  humanFriendlyNumber,
  leftInputOverrides,
  rightInputOverrides,
  calculateExpression,
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
  const inputRef = useRef<HTMLInputElement>(null);

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

  const subtotalValue = calculateExpression(subtotal);

  const total = getTotal({
    subtotal: subtotalValue,
    tipAmount,
    taxAmount,
  });

  const handleClickPlus = () => {
    const trimmed = subtotal.trim();
    if (trimmed.length > 0 && trimmed[trimmed.length - 1] !== "+") {
      setSubtotal((subtotal) => `${subtotal} + `);
    }
    inputRef.current && inputRef.current.focus();
  };

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
          inputRef={inputRef}
          onChange={(e) => {
            const newSubtotal = e.target.value;
            setSubtotal(newSubtotal);
            const newSubtotalValue = calculateExpression(newSubtotal);
            if (tipPercentage !== "") {
              setTipAmount(
                humanFriendlyNumber(
                  (Number(tipPercentage) / 100) * Number(newSubtotalValue)
                )
              );
            }
            if (taxPercentage !== "") {
              setTaxAmount(
                humanFriendlyNumber(
                  (Number(taxPercentage) / 100) * Number(newSubtotalValue)
                )
              );
            }
          }}
          overrides={{
            Root: {
              style: {
                paddingRight: 0,
              },
            },
            EndEnhancer: {
              style: {
                paddingRight: 0,
              },
            },
          }}
          startEnhancer="$"
          endEnhancer={
            <Button
              kind={BUTTON_KIND.secondary}
              type="button"
              onClick={handleClickPlus}
              overrides={{
                Root: {
                  style: {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    paddingRight: theme.sizing.scale800,
                    paddingLeft: theme.sizing.scale800,
                    backgroundColor: theme.colors.primary200,
                  },
                },
              }}
            >
              +
            </Button>
          }
        />
      </FormControl>

      <AmountAndPercentage
        label="Tax"
        amount={taxAmount}
        percentage={taxPercentage}
        denominator={subtotalValue}
        setAmount={setTaxAmount}
        setPercentage={setTaxPercentage}
      />

      <AmountAndPercentage
        label="Tip"
        amount={tipAmount}
        percentage={tipPercentage}
        denominator={subtotalValue}
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
              endEnhancer="👥"
              overrides={rightInputOverrides}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
