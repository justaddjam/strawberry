import * as React from "react";
import { InputError } from "./form-component";

export interface FormFieldProps {
    labelText: string;
    required: boolean;
    name: string;
    errors: Array<InputError>
}

export class FormFieldComponent extends React.PureComponent<FormFieldProps> {

    public render() {
        const { props } = this;

        return  <div className="form-field">
                    <label htmlFor={props.name}>{props.labelText}{props.required && <abbr title="required">*</abbr>}</label>
                    {props.children}
                    {props.errors &&
                    <ul className="errors-list">
                        {props.errors.map((error: any, index: number) => <li key={index}>{error.message}</li>)}
                    </ul>}
                </div>;
    }
}
