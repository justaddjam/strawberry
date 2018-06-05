import * as React from "react";
import { FormFieldComponent } from "./form-field-component";
import { FormContext, FormInfo } from "./form-component";

export interface FormInputProps<T> { 
    name: string;
    label: string;
    required?: boolean;
    form: FormInfo<T>;
    type?: string;
    disabled?: boolean;
    value: any;
};

export interface FormInputState {
    value: any;
};

export function withForm(Component: any) {
    return function FormComponent(props: any) {
        return (
            <FormContext>
            {formContext => {
                return <Component {...props} form={formContext} />}
            }
            </FormContext>
          );
    }
}

class FormInputComponent<T> extends React.Component<FormInputProps<T>, FormInputState> {

    public constructor(props: any, context: any) {
        super(props);
        
        this.state = {
            value: props.form.data[props.name] || ""
        };

        this._registerValidators(props); 
    }

    private _registerValidators(props: any) {

        const validators: Array<any> = [];

        if (props.required) {
            validators.push({
                isValid(value: any) {
                    return !!value;
                },
                message: `${props.label || props.name} must be set.`
            });
        }

        props.form.registerValidators({
            inputName: props.name,
            validators
        });
    }

    private _handleChange(event: React.ChangeEvent<HTMLInputElement>, formId: string) {
        const { name, form } = this.props;

        this.setState({
            value: event.target.value
        });

        form.inputValueChange({
            formId,
            inputName: name,
            newValue: event.target.value
        });
    }

    private _handleBlur(event: React.FocusEvent<HTMLInputElement>, formId: string) {
        const { name, form } = this.props;

        form.inputBlur({
            formId,
            inputName: name
        });
    }

    public render() {
        const { props } = this;

        const name = props.name;
        const form = props.form;

        return form && <FormFieldComponent labelText={props.label} name={name} errors={form.errors[name]} required={props.required} >
                        <input type={props.type || "text"}
                            disabled={props.disabled}
                            name={name}
                            id={name}
                            onChange={(event) => this._handleChange(event, props.form.id)}
                            onBlur={(event) => this._handleBlur(event, props.form.id)}
                            value={this.state.value} />
                    </FormFieldComponent>;
    }
}

export default withForm(FormInputComponent);
