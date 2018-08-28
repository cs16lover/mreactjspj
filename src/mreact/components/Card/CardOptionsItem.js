import React, { Component } from 'react';
import cn from "classnames";
import { Icon } from "../";

class CardOptionsItem extends Component {
  render() {
    const { className, 
      children, 
      icon,
      type,
      onClick, } = this.props;
    const classes = cn(
      {
        "m-card-options-collapse": type === "collapse",
        "m-card-options-remove": type === "close",
        "m-card-options-fullscreen": type === "fullscreen",
      },
      className
    );
  
    const dataToggle = (() => {
      switch (type) {
        case "collapse":
          return "card-collapse";
        case "close":
          return "card-remove";
        case "fullscreen":
          return "card-remove";
        default:
          return "";
      }
    })();
  
    const iconName = (() => {
      if (icon) {
        return icon;
      }
      switch (type) {
        case "collapse":
          return "chevron-up";
        case "close":
          return "x";
        case "fullscreen":
          return "maximize";
        default:
          return "";
      }
    })();
    return (
      <a className={classes} data-toggle={dataToggle} onClick={onClick}>
        <Icon name={iconName} />
      </a>
    );
  }
}
CardOptionsItem.displayName = "Card.OptionsItem";

export default CardOptionsItem;
