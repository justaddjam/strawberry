import * as React from "react";
import { Link } from "react-router-dom";

export interface MenuItemProps {
    link: string;
}

export class MenuItemComponent extends React.Component<MenuItemProps> {
    public render() {
        return  <Link to={this.props.link}>
                    <div className="menu-item">{this.props.children}</div>
                </Link>;
    }
} 