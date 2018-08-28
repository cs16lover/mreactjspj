import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cn from "classnames";
import FormGroup from "./FormGroup";

// import type {
//   FocusEvents,
//   FormEvents,
//   MouseEvents,
//   PointerEvents,
// } from "../../";

// type Props = {|
//   ...FocusEvents,
//   ...FormEvents,
//   ...MouseEvents,
//   ...PointerEvents,
//   +className?: string,
//   +valid?: boolean,
//   +tick?: boolean,
//   +invalid?: boolean,
//   +cross?: boolean,
//   +feedback?: string,
//   +error?: string,
//   +placeholder?: string,
//   +name?: string,
//   +value?: string | number,
//   +defaultValue?: string | number,
//   +disabled?: boolean,
//   +rows?: number,
//   +children?: string,
//   +label?: string,
// |};

class FormTextarea extends Component {
  constructor(props) {
    super(props);
    console.log('FormTextarea constructor:',props);
    this.state = {
      defaultValue: this.props.defaultValue||"",
      value: this.props.defaultValue||"",
    };
  }
  componentWillReceiveProps(nextProps) {
    const me = this;
    console.log('FormTextarea componentWillReceiveProps:',this.props,nextProps);
    if (nextProps.defaultValue!=this.state.defaultValue) {
      me.setState({
        defaultValue: nextProps.defaultValue,
        value: this.props.defaultValue||"",
      });
    }
  }
  getValue=()=>{
    let _e = ReactDOM.findDOMNode(this).getElementsByTagName("textarea");
    // console.log('getValue:',_e,_e[0]);
    if(_e && _e.length>0){
      return _e[0].value;
    }
  }
  render() {
    console.log('FormTextarea render:',this.props);
    const { className,
      name,
      valid,
      tick,
      invalid,
      cross,
      error,
      placeholder,
      defaultValue,
      value,
      disabled,
      rows,
      children,
      onChange,
      onBlur,
      onFocus,
      onClick,
      onMouseEnter,
      onMouseLeave,
      // onPointerEnter,
      // onPointerLeave,
      label, } = this.props;

    const classes = cn(
      "form-control",
      {
        "is-valid": valid,
        "state-valid": tick,
        "is-invalid": invalid || !!error,
        "state-invalid": cross || !!error,
      },
      className
    );
    const feedback = error || this.props.feedback;

    const contents = (
      <React.Fragment>
        <textarea
          className={classes}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value || children}
          disabled={disabled}
          rows={rows}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          onFocus={onFocus}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          // onPointerEnter={onPointerEnter}
          // onPointerLeave={onPointerLeave}
        />
        {feedback && <span className="invalid-feedback">{feedback}</span>}
      </React.Fragment>
    );

    return label ? <FormGroup label={label}>{contents}</FormGroup> : contents;
  }
}
FormTextarea.displayName = "Form.Textarea";

/** @component */
export default FormTextarea;
