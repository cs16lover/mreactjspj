'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

class Switch extends Component {
  constructor(props) {
    super(props);

    var checked = false;
    if ('checked' in props) {
      checked = !!props.checked;
    } else {
      checked = !!props.defaultChecked;
    }

    this.state = {
      checked: checked
    };
  }

  componentWillReceiveProps=(nextProps)=> {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }
  toggle=()=>{
    var checked = !this.state.checked;
    if (!('checked' in this.props)) {
      this.setState({
        checked: checked
      });
    }
    this.props.onChange(checked);
  }
  render() {
    var _classNames;

    var _props = this.props;
    var className = _props.className;
    var prefixCls = _props.prefixCls;
    var disabled = _props.disabled;
    var style = _props.style;
    var checkedChildren = _props.checkedChildren;
    var unCheckedChildren = _props.unCheckedChildren;

    var checked = this.state.checked;
    var switchClassName = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-checked', checked), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _classNames));
    return React.createElement(
      'span',
      { className: switchClassName,
        onClick: disabled ? noop : this.toggle,
        style: style },
      React.createElement(
        'span',
        { className: prefixCls + '-inner' },
        checked ? checkedChildren : unCheckedChildren
      )
    );
  }
};

Switch.displayName = 'MSwitch';
Switch.propTypes = {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  checkedChildren: PropTypes.any,
  unCheckedChildren: PropTypes.any,
  onChange: PropTypes.func
};
Switch.defaultProps = {
  prefixCls: 'm-switch',
  style: {},
  checkedChildren: null,
  unCheckedChildren: null,
  className: '',
  defaultChecked: false,
  onChange: noop
};

module.exports = Switch;