import React, { Component } from 'react';
import cn from "classnames";

class FormLabel extends Component {
  render() {
    const { className,
      aside,
      children,
      onClick,
      onMouseEnter,
      onMouseLeave,
      // onPointerEnter,
      // onPointerLeave, 
    } = this.props;
      const classes = cn("form-label", className);
    return (
      <label
        className={classes}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
      >
        {aside && <span className="form-label-small">{aside}</span>}
        {children}
      </label>
    );
  }
}
FormLabel.displayName = "Form.Label";

export default FormLabel;
