import React, { Component } from 'react';
import cn from "classnames";

class CardHeader extends Component {
  render() {
    const { className, children, backgroundURL = "" } = this.props;
    const classes = cn("m-card-header", className);
    return (
      <div
        className={classes}
        style={
          backgroundURL
            ? Object.assign({
                backgroundImage: `url(${backgroundURL})`,
              })
            : null
        }
      >
        {children}
      </div>
    );
  }
}

CardHeader.displayName = "Card.Header";
export default CardHeader;
