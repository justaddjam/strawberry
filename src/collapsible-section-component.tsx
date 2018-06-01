import * as React from "react";

export interface CollapsibleSectionState {
    open: boolean;
}

export class CollapsibleSectionComponent extends React.Component<{}, CollapsibleSectionState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            open: false
        };
    }

    public render() {
        const children = this.props.children as React.ReactElement<any>[]; 

        return  <div className="collapsible-section-container">
                    <div className="collapsible-section-header" onClick={() => this.setState({ open: !this.state.open })}>                        
                        {children[0]}
                    </div>
                    {
                        this.state.open &&
                        <div className="collapsible-section">
                            {children[1]}
                        </div>
                    }
                </div>;
    }
}
