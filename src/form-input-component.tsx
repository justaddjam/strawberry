import * as React from "react";
import { FormFieldComponent } from "./form-field-component";
import { connect } from "react-redux";
import { FormContext } from "./form-component";

export const FORM_INPUT_VALUE_CHANGE = "FORM_INPUT_VALUE_CHANGE";
export const FORM_INPUT_VALUE_INVALID = "FORM_INPUT_VALUE_INVALID";
export const FORM_INPUT_VALUE_VALID = "FORM_INPUT_VALUE_VALID";
export const FORM_INPUT_BLUR = "FORM_INPUT_BLUR";
export const FORM_INPUT_REGISTER_VALIDATORS = "FORM_INPUT_REGISTER_VALIDATORS";

export interface FormInputComponentProps { 
    name: string,
    label: string,
    required?: boolean
};

export function withForm(Component: any) {
    return function FormComponent(props: any) {
        return (
            <FormContext>
            {formContext => {
                const form = props.forms[formContext.formId];
                form.id = formContext.formId;

                const allProps = { ... props };
                delete allProps.forms;

                return <Component {...allProps} form={form} />}
            }
            </FormContext>
          );
    }
}

class FormInputComponent extends React.Component<any, any> {

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

        props.dispatch({ 
            type: FORM_INPUT_REGISTER_VALIDATORS,
            payload: {
                formId: props.form.id,
                inputName: props.name,
                validators
            }
        });
    }

    private _handleChange(event: React.ChangeEvent<HTMLInputElement>, formId: string) {
        const { name, dispatch } = this.props;

        this.setState({
            value: event.target.value
        });

        dispatch({ 
            type: FORM_INPUT_VALUE_CHANGE,
            payload: {
                formId,
                inputName: name,
                newValue: event.target.value
            }
        });
    }

    private _handleBlur(event: React.FocusEvent<HTMLInputElement>, formId: string) {
        const { name, dispatch } = this.props;

        dispatch({ 
            type: FORM_INPUT_BLUR,
            payload: { 
                formId,
                inputName: name,
                newValue: event.target.value
            }
        });
    }

    public render() {
        const { props } = this;

        const name = props.name;
        const form = props.form;

        return form && <FormFieldComponent labelText={props.label} name={name} errors={form.errors[name]}>
                        <input type={props.type || "text"}
                            disabled={props.disabled}
                            name={name}
                            id={props.form.id + "-" + name}
                            onChange={(event) => this._handleChange(event, props.form.id)}
                            onBlur={(event) => this._handleBlur(event, props.form.id)}
                            value={this.state.value} />
                    </FormFieldComponent>;
    }
}

// TODO: NOT HAPPY WITH THIS as is essentially
// just grabbing the form property of state regardless
// of what set to in the store - we need to check if
// we can do something smarter
export default connect<any, any, FormInputComponentProps>((state: any) => {
    return { forms: state.form };
})(withForm(FormInputComponent));
