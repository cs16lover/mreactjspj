import React, { Component } from 'react';
import cn from "classnames";

class CardTitle extends Component {
  render() {
    const { className, children, RootComponent } = this.props;
    const classes = cn("m-card-title", className);
    const Component = RootComponent || "h3";
    return <Component className={classes}>{children}</Component>;
  }
}

CardTitle.displayName = "Card.Title";
export default CardTitle;
