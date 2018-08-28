import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import {
//   Row,
//   Col,
//   Button,
//   Card,
//   CardHeader,
//   CardFooter,
//   CardBody,
//   Form,
//   FormGroup,
//   FormText,
//   Label,
//   Input,
//   InputGroup,
//   InputGroupAddon,
//   InputGroupButton
// } from 'reactstrap';

import * as H from '../../helpers';

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForm: {},
      validForm: {},
    };

    this._validForm = {};
    this._cControl={};
  }

  getData=()=>{
    const {config} = this.props;
    let _valueForm = {};
    let _isValid = true;
    let _validForm = {};
    if(config && config.data){
      let _ui =[];
      for(let i in config.data){
        let _item = config.data[i];
        if(_item && _item.name){
          let _f = _item.name;
          let _c = this._cControl[_f];
          if(_c && _c.getValue){
            let _v = _c.getValue();
            _valueForm[_f] = _v;
            let _valid = this._checkValid({item:_item,value:_v});
            _validForm[_f] = _valid;
            if(_valid==false){ _isValid=false}
          }
          else{
            let _valid =this._checkValid({item:_item,value:null});
            _validForm[_f] = _valid;
            if(_valid==false){ _isValid=false}
          }
        }
      }
    }
    this._validForm = _validForm;
    if(_isValid==false){
      this.forceUpdate();
    }
    return {
      values: _valueForm,
      valids: _validForm,
      isValid: _isValid
    };
  }
  _checkValid=({item,value})=>{
    if(item.required==true && (value==null || value=="")){
      return false;
    }
    return true;
  }

  _renderItem=({item,value,key})=>{
    let disabled = this.props.disabled;
    if(item.type=="text"){
      // console.log('_renderItem:',item,this._validForm);
      return <H.MForm.Input 
        ref={(r)=>{this._cControl[item.name]=r;}} 
        key={key} name={item.name} 
        label={item.label}
        // onChange={(ev)=>{console.log('onChange:',ev)}}
        defaultValue={value}
        disabled={disabled}  
        invalid={this._validForm&&this._validForm[item.name]==false?true:false}
        feedback={this._validForm&&this._validForm[item.name]==false&&item.msgInvalid?item.msgInvalid:null}
        placeholder={item.placeholder} />
    }
    else if(item.type=="textarea"){
      return <H.MForm.Textarea 
        ref={(r)=>{this._cControl[item.name]=r;}} 
        key={key} name={item.name} 
        label={item.label}
        defaultValue={value}
        disabled={disabled} 
        placeholder={item.placeholder} />
    }
  }

  _renderForm=()=>{
    const {config,values} = this.props;
    let _arrFieldName = [];
    let _values = values || {};
    if(config && config.data){
      let _ui =[];
      for(let i in config.data){
        let _item = config.data[i];
        if(_item && _item.name){
          _arrFieldName.push(_item.name);
          _ui.push(this._renderItem({
            item:_item,
            value: _values[_item.name]||"",
            key: i,
          }))
        }
      }
      this._arrFieldName = _arrFieldName;
      return _ui;
    }
  }

  render(){
    // const {form,header,onSubmit,data,onlyForm} = this.props;
    return (
      <H.MForm>
      {this._renderForm()}
      </H.MForm>
    )
  }
}
export default MyForm;
