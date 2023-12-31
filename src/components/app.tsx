import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { HeadingMedium } from "baseui/typography";
import { TipCalculator } from "./tip-calculator";

const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <HeadingMedium>Tip Calculator</HeadingMedium>
          <TipCalculator />
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}
