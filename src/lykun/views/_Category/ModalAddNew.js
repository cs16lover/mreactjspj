import React, { Component } from 'react';
import {
  Alert,Badge,Row,Col,Progress,
  Button,ButtonToolbar,ButtonGroup,ButtonDropdown,
  Table,Form,FormGroup,FormText,Label,Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import LaddaButton, { EXPAND_LEFT, EXPAND_RIGHT,} from 'react-ladda';
import 'ladda/dist/ladda-themeless.min.css';

import * as H from '../../helpers';

class ModalAddNew extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      isShow: false,
      isLoading: false,
      isSaving: false,
      isShowAlert: false,
      msgAlert: '',
      options: [],
      error: null,
    };
    this._cInput={};
    console.log('ModalAddNew constructor: ',props);
  }

  componentDidMount(){
  }

  loadWithOptions(options){
    if(options!=null){
      this.setState({
        options: options,
        error:null,
        isLoading:false
      });
    }
  }

  show(){
    this.setState({
      isShow:true,
    })
  }

  _onDismissAlert=()=>{
    this.setState({ isShowAlert: false, msgAlert: '' });
  }

  _showAlert=(msg)=>{
    this.setState({ isShowAlert: true, msgAlert: msg });
  }

  _checkValid=()=>{
    let _isValid = false;
    if(this.state.currentSelectedTask!=null){
      if(this.state.selectedStaff!=null && this.state.selectedStaff.value!=null){
        _isValid=true;
      }
    }
    return _isValid;
  }

  _onClickOK=()=>{
    const {onRequestAddNew,addNewConfig} = this.props;
    if(this._cMyForm){
      let _data = this._cMyForm.getData();
      console.log('_onClickOK:',_data);
      if(_data && _data.isValid==true && _data.values){
        if(onRequestAddNew){
          onRequestAddNew(_data.values,()=>{
            this.setState({isShow: false});
          });
        }
      }
    }
  }

  render() {
    return (
      <Modal fade={false} className="modal-lg" isOpen={this.state.isShow} toggle={()=>{this.setState({isShow:!this.state.isShow})}} backdrop="static">
        <ModalHeader toggle={()=>{this.setState({isShow:!this.state.isShow})}}>{
          "Add New"
        }</ModalHeader>
        <ModalBody style={{backgroundColor:'#f5f6f7'}}>
          <H.MyForm ref={(r)=>{this._cMyForm=r;}} config={this.props.addNewConfig}/>
        </ModalBody>
        <ModalFooter>
          <LaddaButton
            className="btn btn-success btn-ladda"
            loading={this.state.isSaving}
            onClick={this._onClickOK}
            data-color="green"
            data-style={EXPAND_RIGHT}
          >
            Save
          </LaddaButton>
          {/* <Button color="primary" onClick={this._onClickOK}>Đồng ý</Button>{' '} */}
          <Button color="secondary" onClick={()=>{this.setState({isShow:!this.state.isShow})}}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalAddNew;
