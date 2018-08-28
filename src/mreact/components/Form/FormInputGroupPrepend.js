import React, { Component } from 'react';
import cn from "classnames";

// type Props = {|
//   +children?: React.Node,
//   +className?: string,
// |};

// function FormInputGroupPrepend({ className, children }: Props): React.Node {
//   const classes = cn("input-group-prepend", className);
//   return <span className={classes}>{children}</span>;
// }

class FormInputGroupPrepend extends Component {
  render() {
    const { className, children } = this.props;
    const classes = cn("input-group-prepend", className);
    return <span className={classes}>{children}</span>;
  }
}
FormInputGroupPrepend.displayName = "Form.InputGroupPrepend";

export default FormInputGroupPrepend;
