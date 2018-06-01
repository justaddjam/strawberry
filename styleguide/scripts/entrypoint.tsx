import { render } from "react-dom";
import * as React from "react";
import { Styleguide } from "./styleguide";

const reactRoot = document.createElement("div");
reactRoot.id = "react-root";
document.body.appendChild(reactRoot)

render(<Styleguide />, reactRoot);
