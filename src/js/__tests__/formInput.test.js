import React from "react";
import { fireEvent, render } from "@testing-library/react";

import FormInput from '../components/form-input/formInput';

describe("FormInput component", () => {
    test("should be available", () => {
        const textValue = 'Benil';
        const element = render(
            <FormInput
                onChange={() => {}}
                value="Benil"
            />
        ).getByRole('textbox');

        // fireEvent.change(inputField, { target: { value: textValue } });
        // expect(inputField.textContent).toBe(textValue);
        expect(element).toBeTruthy();
    });
});
