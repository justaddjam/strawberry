import * as React from "react";
import { connect, Provider } from "react-redux";
import { ContentContainerComponent } from "./content-container-component";
import { notify } from "./notifications";

const formContext = React.createContext<FormInfo<any>>(null);

function validateForm<T>(inputValue: any, inputName: string, form: FormInfo<T>) {
    const newErrors = { ...form.errors };
    newErrors[inputName] = form.validators[inputName] ? form.validators[inputName]
                                .filter(x => x.isValid(inputValue) === false)
                                .map(x => {
                                    return { message: x.message}
                                }) : [];
    return newErrors;
}

export interface FormProps<T> {
    id: string;
    onSubmit(data: T): any;
}

export interface FormState<T> {
    form: FormInfo<T>;
}

export interface FormInfo<T> {
    id: string;
    errors: { [property: string]: Array<InputError> }
    data: T;
    validators: { [property: string]: Array<Validator> }
    inputBlur(payload: any): void;
    inputValueChange(payload: any): void;
    registerValidators(payload: any): void;
}

export interface InputError {
    message: string;
}

export interface Validator {
    message: string;
    isValid<T>(value: T): boolean;
}

export const FormContext = formContext.Consumer;

export default class FormComponent<T extends { [property: string]: any }> extends React.Component<FormProps<T>, FormState<T>> {

    public constructor(props: any) {
        super(props);

        this.state = {
            form: {
                id: props.id,
                data: {} as T,
                errors: {},
                validators: {},
                inputBlur: (payload: any) => {
                    const { inputName, formId } = payload;

                    const form = this.state.form;
                    form.errors = validateForm(form.data[inputName], inputName, form);

                    this.setState({
                        form
                    });
                },
                inputValueChange: (payload: any) => {

                    const { inputName, newValue } = payload;

                    const form = this.state.form;
                    form.data[inputName] = newValue;
        
                    if (this.state.form.errors[inputName]) {
                        form.errors = validateForm(form.data[inputName], inputName, form);
                    }
                    
                    this.setState({
                        form
                    });
                },
                registerValidators: (payload: any) => {
                    const { inputName, validators } = payload;

                    const form = this.state.form;
                    form.validators[inputName] = validators;
                    
                    this.setState({
                        form
                    });
                }
            }
        };
    }

    private _onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { form } = this.state;

        Object.keys(form.validators).forEach(key => {
            form.errors = validateForm(form.data[key], key, form);
        });

        this.setState({
            form: { ...form }
        });

        const errorCount = Object.keys(form.errors)
                                    .map(x => form.errors[x] ? form.errors[x].length : 0)
                                    .reduce((a, b) => a + b, 0);

        if (errorCount > 0) {
            return notify("There are some errors");
        }

        this.props.onSubmit(form.data);
    }

    public render() {
        const { props } = this;

        return  <formContext.Provider value={this.state.form}>
                    <form onSubmit={this._onSubmit.bind(this)}>
                        {props.children}
                    </form>
                </formContext.Provider>;
    }
}
