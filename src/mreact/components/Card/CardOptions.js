import React, { Component } from 'react';
import cn from "classnames";

class CardOptions extends Component {
  render() {
    const { className, children } = this.props;
    const classes = cn("m-card-options", className);
    return <div className={classes}>{children}</div>;
  }
}

CardOptions.displayName = "Card.Options";

export default CardOptions;
