import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from "../";
import cn from "classnames";
import FormGroup from "./FormGroup";

// import type {
//   FormEvents,
//   MouseEvents,
//   PointerEvents,
//   FocusEvents,
// } from "../../";

class FormInput extends Component {
  constructor(props) {
    super(props);
    console.log('FormInput constructor:',props);
    this.state = {
      defaultValue: this.props.defaultValue||"",
      value: this.props.defaultValue||"",
    };
  }
  componentWillReceiveProps(nextProps) {
    const me = this;
    console.log('FormInput componentWillReceiveProps:',this.props,nextProps);
    if (nextProps.defaultValue!=this.state.defaultValue) {
      me.setState({
        defaultValue: nextProps.defaultValue,
        value: this.props.defaultValue||"",
      });
    }
  }
  getValue=()=>{
    let _e = ReactDOM.findDOMNode(this).getElementsByTagName("input");
    // console.log('getValue:',_e,_e[0]);
    if(_e && _e.length>0){
      return _e[0].value;
    }
  }
  render() {
    console.log('FormInput render:',this.props);
    const { className,
      name,
      icon,
      position = "prepend",
      valid,
      tick,
      invalid,
      cross,
      error,
      placeholder,
      value,
      checked,
      onChange,
      onMouseEnter,
      onMouseLeave,
      // onPointerEnter,
      // onPointerLeave,
      onFocus,
      onBlur,
      disabled,
      readOnly,
      label, } = this.props;
    const type = this.props.type || "text";

    const classes = cn(
      {
        "form-control": type !== "checkbox" && type !== "radio",
        "custom-control-input": type === "checkbox" || type === "radio",
        "is-valid": valid,
        "state-valid": tick,
        "is-invalid": invalid || !!error,
        "state-invalid": cross || !!error,
      },
      className
    );
  
    const feedback = error || this.props.feedback;
  
    const allInputProps = {
      name,
      className: classes,
      type,
      placeholder,
      value,
      disabled,
      readOnly,
      onChange,
      onMouseEnter,
      onMouseLeave,
      // onPointerEnter,
      // onPointerLeave,
      onFocus,
      onBlur,
    };
  
    const contents = !icon ? (
      <React.Fragment>
        {type === "checkbox" || type === "radio" ? (
          <input {...allInputProps} checked={checked} />
        ) : (
          <input {...allInputProps} value={this.state.value}/>
        )}
        {feedback && <span className="invalid-feedback">{feedback}</span>}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="input-icon">
          {position === "prepend" && (
            <span className="input-icon-addon">
              <Icon name={icon} />
            </span>
          )}
          <input {...allInputProps} />
          {position === "append" && (
            <span className="input-icon-addon">
              <Icon name={icon} />
            </span>
          )}
        </div>
        {feedback && <span className="invalid-feedback">{feedback}</span>}
      </React.Fragment>
    );
  
    return label ? <FormGroup label={label}>{contents}</FormGroup> : contents;
  }
}
FormInput.displayName = "Form.Input";

/** @component */
export default FormInput;
