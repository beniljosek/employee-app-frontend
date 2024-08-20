import React from "react";
import { render } from "@testing-library/react";

import Button from '../components/button/button';

describe("Button component", () => {
    test("should be available", () => {
        const element = render(<Button />);
        expect(element).toBeTruthy();
    });

    test("should display label properly", () => {
        const label = "Click";
        const { getByText } = render(<Button label={label} />);
        getByText(label);
    });

    test("should match snapshot", () => {
        const { container } = render(<Button label="Click" />);
        expect(container).toMatchSnapshot();
    });
});