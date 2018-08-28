import React, { Component } from 'react';
import cn from "classnames";

// type Props = {|
//   +children?: React.Node,
//   +className?: string,
// |};

// function FormFieldSet({ className, children }: Props): React.Node {
//   const classes = cn("form-fieldset", className);
//   return <fieldset className={classes}>{children}</fieldset>;
// }
class FormFieldSet extends Component {
  render() {
    const { className, children } = this.props;
    const classes = cn("form-fieldset", className);
    return <fieldset className={classes}>{children}</fieldset>;
  }
}
FormFieldSet.displayName = "Form.FieldSet";

export default FormFieldSet;
