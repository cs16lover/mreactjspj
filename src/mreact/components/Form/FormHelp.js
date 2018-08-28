import React, { Component } from 'react';
import cn from "classnames";

// type Props = {|
//   +children?: React.Node,
//   +className?: string,
//   +position?: "top" | "bottom",
//   +message?: React.Node,
// |};

class FormHelp extends Component {
  render() {
    const { className,
      children,
      position = "top",
      message, } = this.props;
    const classes = cn("form-help", className);
    return (
      <span
        className={classes}
        dataContent={message}
        dataToggle="popover"
        dataPlacement={position}
      >
        {children || "?"}
      </span>
    );
  }
}
FormHelp.displayName = "Form.Help";

export default FormHelp;
