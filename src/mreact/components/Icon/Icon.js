import React, { Component } from 'react';
import cn from "classnames";

class Icon extends Component {
  render() {
    const { prefix: prefixFromProps = "fe",
    name,
    className,
    link,
    isAriaHidden,
    payment,
    flag,
    onClick,
    onMouseEnter,
    onMouseLeave,
    // onPointerEnter,
    // onPointerLeave,
    onFocus,
    onBlur, } = this.props;
    const prefix = (payment && "payment") || (flag && "flag") || prefixFromProps;
    const classes = cn(
      {
        [prefix]: true,
        [`${prefix}-${name}`]: true,
      },
      className
    );
    const extraProps = isAriaHidden
      ? {
          "aria-hidden": "true",
        }
      : null;

    const eventProps = {
      onClick,
      onMouseEnter,
      onMouseLeave,
      // onPointerEnter,
      // onPointerLeave,
      onFocus,
      onBlur,
    };

    return !link ? (
      <i className={classes} {...eventProps} />
    ) : (
      <a className="icon" {...extraProps} {...eventProps}>
        <i className={classes} />
      </a>
    );
  }
}
Icon.displayName = "Icon";

/** @component */
export default Icon;
