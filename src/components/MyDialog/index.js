import React, { Component } from 'react';
import {
  Alert,Badge,Row,Col,Progress,
  Button,ButtonToolbar,ButtonGroup,ButtonDropdown,
  Table,Form,FormGroup,FormText,Label,Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import LaddaButton, { EXPAND_LEFT, EXPAND_RIGHT,} from 'react-ladda';
import 'ladda/dist/ladda-themeless.min.css';

import * as H from '../../helpers';

class MyDialog extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      isShow: false,
      options: [],
      error: null,
      title: '',
      msg: '',
      icon: 'info',
    };
  }

  componentDidMount(){
      MyDialog.Helper.component = this;
  }

  show=({title,msg,icon,onOK}={})=>{
    let _title = title || 'Notice';
    let _msg = msg || '[No Msg]';
    let _icon = icon || 'info';
    
    this._onOK = onOK || function(){};
    this.setState({
      isShow:true,
      title: _title,
      msg: _msg,
      icon: _icon,
    })
  }
  hide=()=>{
    this.setState({
      isShow:false
    })
  }

  _onClickOK=()=>{
    if(this._onOK){
      this._onOK();
    }
  }

  render() {
    return (
      <Modal 
        fade={true} 
        modalTransition={{ timeout: 100 }} 
        backdropTransition={{ timeout: 0 }}
        // className="modal-lg" 
        isOpen={this.state.isShow} 
        toggle={()=>{this.setState({isShow:!this.state.isShow})}} backdrop="static">
        <ModalHeader toggle={()=>{this.setState({isShow:!this.state.isShow})}}>
            <div>
              <i style={{fontSize:'20px',marginRight:'10px',color: MyDialog.Color[this.state.icon]}} className={`fa fa-${MyDialog.Icon[this.state.icon]}`}/>
              {this.state.title}
            </div>
        </ModalHeader>
        <ModalBody style={{backgroundColor:'#f5f6f7'}}>
            {this.state.msg}
        </ModalBody>
        <ModalFooter>
          <LaddaButton
            className="btn btn-success btn-ladda"
            loading={this.state.isSaving}
            onClick={this._onClickOK}
            data-color="green"
            data-style={EXPAND_RIGHT}
          >
            OK
          </LaddaButton>
          {/* <Button color="primary" onClick={this._onClickOK}>Đồng ý</Button>{' '} */}
          <Button color="secondary" onClick={()=>{this.setState({isShow:!this.state.isShow})}}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

MyDialog.Icon = {
  info: 'info-circle',
  warning: 'exclamation-circle',
  danger: 'times-circle',
  success: 'check-circle',
  question: 'question-circle',
}
MyDialog.Color = {
  info: '#45a8e6',
  warning: 'black',
  danger: '#F04631',
  success: '#66bc5c',
  question: '#45a8e6',
}
MyDialog.Helper = {
  component: null,
  show(obj){
    if(MyDialog.Helper.component){
        MyDialog.Helper.component.show(obj);
    }
  },
}

export default MyDialog;
