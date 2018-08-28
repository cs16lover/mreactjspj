import React, { Component } from 'react';
import cn from "classnames";
import Form from "./Form";
import FormInputGroupAppend from "./FormInputGroupAppend";
import FormInputGroupPrepend from "./FormInputGroupPrepend";
// import type { Props as InputProps } from "./FormInput";

// type Props = {|
//   +children?: React.Node,
//   +className?: string,
//   +append?: React.Node,
//   +prepend?: React.Node,
//   +RootComponent?: React.ElementType,
//   +inputProps?: InputProps,
// |};

// function FormInputGroup(props: Props): React.Node {
//   const { className, append, prepend, RootComponent, inputProps } = props;
//   const classes = cn(
//     {
//       "input-group": true,
//     },
//     className
//   );
//   const Component = RootComponent || "div";
//   const children = inputProps ? <Form.Input {...inputProps} /> : props.children;

//   if (prepend === true) {
//     return <FormInputGroupPrepend>{children}</FormInputGroupPrepend>;
//   }

//   if (append === true) {
//     return <FormInputGroupAppend>{children}</FormInputGroupAppend>;
//   }

//   return (
//     <Component className={classes}>
//       {prepend && <FormInputGroupPrepend>{prepend}</FormInputGroupPrepend>}
//       {children}
//       {append && <FormInputGroupAppend>{append}</FormInputGroupAppend>}
//     </Component>
//   );
// }
class FormInputGroup extends Component {
  render() {
    const { className, append, prepend, RootComponent, inputProps } = this.props;
    const classes = cn(
      {
        "input-group": true,
      },
      className
    );
    const Component = RootComponent || "div";
    const children = inputProps ? <Form.Input {...inputProps} /> : this.props.children;
  
    if (prepend === true) {
      return <FormInputGroupPrepend>{children}</FormInputGroupPrepend>;
    }
  
    if (append === true) {
      return <FormInputGroupAppend>{children}</FormInputGroupAppend>;
    }
  
    return (
      <Component className={classes}>
        {prepend && <FormInputGroupPrepend>{prepend}</FormInputGroupPrepend>}
        {children}
        {append && <FormInputGroupAppend>{append}</FormInputGroupAppend>}
      </Component>
    );
  }
}
FormInputGroup.displayName = "Form.InputGroup";

export default FormInputGroup;
