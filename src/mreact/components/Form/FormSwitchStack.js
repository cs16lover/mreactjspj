import React, { Component } from 'react';
import cn from "classnames";

// type Props = {| +children?: React.Node, +className?: string |};

// function FormToggleStack({ className, children }: Props): React.Node {
//   const classes = cn("custom-switches-stacked", className);
//   return <div className={classes}>{children}</div>;
// }

class FormToggleStack extends Component {
  render() {
    const { className, children } = this.props;
    const classes = cn("custom-switches-stacked", className);
    return <div className={classes}>{children}</div>;
  }
}
FormToggleStack.displayName = "Form.ToggleStack";

export default FormToggleStack;
