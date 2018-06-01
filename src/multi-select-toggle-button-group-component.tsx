import * as React from "react";
import { ButtonComponent } from "./button-component";

export interface MultiSelectToggleButtonGroupProps {
    options: Array<MultiSelectToggleButton>;
}

export interface MultiSelectToggleButtonGroupState {
    options: Array<MultiSelectToggleButton>;
}

export interface MultiSelectToggleButton {
    selected: boolean;
    label: string;
}

export class MultiSelectToggleButtonGroupComponent extends React.Component<MultiSelectToggleButtonGroupProps, MultiSelectToggleButtonGroupState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            options: this.props.options
        };
    }

    private _handleChange(selectedOption: any) {

        selectedOption.selected = !selectedOption.selected;

        this.setState({
            options: this.state.options
        });
    }

    public render() {
        return <div className="toggle-button-group">
                    {this.state.options.map((option, index) => <ButtonComponent key={index} className={`toggle-button${option.selected? " on" : ""}`} onClick={() => this._handleChange(option)}>{option.label}</ButtonComponent>)}
               </div>;
    }
}
