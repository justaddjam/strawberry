import { render } from "react-dom";
import * as React from "react";
import { createWrapperComponent } from "./create-wrapper-component";
import { ButtonComponent } from "./button-component";

export interface ConfirmDialogProps {
    prompt: React.ReactNode;
    onResult?: (a: any) => any;
}

const DialogBackdropComponent = createWrapperComponent({ className: "dialog-backdrop" });
const DialogComponent = createWrapperComponent({ className: "dialog" });
const DialogBodyComponent = createWrapperComponent({ className: "dialog-body" });
const DialogActionBarComponent = createWrapperComponent({ className: "dialog-action-bar" });

export interface ConfirmDialogResult {
    confirmed: boolean;
}

export class ConfirmDialogComponent extends React.PureComponent<ConfirmDialogProps> {

    public constructor(props: ConfirmDialogProps) {
        super(props);
    }

    public render() {
        return (
            <DialogBackdropComponent>
                <DialogComponent>
                    <DialogBodyComponent>
                        {this.props.prompt}
                    </DialogBodyComponent>
                    <DialogActionBarComponent>
                        <ButtonComponent onClick={() => this.props.onResult({ confirmed: true })}>Confirm</ButtonComponent>
                        <ButtonComponent onClick={() => this.props.onResult({ confirmed: false })}>Cancel</ButtonComponent>
                    </DialogActionBarComponent>
                </DialogComponent>
            </DialogBackdropComponent>
        );
    }
}

const dialogContainer = document.createElement("div");
dialogContainer.id = "confirm-dialog-container";
document.body.appendChild(dialogContainer);

export class DialogContainerComponent extends React.Component<{}, { dialogs: Array<React.Component>}> {
    public constructor(props: any) {
        super(props);

        this.state = {
            dialogs: []
        };
    }

    public showDialog(Component: any, props: any, resolve: any) {
        const dialog = <Component {...props} onResult={(result: any) => {
            this.removeDialog(dialog);
            resolve(result);
        }} /> as any;

        this.state.dialogs.push(dialog);

        this.setState({
            dialogs: this.state.dialogs
        });
    }

    public removeDialog(dialog: React.Component) {
        this.state.dialogs.splice(this.state.dialogs.indexOf(dialog), 1);

        this.setState({
            dialogs: this.state.dialogs
        });
    }

    public render() {
        return (<>{this.state.dialogs}</>)
    }
}

const container = render(<DialogContainerComponent />, dialogContainer) as DialogContainerComponent;

const showDialog = container.showDialog.bind(container)

export {
    showDialog
}

export async function showConfirmDialog(props: ConfirmDialogProps) {    
    return new Promise<ConfirmDialogResult>(resolve => {
        showDialog(ConfirmDialogComponent, props, resolve)
    });
}
