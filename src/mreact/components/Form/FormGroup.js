import React, { Component } from 'react';
import cn from "classnames";
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";

class FormGroup extends Component {
  render() {
    const { className,
      children,
      label,
      isRequired,
      inputProps, } = this.props;
    const classes = cn("form-group", className);
    const inputComponent =
      inputProps && React.createElement(FormInput, inputProps);
    return (
      <div className={classes}>
        {!label ? null : typeof label === "string" ? (
          <FormLabel>
            {label}
            {isRequired && <span className="form-required">*</span>}
          </FormLabel>
        ) : (
          label
        )}
        {inputComponent || children}
      </div>
    );
  }
}
FormGroup.displayName = "Form.Group";

export default FormGroup;
