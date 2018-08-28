import React, { Component } from 'react';
import {
  Badge,
  Row,Col,
  Progress,
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Button,ButtonToolbar,ButtonGroup,ButtonDropdown,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.css';
import {MTooltip,MPopover} from '../../mreact';
import RCDialog from '../../mreact/helper/RCDialog';
import MyDialog from '../MyDialog';
class BtnToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isActive: this.props.active!=null?this.props.active:false,
    };
  }
  getActive=()=>{
    return this.state.isActive;
  }
  _onClick=()=>{
    console.log('onClick');
    if(this.props.onClick){
      this.props.onClick();
    }
  }
  render(){
    return <button className={cn("mtb-tb-btn",this.props.className)} onClick={this._onClick}>{this.props.children}</button>
  }
}
class SearchToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }
  _onChange=(e)=>{
    // console.log('_onChange:',e);
    let _value = e.currentTarget.value;
    if(_value==""){
      if(this.props.onSearch){
        this.props.onSearch(_value);
      }
    }
  }
  _handleKeyPress=(e)=>{
    if (e.key === 'Enter') {
      console.log('do validate:',e);
      e.preventDefault();
      let _value = e.currentTarget.value;
      console.log('_value:',_value);
      if(this.props.onSearch){
        this.props.onSearch(_value);
      }
    }
  }
  render(){
    return (
      <div className={cn("mtb-tb-s",this.props.className)}>
        <button className="mtb-tb-s-btn"><i className="fa fa-search"/></button>
        <input onChange={this._onChange} onKeyPress={this._handleKeyPress} type="text" placeholder="Search..."></input>
        {/* <button className="mtb-tb-s-btnclear"></button> */}
      </div>
    )
  }
}

class C extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isShowFilter: false,
      visibleDialog: false,
    };
  }

  componentDidMount(){

  }

  _renderFilter=()=>{
    let _style = {
      display: 'block'
    }
    if(this.state.isShowFilter==false){ _style.display='none'};
    return (
      <CardBody style={_style}>
        Filter
      </CardBody>
    )
  }
  render() {
    return (
      <Card className="mtb-tb">
        <CardHeader>
          <div>
            {/* <MTooltip placement="top" overlay={"Print"}>
              <Button>Tooltip</Button>
            </MTooltip> */}
            {/* <MPopover trigger="click" showButton={false} placement="top" overlay={"Print"}>
              <Button>Popover</Button>
            </MPopover>
            <Button onClick={()=>{
              // this.setState({visibleDialog:true})
              MyDialog.Helper.show({msg: "Are you want to delete?"});
            }}>Diablog</Button> */}
            <BtnToolbar><i className="fa fa-refresh"/></BtnToolbar>
            <BtnToolbar active={this.state.isShowFilter} onClick={()=>{
              this.setState({isShowFilter:!this.state.isShowFilter})
            }}><i className="fa fa-filter"/></BtnToolbar>
            <BtnToolbar><i className="fa fa-table"/></BtnToolbar>
            <MTooltip placement="top" overlay={"Print"}>
              <BtnToolbar><i className="fa fa-print"/></BtnToolbar>
            </MTooltip>
            <MTooltip trigger="click" placement="top" overlay={"Export CSV"}>
              <BtnToolbar><i className="fa fa-download"/></BtnToolbar>
            </MTooltip>
            <div className="mtb-tb-break"></div>
            <SearchToolbar {...this.props}/>
          </div>
          <div className="mtb-tb-rh">
            <Button onClick={()=>{
              if(this.props.onAddNew){
                this.props.onAddNew();
              }
            }} color="primary" className="btn-addnew"><i className="fa fa-plus"/> Add New</Button>
          </div>
        </CardHeader>
        { this._renderFilter() }
        {/* <RCDialog title={"Title"} onClose={()=>{}} visible>
            <p>first dialog</p>
        </RCDialog> */}
      </Card>
    )
  }
}

export default C;