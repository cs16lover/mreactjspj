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
      isAddNew: false,
      options: {},
      error: null,
    };
    console.log('constructor Category:',this.props,match);
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

    if(this._pageConfig.isWithProjectId==true){
      if(match && match.params!=null && match.params.projectId!=null){
        this._projectId = match.params.projectId;
        console.log('this._projectId:',this._projectId);
      }
    }

    //test
    // this._apiPath = "Department";
    // this._addNewConfig = {
    //   data:[
    //     // { name: 'FirstName', label: 'First Name', type: 'text', optionKey: '', },
    //     // { name: 'DepartmentId', label: 'Department', type: 'select2', optionKey: 'DepartmentList', },
    //     // { name: 'HRGroupId', label: 'Group', type: 'select2', optionKey: 'HRGroupList', },
    //     // { name: 'HRPositionId', label: 'Position', type: 'select2', optionKey: 'HRPositionList', },
    //     // { name: 'IsPM', label: 'PM', type: 'checkbox', default: false, },
    //     { name: 'Name', label: 'Name', type: 'text', required: true, msgInvalid: 'Required Name', },
    //     { name: 'NotifyEmails', label: 'Notify Emails', type: 'text', required: true, msgInvalid: 'Required Name', },
    //     { name: 'Description', label: 'Description', type: 'textarea', },
    //   ]
    // }
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
    if(this._pageConfig.isGetOptions===false){
      let _options = {};
      this.setState({options:_options,error:null,});
      if(this._cTable!=null){
        this._cTable.loadWithOptions(_options);
      }
      if(this._cModalAddNew!=null){
        this._cModalAddNew.loadWithOptions(_options);
      }
      return;
    }
    let _data = {};
    if(this._pageConfig.isWithProjectId==true && this._projectId){
      _data.ProjectId = this._projectId;
    }
    ApiGeneric.generic({
      request:{
        method: 'POST',
        path: this._apiPath,
        name: ApiGeneric.NAME.Options
      },
      data:{},
      successCallBack:(response)=>{
        let _options = response.Data;
        this._parseConfigFromOptions({options:_options});
        this.setState({options:_options,error:null,});
        if(this._cTable!=null){
          this._cTable.loadWithOptions(_options);
        }
        if(this._cModalAddNew!=null){
          this._cModalAddNew.loadWithOptions(_options);
        }
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

  _onRequestAddNew=(data,cb)=>{
    let _query = {};
    if(this._pageConfig.isWithProjectId && this._projectId){
      _query.ProjectId = this._projectId;
    }
    if(data){
      _query = Object.assign(_query,data);
    }
    ApiGeneric.generic({
      request:{
        method: 'POST',
        path: this._apiPath,
        name: ApiGeneric.NAME.Add
      },
      data: _query,
      successCallBack:(response)=>{
        if(this._cTable!=null){
          this._cTable.reload();
        }
        if(cb!=null){
          cb({success:true});
        }
      },
      errorCallBack:(error,response)=>{
        if(cb!=null){
          cb({success:false});
        }
      }
    })
  }

  _renderHeader=()=>{
    let _headerConfig = this._headerConfig;
    
    if(_headerConfig && _headerConfig.show==true){
      let _title = this._title;
      let _lefComponent = (<div style={{display:'flex',alignItems:'center',justifyContent:'center',color:'#7d7d7d',width:'30px'}}><i className="fa fa-database"/></div>);
      let _rightComponent = (<div></div>);

      if(_headerConfig.showProjectMenu==true && this._projectId){
        _lefComponent = H.ProjectMenu.Helper.buildLeftComponent(this._projectId);
      }
      if(_headerConfig.showAddNew){
        _rightComponent = (
          <div>
            <Button disabled={this.state.isAddNew} 
              style={{marginRight:'5px'}} color="primary" 
              onClick={()=>{
                if(this._addNewConfig!=null && this._addNewConfig.data!=null){
                  if(this._cModalAddNew!=null){
                    this._cModalAddNew.show();
                  }
                }
                else{
                  this._onRequestAddNew();
                }
              }}
              >{this.state.isAddNew==true&&<i className="fa fa-spinner fa-spin"/>} Tạo mới</Button>
            </div>
        );
      }
      return (
        <div>
          {
            this._headerConfig.showProjectHeader && this._projectId &&
            <H.ProjectHeader projectId={this._projectId} screenCode={this._screenCode} />
          }
          <H.PageHeader title={_title} 
            leftComponent={_lefComponent}
            rightComponent={_rightComponent}/>
        </div>
      )
    }
  }

  _updateFilterConfigWithExtraDataColumn=(extraData)=>{
    let _dataFilter = this._filterConfig.data||[];
    let _listInList = this._filterConfig.listInList||[];
    if(extraData && extraData.Columns){
      let _fields = Object.keys(extraData.Columns);
      for(let _k of _fields){
        let _col = extraData.Columns[_k];
        // console.log('col in filter:',_col,_k);
        if(_col && _col.Filter && _col.Filter.type){
          let _needConvert = true;
          if(_col.Filter.optionKey && _col.Filter.optionKey.indexOf('_InList')>-1){
            _needConvert = false;
            _listInList.push(_col.Filter.optionKey.replace('_InList',''));
          }
          _dataFilter.push({
            type: _col.Filter.type,
            title: _col.Filter.title || _col.Header || _k,
            optionKey: _col.Filter.optionKey,
            fieldName: _k,
            needConvert: _needConvert
          })
          
        }
      }
    }
    this._filterConfig.data=_dataFilter;
    this._filterConfig.listInList =_listInList;
    console.log('_updateFilterConfigWithExtraDataColumn:',extraData,this._filterConfig);
  }

  render() {
    return (
      <div className="animated">
        {/* <Card style={{marginBottom: '2px',}}>
          <CardHeader>Toolbar</CardHeader>
          <CardBody>
            <H.MForm>
              <H.MForm.Input name='username' label='Username' placeholder='Enter Username' />
              <H.MForm.Input name='username' label='Username' placeholder='Enter Username' />
              <H.MForm.Checkbox name='a' label='b' isInline /><H.MForm.Checkbox name='b' label='c' />
              <H.MForm.Textarea name='a' label='b' />
              <Button type='submit' value='Submit' />
            </H.MForm>
          </CardBody>
        </Card> */}

        <H.MyTableToolbar 
          onSearch={(obj)=>{
            console.log('onSearch:',obj);
            if(this._cTable!=null){this._cTable.handleSearch(obj)}
          }}
          onAddNew={()=>{
            console.log('Click Add new');
            if(this._cModalAddNew!=null){
              this._cModalAddNew.show();
            }
        }}/> 

        <CTable 
          ref={r=> {this._cTable=r;}}
          title={this._title}
          onAddNew={this._onClickAddNew}
          onLoadListFinish={(data,error,response)=>H.PageHelper.onLoadListFinish(data,error,response,(listData,error,response)=>{
            console.log('onLoadListFinish:',listData);
            if(response){
              if(response.Data && response.Data.ExtraData){
                this._updateFilterConfigWithExtraDataColumn(response.Data.ExtraData);
              }
            }
            let _options = this.state.options;
            if(this._filterConfig.listInList){
              _options = H.Global.OptionsHelper.UpdateOptionsInList(_options,this._filterConfig.listInList,listData);
            }
            if(this._cFilter!=null){
              if(this._isLoadedOptionsForFilter!=true){
                this._cFilter.loadWithOptions(_options);
                this._isLoadedOptionsForFilter = true;;
              }                
            }
            if(this._cBelowFilter!=null){
              this._cBelowFilter.loadWithOptions({options:_options,data:listData});
            }
          },this._cTable)}
          onAfterFilter={(res) => {
            if (this._cBelowFilter) this._cBelowFilter.loadWithOptions(res);
          }}
          onAfterUpdateField={(res)=>{
            if (this._cBelowFilter) this._cBelowFilter.loadWithOptions(res);
          }}
          screenCode={this._screenCode}
          apiPath={this._apiPath}
          detailPath={this._pageConfig.detailPath}
          tableConfig={this._tableConfig}
          filterConfig={this._filterConfig}
          projectId={this._projectId}
        />
        {
          // this._renderHeader()
        }
        {/* {
          this._filterConfig.show!==false &&
          <H.TableFilter 
            ref={r=> {this._cFilter=r;}}
            screenCode={this._screenCode}
            options={this.state.options}
            require4ShowData={this._filterConfig.require4ShowData}
            onChangeFilter={(filter)=>{
              if(this._cTable!=null){this._cTable.handleFilterData(filter)}
            }}
            onChangeSearch={(text)=>{
              if(this._cTable!=null){this._cTable.handleSearch(text)}
            }}
            onHideCol={(listFields,opts)=>{
              if(this._cTable!=null){this._cTable.handleHideCol(listFields,opts)}
            }}
            data={this._filterConfig.data}
          />
        } */}
        {/* {
          this._pageConfig && this._pageConfig.componentBelowFilter &&
          // this._pageConfig.componentBelowFilter({projectId: this._projectId})
          <this._pageConfig.componentBelowFilter ref={r=> {this._cBelowFilter=r;}} projectId={this._projectId}/>
        } */}
        
        <ModalAddNew 
          ref={(r)=>{this._cModalAddNew=r;}}
          options={this.state.options}
          onRequestAddNew={this._onRequestAddNew}
          onReloadList={()=>{
            if(this._cTable!=null){
              this._cTable.reload();
            }
          }}
          screenCode={this._screenCode}
          apiPath={this._apiPath}
          addNewConfig={this._addNewConfig}
        />
        {
          this._pageConfig && this._pageConfig.componentFooter &&
          <this._pageConfig.componentFooter ref={r=> {this._cFooter=r;}} projectId={this._projectId}/>
        } 
      </div>
    )
  }
}

export default Page;
