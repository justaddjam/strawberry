require("!style-loader!css-loader!sass-loader!../../src/index.scss");

import { ButtonComponent, FormComponent, FormInputComponent, notify, showConfirmDialog } from "../../src";
import * as React from "react";

async function confirmUserIsSure() {
    const result = await showConfirmDialog({ 
        prompt: "Are you sure?"
    });

    result.confirmed ? notify("Do it!") : notify("I've changed my mind!");
}

export class Styleguide extends React.Component<any, any> {

    public render() {
        return (
            <>
                <ButtonComponent onClick={confirmUserIsSure}>Do something dangerous</ButtonComponent>

                <FormComponent id="test" onSubmit={(d: any) => notify("Submitted: " + JSON.stringify(d))}>
                    <FormInputComponent name="familyName" label="family name" required />
                    <FormInputComponent name="givenName" label="given name" required />
                    <ButtonComponent type="submit">Submit</ButtonComponent>
                </FormComponent>
            </>
        )
    }
}
