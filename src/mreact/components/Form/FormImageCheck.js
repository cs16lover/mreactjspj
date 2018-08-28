import React, { Component } from 'react';
import cn from "classnames";
import Grid from "../Grid";

// type Props = {| +children?: React.Node, +className?: string |};

// function FormImageCheck({ className, children }: Props): React.Node {
//   const classes = cn("gutters-sm", className);
//   return <Grid.Row className={classes}>{children}</Grid.Row>;
// }

class FormImageCheck extends Component {
  render() {
    const { className, children } = this.props;
    const classes = cn("gutters-sm", className);
    return <Grid.Row className={classes}>{children}</Grid.Row>;
  }
}
FormImageCheck.displayName = "Form.ImageCheck";

export default FormImageCheck;
