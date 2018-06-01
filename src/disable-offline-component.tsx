import * as React from "react";
import { PopupComponent } from "./popup-component";

export interface DisableOfflineState {
    online: boolean;
}

export class DisableOfflineComponent extends React.Component<{}, DisableOfflineState> {
    public constructor(props: {}) {
        super(props);

        this.state = {
            online: navigator.onLine
        };

        window.addEventListener('online', () => this._handleOnline());
        window.addEventListener('offline', () => this._handleOffline());
    }

    private _handleOffline() {
        this.setState({
            online: false
        });
    }
    
    private _handleOnline() {
        this.setState({
            online: true
        });
    }

    public a: React.ReactElement<any>;

    public render() {
        const children = React.Children.toArray(this.props.children).map(child => React.cloneElement(child as any, { disabled: !this.state.online }));

        return  <PopupComponent showPopup={!this.state.online} popupText="unavailable offline">
                    {children}
                </PopupComponent>;
    }
}
