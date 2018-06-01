import * as React from "react";
import { ContentContainerComponent } from "./content-container-component";

export class FooterComponent extends React.PureComponent {
    public render() {
        return  <footer>
                    <ContentContainerComponent>{this.props.children}</ContentContainerComponent>
                </footer>;
    }
} 
