import React, { Component } from 'react';
import cn from "classnames";

class CardAlert extends Component {
  render() {
    const { className, children, color } = this.props;
    const classes = cn(`m-card-alert m-alert m-alert-${color} m-mb-0`, className);
    return <div className={classes}>{children}</div>;
  }
}
CardAlert.displayName = "Card.Alert";

export default CardAlert;
