import * as React from "react";

export interface ButtonProps {
    type?: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => any;
}

export class ButtonComponent extends React.PureComponent<ButtonProps> {

    public render() {
        const { props } = this;
        const filteredProps: any = {};

        return <button {...props} type={props.type || "button"} disabled={props.disabled} >{props.children}</button>;
    }
}
