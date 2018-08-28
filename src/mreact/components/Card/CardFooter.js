import React, { Component } from 'react';
import cn from "classnames";

class CardFooter extends Component {
  render() {
    const { className, children } = this.props;
    const classes = cn("m-card-footer", className);
    return <div className={classes}>{children}</div>;
  }
}

CardFooter.displayName = "Card.Footer";

export default CardFooter;
