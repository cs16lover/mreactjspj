import React, { Component } from 'react';
import cn from "classnames";

class CardBody extends Component {
  render() {
    const { className, children } = this.props;
    const classes = cn("m-card-body", className);
    return <div className={classes}>{children}</div>;
  }
}
CardBody.displayName = "Card.Body";

export default CardBody;
