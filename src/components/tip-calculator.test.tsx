import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TipCalculator } from "./tip-calculator";

test("TipCalculator - enter percentages", () => {
  const { asFragment, container } = render(<TipCalculator />);

  fireEvent.change(screen.getByLabelText("Subtotal"), {
    target: { value: "100" },
  });
  fireEvent.change(screen.getByLabelText("Tax percentage"), {
    target: { value: "8.875" },
  });
  fireEvent.change(screen.getByLabelText("Tip percentage"), {
    target: { value: "20" },
  });
  fireEvent.change(screen.getByLabelText("Persons"), {
    target: { value: "2" },
  });

  expect(screen.getByLabelText("Tax amount")).toHaveValue("8.88");
  expect(screen.getByLabelText("Tip amount")).toHaveValue("20.00");
  expect(screen.getByLabelText("Total")).toHaveValue("128.88");
  expect(screen.getByLabelText("Per person")).toHaveValue("64.44");

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class=""
  >
    <span
      class=""
    >
      <label
        class=""
        data-baseweb="form-control-label"
        for="subtotal"
      >
        Subtotal
      </label>
    </span>
    <div
      class=""
      data-baseweb="form-control-container"
    >
      <div
        class=""
        data-baseweb="input"
      >
        <div
          class=""
          data-baseweb="base-input"
        >
          <input
            aria-invalid="false"
            aria-required="false"
            autocomplete="on"
            class=""
            id="subtotal"
            inputmode="decimal"
            name=""
            placeholder=""
            type="text"
            value="100"
          />
        </div>
      </div>
    </div>
    <div
      class=""
    >
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="taxAmount"
          >
            Tax amount
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
            >
              $
            </div>
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="taxAmount"
                inputmode="decimal"
                name=""
                placeholder=""
                type="text"
                value="8.88"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="taxPercentage"
          >
            Tax percentage
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="taxPercentage"
                inputmode="decimal"
                name=""
                placeholder=""
                type="text"
                value="8.875"
              />
            </div>
            <div
              class=""
            >
              %
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class=""
    >
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="tipAmount"
          >
            Tip amount
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
            >
              $
            </div>
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="tipAmount"
                inputmode="decimal"
                name=""
                placeholder=""
                type="text"
                value="20.00"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="tipPercentage"
          >
            Tip percentage
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="tipPercentage"
                inputmode="decimal"
                name=""
                placeholder=""
                type="text"
                value="20"
              />
            </div>
            <div
              class=""
            >
              %
            </div>
          </div>
        </div>
      </div>
    </div>
    <span
      class=""
    >
      <label
        class=""
        data-baseweb="form-control-label"
        for="total"
      >
        Total
      </label>
    </span>
    <div
      class=""
      data-baseweb="form-control-container"
    >
      <div
        class=""
        data-baseweb="input"
      >
        <div
          class=""
          data-baseweb="base-input"
        >
          <input
            aria-invalid="false"
            aria-required="false"
            autocomplete="on"
            class=""
            id="total"
            inputmode="text"
            name=""
            placeholder=""
            type="text"
            value="128.88"
          />
        </div>
      </div>
    </div>
    <div
      class=""
    >
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="perPersonAmount"
          >
            Per person
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
            >
              $
            </div>
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="perPersonAmount"
                inputmode="text"
                name=""
                placeholder=""
                type="text"
                value="64.44"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="numberOfPersons"
          >
            Persons
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="numberOfPersons"
                inputmode="numeric"
                name=""
                placeholder=""
                type="text"
                value="2"
              />
            </div>
            <div
              class=""
            >
              👥
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</DocumentFragment>
`);
});

test("TipCalculator - enter amounts", () => {
  const { asFragment, container } = render(<TipCalculator />);

  fireEvent.change(screen.getByLabelText("Subtotal"), {
    target: { value: "140" },
  });
  fireEvent.change(screen.getByLabelText("Tax amount"), {
    target: { value: "12.43" },
  });
  fireEvent.change(screen.getByLabelText("Tip amount"), {
    target: { value: "25.20" },
  });
  fireEvent.change(screen.getByLabelText("Persons"), {
    target: { value: "3" },
  });

  expect(screen.getByLabelText("Tax percentage")).toHaveValue("8.875");
  expect(screen.getByLabelText("Tip percentage")).toHaveValue("18");
  expect(screen.getByLabelText("Total")).toHaveValue("177.63");
  expect(screen.getByLabelText("Per person")).toHaveValue("59.21");

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class=""
  >
    <span
      class=""
    >
      <label
        class=""
        data-baseweb="form-control-label"
        for="subtotal"
      >
        Subtotal
      </label>
    </span>
    <div
      class=""
      data-baseweb="form-control-container"
    >
      <div
        class=""
        data-baseweb="input"
      >
        <div
          class=""
          data-baseweb="base-input"
        >
          <input
            aria-invalid="false"
            aria-required="false"
            autocomplete="on"
            class=""
            id="subtotal"
            inputmode="decimal"
            name=""
            placeholder=""
            type="text"
            value="140"
          />
        </div>
      </div>
    </div>
    <div
      class=""
    >
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="taxAmount"
          >
            Tax amount
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
            >
              $
            </div>
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="taxAmount"
                inputmode="decimal"
                name=""
                placeholder=""
                type="text"
                value="12.43"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="taxPercentage"
          >
            Tax percentage
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="taxPercentage"
                inputmode="decimal"
                name=""
                placeholder=""
                type="text"
                value="8.875"
              />
            </div>
            <div
              class=""
            >
              %
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class=""
    >
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="tipAmount"
          >
            Tip amount
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
            >
              $
            </div>
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="tipAmount"
                inputmode="decimal"
                name=""
                placeholder=""
                type="text"
                value="25.20"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="tipPercentage"
          >
            Tip percentage
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="tipPercentage"
                inputmode="decimal"
                name=""
                placeholder=""
                type="text"
                value="18"
              />
            </div>
            <div
              class=""
            >
              %
            </div>
          </div>
        </div>
      </div>
    </div>
    <span
      class=""
    >
      <label
        class=""
        data-baseweb="form-control-label"
        for="total"
      >
        Total
      </label>
    </span>
    <div
      class=""
      data-baseweb="form-control-container"
    >
      <div
        class=""
        data-baseweb="input"
      >
        <div
          class=""
          data-baseweb="base-input"
        >
          <input
            aria-invalid="false"
            aria-required="false"
            autocomplete="on"
            class=""
            id="total"
            inputmode="text"
            name=""
            placeholder=""
            type="text"
            value="177.63"
          />
        </div>
      </div>
    </div>
    <div
      class=""
    >
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="perPersonAmount"
          >
            Per person
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
            >
              $
            </div>
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="perPersonAmount"
                inputmode="text"
                name=""
                placeholder=""
                type="text"
                value="59.21"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <span
          class=""
        >
          <label
            class=""
            data-baseweb="form-control-label"
            for="numberOfPersons"
          >
            Persons
          </label>
        </span>
        <div
          class=""
          data-baseweb="form-control-container"
        >
          <div
            class=""
            data-baseweb="input"
          >
            <div
              class=""
              data-baseweb="base-input"
            >
              <input
                aria-invalid="false"
                aria-required="false"
                autocomplete="on"
                class=""
                id="numberOfPersons"
                inputmode="numeric"
                name=""
                placeholder=""
                type="text"
                value="3"
              />
            </div>
            <div
              class=""
            >
              👥
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</DocumentFragment>
`);
});
