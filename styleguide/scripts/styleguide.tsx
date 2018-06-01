import { ButtonComponent, FormComponent, FormInputComponent, notify } from "../../src";
import * as React from "react";

function logSubmit(data: any) {
    (window as any)._recentData = data;
    console.log(data);
}

export class Styleguide extends React.Component<any, any> {

    public render() {
        return (
            <>
                <ButtonComponent>Test</ButtonComponent>

                <FormComponent id="test" onSubmit={(d: any) => notify("Submitted: " + JSON.stringify(d))}>
                    <FormInputComponent name="familyName" label="family name" required />
                    <FormInputComponent name="givenName" label="given name" required />
                    <ButtonComponent type="submit">Submit</ButtonComponent>
                </FormComponent>
            </>
        )
    }
}
