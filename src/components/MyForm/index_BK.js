import React, {Component} from 'react';
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from 'reactstrap';

import * as H from '../../index';

import {InputTextEditor} from './Input';
const FLabel = ({name,title}) => {
  return (
    <Label htmlFor={name}>{title}</Label>
  )
}

class FInput extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render(){
    const {placeholder,disabled,type,help,customGroup,} = this.props.input;
    const {ref,fieldName} = this.props.info;
    const {fnUpdateData,fnGetData} = this.props.fnList;

    let _id = 'id_'+fieldName;
    let _name = 'input_'+fieldName;
    let _value = fnGetData({fieldName})||"";
    let _placeHolder = placeholder;

    let _cInput;
    if(type=='readonly'){
      _cInput = (<div>{_value}</div>);
    }
    else if(type=='texteditor'){
      _cInput = <InputTextEditor {...this.props}/>
    }
    else{
      _cInput = (
        <Input ref={r=>{ref!=null&&ref(r,['_c'+name]);}} type={type} id={_id} name={_name} placeholder={_placeHolder} value={_value} disabled={disabled} onChange={(ev)=>{
          fnUpdateData({fieldName,value:ev.currentTarget.value});
          this.forceUpdate();
        }}/>
      )
    }
    
    let _cReturn = _cInput;
    if(help!=null){
      _cReturn = (
        <div>
        { _cInput }
        <FormText className="help-block">{help}</FormText>
        </div>
      )
    }
    if(customGroup!=null){
      _cReturn = customGroup(_cReturn);
    }

    return _cReturn;
  }
}

const FGroup = ({input,label,info,index,valid,fnList}) => {
  return (
    <FormGroup row key={index}>
      <Col md="3">
        { FLabel(label) }
      </Col>
      <Col xs="12" md="9">
        <FInput input={input} info={info} valid={valid} fnList={fnList}/>
      </Col>
    </FormGroup>
  )
}

class FForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForm: {},
    };
  }

  _updateData=({fieldName,value})=>{
    const {dataForm} = this.state;
    dataForm[fieldName] = value;
  }

  _getData=({fieldName})=>{
    const {data} = this.props;
    const {dataForm} = this.state;
    // console.log('getData:',fieldName,data,dataForm);
    if(dataForm[fieldName]!=null){
      return dataForm[fieldName];
    }
    else if(data!=null && data[fieldName]!=null){
      return data[fieldName];
    }
  }

  _renderGroup=()=>{
    const {form} = this.props;
    // console.log('_renderGroup:',form);
    let _ui = [];
    if(form!=null){
      for(let i=0;i<form.length;i++){
        let _item = form[i];
        _ui.push(
          FGroup({
            index: i,
            info: _item.info,
            input: _item.input,
            label: _item.label,
            valid: _item.valid,
            fnList: {
              fnUpdateData: this._updateData,
              fnGetData: this._getData
            }
          })
        )
      }
    }
    return _ui;
  }

  _checkValid=()=>{
    const {form,header,onSubmit,data} = this.props;
    console.log('_checkValid');
    // if(form!=null){
    //   for(let i=0;i<form.length;i++){
    //     let _item = form[i];//console.log('_checkValid item:',_item);
    //     let _valid = _item.valid;//console.log('_checkValid valid:',_valid);
        
    //     if(_valid!=null){
    //       let _dataInput = FData.getData(_item.info.key);
    //       let _valueInput = _dataInput[_item.input.name];
    //       let _msgFailed;

    //       let _regex = _valid.regex;//console.log('_checkValid regex:',_regex);
    //       let _msg = _valid.msg||`Giá trị ${_item.input.name} không phù hợp!`;
    //       if(_regex!=null){
    //         let _r = new RegExp(_regex);
    //         if(_r.test(_valueInput)==false){
    //           _msgFailed = _msg;
    //         }
    //       }
    //       else if(_valid.equal!=null){
    //         let _equal = _valid.equal(_valueInput);
    //         if(_equal==false){
    //           _msgFailed = _msg;
    //         }
    //       }

    //       if(_msgFailed!=null){
    //         H.Global.Toast.showWarn(_msgFailed);
    //         return false;
    //       }
    //     }
    //   }
    // }
    return true;
  }
  _onSubmit=()=>{
    const {form,header,onSubmit} = this.props;
    if(this._checkValid()==true){
      if(onSubmit!=null){
        onSubmit(this.state.dataForm);
      }
    }
  }

  render(){
    const {form,header,onSubmit,data,onlyForm} = this.props;
    // console.log('redner FForm:',data,this.state,form);
    let _form = (
      <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
        { this._renderGroup() }
      </Form>
    );
    if(onlyForm==true){
      return (
        <div>
          { _form }
          <div>
            <Button onClick={this._onSubmit} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Lưu</Button>
          </div>
        </div>
      );
    }
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-edit"></i><strong>{header}</strong>
        </CardHeader>
        <CardBody>
          { _form }
        </CardBody>
        <CardFooter className="frowright">
          <Button onClick={this._onSubmit} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Lưu</Button>
          {/* <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button> */}
        </CardFooter>
      </Card>
    )
  }
}

const MyForm = {
  FLabel,
  FInput,
  FGroup,
  FForm,
}
export default MyForm;
