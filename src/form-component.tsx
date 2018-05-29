import * as React from "react";
import { connect } from "react-redux";
import { ContentContainerComponent } from "./content-container-component";
import { FORM_INPUT_VALUE_CHANGE, FORM_INPUT_BLUR, FORM_INPUT_REGISTER_VALIDATORS } from "./form-input-component";
const FORM_CREATE = "FORM_CREATE";
import { notify } from "./notifications";

const formContext = React.createContext({
    formId: null
});

function validateForm(inputValue: any, inputName: string, form: { [inputName: string]: { [inputName: string]: Array<any> } }) {
    const newErrors = { ...form.errors };
    newErrors[inputName] = form.validators[inputName] ? form.validators[inputName]
                                .filter(x => x.isValid(inputValue) === false)
                                .map(x => {
                                    return { message: x.message}
                                }) : [];
    return newErrors;
}

function getFormState(state: any, formId: string) {
    return { ...state[formId] } || { data: {}, errors: {}, validators: {} };
}

export function formReducer(state: any = {}, { type, payload }: any) {
    switch (type) {
        case FORM_CREATE: {
            return { ...state, [payload.formId]: { data: payload.data || {}, errors: {} }}
        }
        case FORM_INPUT_REGISTER_VALIDATORS: {    
            const { inputName, formId, validators } = payload;

            const newState = { ...state };
            const model = getFormState(state, formId);

            if (!model.validators) {
                model.validators = {};
            }

            model.validators[inputName] = validators;
            newState[formId] = model;

            return newState;
        }
        case FORM_INPUT_VALUE_CHANGE: {
            const { inputName, newValue, formId } = payload;

            const model = getFormState(state, formId);
            model.data[inputName] = newValue;
            const newState = { ...state };

            if (model.errors[inputName]) {
                model.errors = validateForm(newValue, inputName, model);
            }
            
            newState[formId] = model;

            return newState;
        }
        case FORM_INPUT_BLUR: {
            const { inputName, formId } = payload;

            const model = getFormState(state, formId);
            model.errors = validateForm(model.data[inputName], inputName, model);

            const newState = { ...state };

            newState[formId] = model;

            return newState;
        }
        default:
            return state;
    }
}

export const FormContext = formContext.Consumer;

class FormComponent extends React.Component<any, any> {

    public constructor(props: any) {
        super(props);

        props.dispatch({
            type: FORM_CREATE,
            payload: {
                formId: props.id,
                data: props.model
            }
        });
    }

    private _onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let validators: { [id: string]: Array<any> } = this.props.model.validators;

        const errorCount = Object.keys(validators)
                .map(key => {
                    return validators[key].filter(x => x.isValid(this.props.model.data[key])).map(x => x.message);
                })
                .reduce((v, c) => {
                    return [ ...c, ...v ];
                }, [])
                .length;

        if (errorCount > 0) {
            return notify("There are some errors");
        }

        this.props.onSubmit(this.props.model);
    }

    public render() {
        const { props } = this;

        return  <formContext.Provider value={{ formId: props.id }}>
                    <form onSubmit={this._onSubmit.bind(this)}>
                        {props.children}
                    </form>
                </formContext.Provider>;
    }
} 

export default connect<any, any, any>((state: any) => state)(FormComponent);
