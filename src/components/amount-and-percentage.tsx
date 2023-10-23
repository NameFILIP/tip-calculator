import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";
import {
  keepNumbersAndDecimal,
  humanFriendlyNumber,
  leftInputOverrides,
  rightInputOverrides,
} from "./shared";

type AmountAndPercentageProps = {
  label: string;
  amount: string;
  percentage: string;
  denominator: string;
  setAmount: (amount: string) => void;
  setPercentage: (percentage: string) => void;
};

export function AmountAndPercentage(props: AmountAndPercentageProps) {
  const [css] = useStyletron();
  const { label, amount, percentage, denominator, setAmount, setPercentage } =
    props;

  const amountId = `${label.toLowerCase()}Amount`;
  const amountLabel = `${label} amount`;
  const percentageId = `${label.toLowerCase()}Percentage`;
  const percentageLabel = `${label} percentage`;

  return (
    <div className={css({ display: "flex" })}>
      <div>
        <FormControl label={amountLabel}>
          <Input
            id={amountId}
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              const numbersOnly = keepNumbersAndDecimal(e.target.value);
              setAmount(numbersOnly);
              if (denominator !== "") {
                setPercentage(
                  String((Number(numbersOnly) / Number(denominator)) * 100)
                );
              }
            }}
            startEnhancer="$"
            overrides={leftInputOverrides}
          />
        </FormControl>
      </div>
      <div>
        <FormControl label={percentageLabel}>
          <Input
            id={percentageId}
            inputMode="decimal"
            value={percentage}
            onChange={(e) => {
              const numbersOnly = keepNumbersAndDecimal(e.target.value);
              setPercentage(numbersOnly);
              if (denominator !== "") {
                setAmount(
                  humanFriendlyNumber(
                    (Number(numbersOnly) / 100) * Number(denominator)
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
  );
}
