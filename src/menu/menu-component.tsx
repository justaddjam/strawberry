import * as React from "react";
import { MenuItemComponent } from "./menu-item-component";
import { ContentContainerComponent } from "../containers/content-container-component";

export interface MenuProps {
    title: string;
}

export class MenuComponent extends React.PureComponent<MenuProps> {
    public render() {
        return  <nav>
                    <ContentContainerComponent>
                        <span className="title">{this.props.title}</span>
                        <div className="menu-item-list">
                            {this.props.children}
                        </div>
                    </ContentContainerComponent>
                </nav>;
    }
} 