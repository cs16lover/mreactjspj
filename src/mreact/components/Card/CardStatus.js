import React, { Component } from 'react';
import cn from "classnames";

class CardStatus extends Component {
  render() {
    const { className, children, color, side } = this.props;
    const classes = cn(
      {
        "m-card-status": true,
        [`m-bg-${color}`]: true,
        [`m-card-status-left`]: side,
      },
      className
    );
    return <div className={classes}>{children}</div>;
  }
}
CardStatus.displayName = "Card.Status";
export default CardStatus;
