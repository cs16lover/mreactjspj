import React, { Component } from 'react';
import {
  Row,Col,
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Button,
} from 'reactstrap';

import * as H from '../../helpers';

import ApiGeneric from '../../services/Api';
import CTable from './Table';
import ModalAddNew from './ModalAddNew';

class Page extends Component {
  constructor(props) {
    super(props);
    const {match} = props;
    this.state = { 
      options: {},
      error: null,
      data: {},
    };
    console.log('constructor Detail:',this.props,match);
    this._config = this.props.config||{};
    
    this._headerConfig = this._config.Header || {
      show: true,
      showAddNew: true,
    };
    this._tableConfig = this._config.Table || {};
    this._filterConfig = this._config.Filter||{
      require4ShowData: false,
      show: true,
      listInList: [],
      data: []
    };
    this._pageConfig = this._config.Page||{};
    this._addNewConfig = this._config.AddNew ||{};
    console.log('this._pageConfig:',this._pageConfig);
    console.log('this._headerConfig:',this._headerConfig);
    console.log('this._tableConfig:',this._tableConfig);
    console.log('this._filterConfig:',this._filterConfig);
    console.log('this._pageConfig:',this._pageConfig);
    console.log('this._addNewConfig:',this._addNewConfig);

    // this._isGetOptions = this.props.isGetOptions==false?false:true;
    // this._isShowAddNew = this.props.isShowAddNew==false?false:true;
    // this._isShowHeader = this.props.isShowHeader==false?false:true;
    
    // this._pageConfig = this.props.pageConfig;
    // this._isWithProjectId = this.props.isWithProjectId==true?true:false;
    // if(this._pageConfig){
    //   this._isWithProjectId = this._pageConfig.isWithProjectId || false;
    // }
    // this._addNewConfig = this.props.addNewConfig;
    // this._listInList = this.props.listInList||this._filterConfig.listInList||[];

    this._title = this._pageConfig.title||'Category';
    this._screenCode = this._pageConfig.screenCode||'CATEGORY';
    if(this._screenCode=="CATEGORY"){
      console.warn("Page not set screenCode");
    }
    this._apiPath = this._pageConfig.apiPath;

    if(match && match.params!=null && match.params.id!=null){
      this._ID = match.params.id;
      console.log('this._ID:',this._ID);
    }
  }

  componentDidMount(){
    H.PageHelper.componentDidMount(this._title,this._onRequestOptions);
  }
  _parseConfigFromOptions=({options})=>{
    if(options && options.Configs && options.Configs.ScreenConfig){
      try {
        let _config = JSON.parse(options.Configs.ScreenConfig);
        if(_config){
          if(_config.Filter){
            this._filterConfig = Object.assign(this._filterConfig,_config.Filter);
          }
          if(_config.Header){
            this._headerConfig = Object.assign(this._headerConfig,_config.Header);
          }
          if(_config.Table){
            this._tableConfig = Object.assign(this._tableConfig,_config.Table);
          }
          if(_config.Page){
            this._pageConfig = Object.assign(this._pageConfig,_config.Page);
          }
          if(_config.AddNew){
            this._addNewConfig = Object.assign(this._addNewConfig,_config.AddNew);
          }
        }
        console.log('_config:',_config);
      } catch (error) {
        console.warn('Cant parse options config:',error);
      }
    }
  }
  _onRequestOptions=()=>{
    let _data = {};
    ApiGeneric.generic({
      request:{
        method: 'POST',
        path: this._apiPath,
        name: ApiGeneric.NAME.Options
      },
      data:_data,
      successCallBack:(response)=>{
        let _options = response.Data;
        this._parseConfigFromOptions({options:_options});
        this.setState({options:_options,error:null,});
        if(this._cModalAddNew!=null){
          this._cModalAddNew.loadWithOptions(_options);
        }
        this._onRequestGetDetail();
      },
      errorCallBack:(error,response)=>{
        H.Global.LoadingScreen.showError(response!=null?response.Msg:'Lỗi lấy Options!',()=>{
          H.Global.LoadingScreen.show();
          this._onRequestOptions();
        })
        this.setState({error:error!=null?error:response});
      }
    })
  }

  _onRequestGetDetail=()=>{
    ApiGeneric.generic({
      request:{
        method: 'GET',
        path: this._apiPath,
        name: `Detail/${this._ID}`
      },
      data:{},
      successCallBack:(response)=>{
        this.setState({
          data: response.Data
        })
      },
      errorCallBack:(error,response)=>{
        H.Global.LoadingScreen.showError(response!=null?response.Msg:'Lỗi lấy Detail!',()=>{
          H.Global.LoadingScreen.show();
          this._onRequestGetDetail();
        })
        this.setState({error:error!=null?error:response});
      }
    })
  }

  render() {
    return (
      <div className="animated">
        <Card>
          <CardHeader>Detail</CardHeader>
          <CardBody style={{backgroundColor:H.Constant.Color.bgForm}}>
            <H.MyForm ref={(r)=>{this._cMyForm=r;}} config={this._addNewConfig} values={this.state.data} disabled={false}/>
          </CardBody>
          <CardFooter>
            
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default Page;
