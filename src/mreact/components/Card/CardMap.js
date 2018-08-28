import React, { Component } from 'react';
import cn from "classnames";

class CardMap extends Component {
  render() {
    const { className, children, placeholder } = this.props;
    const classes = cn(
      "m-card-map",
      { "m-card-map-placeholder": placeholder },
      className
    );
    return (
      <div
        className={classes}
        style={placeholder && { backgroundImage: `url(${placeholder})` }}
      >
        {children}
      </div>
    );
  }
}
CardMap.displayName = "Card.Map";

export default CardMap;
