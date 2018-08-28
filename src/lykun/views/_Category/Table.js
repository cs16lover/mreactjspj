import React, { Component } from 'react';
import {
  Row,Col,
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Button,
} from 'reactstrap';

import * as H from '../../helpers';
import ApiGeneric from '../../services/Api';

class CTable extends Component {
  constructor(props) {
    super(props);

    this.state={
      data: [],
      extraData: null,
      cols:[],
      error: null,
      isLoading: true,
      listHideCols: [],
      listRemoveCols: [],
    };

    this._query = {};
    this._customQuery = {};

    this.actionFormater = (cell,row)=>{
      const onDeleteRow = this._onRequestDelete;
      return (
        <div>
          <Button color="success" 
          outline 
          onClick={(ev)=>{
            let _detailPath = this.props.detailPath;
            if(_detailPath){
              _detailPath = H.M.SquareBracket.replace(_detailPath,row);
              H.G.goToPath({path:_detailPath})
            }
          }}><i className="fa fa-search-plus"/></Button>
          <Button color="info" 
          outline 
          onKeyPress={(ev)=>{
            if(ev.key === 'Enter'){
              onDeleteRow(row);
            }
          }}><i className="fa fa-edit"/></Button>
          <Button color="danger" 
          outline 
          onClick={(ev)=>{
            H.MyDialog.Helper.show({
              msg:"Are you sure you want to delete?",
              icon: 'danger',
              onOK:()=>{
                console.log("OK");
                this._onRequestDelete(row);
            }})
          }}><i className="fa fa-trash"/></Button>
            {/* <H.Popover placement="topRight" title={'Xóa'}
              overlay={<div>Bạn có chắc muốn xóa?</div>} trigger="click" showButton okText="Đồng ý" cancelText="Đóng" 
              onOk={()=>{onDeleteRow(row)}} onCancel={()=>{console.log('Cancel')}}>
              <Button color="danger" outline style={{border:'0px',width:'100%'}} onKeyPress={(ev)=>{
                  if(ev.key === 'Enter'){
                    onDeleteRow(row);
                  }
                }}><i className="fa fa-trash"/></Button>
            </H.Popover> */}
        </div>
      );
    }

  }

  componentDidMount(){
  }

  _getTableConfig=(parram,defaultValue)=>{
    const {tableConfig} = this.props
    console.log('_getTableConfig:',tableConfig);
    if(tableConfig && tableConfig[parram]!=null){
      return tableConfig[parram];
    }
    return defaultValue;
  }

  _mixExtraData=({exLocal,exSever})=>{
    console.log('_mixExtraData:',exLocal,exSever);
    if(exLocal && exLocal.Columns){
      let _keys = Object.keys(exLocal.Columns);
      let _colLocal = exLocal.Columns;
      let _colSever = exSever.Columns;
      if(_keys.length>0){
        for(let _k of _keys){
          if(_colLocal && _colSever && _colLocal[_k] && _colSever[_k]){
            console.log('_mixExtraData ce:',_k,_colSever[_k].CanEdit);
            if(_colSever[_k].CanEdit!=null){
              _colLocal[_k].CanEdit = _colSever[_k].CanEdit;
            }
          }
        }
      }
    }
    return exLocal;
  }

  _buildCols=({extraData})=>{
    let _cols = [];
    _cols = H.TableHelper.buildCols({
      component: this,
      extraData,
      fieldId: 'Id',
      sourceList: this.options,
      fnList: this._getTableConfig('fnList',{}),
      options: {
        canDelete: this._getTableConfig('canDelete',true),
        customProps: this._getTableConfig('customProps',{}),
        // {
          // ProjectName:{
          //   width:'100px', dataSort: true, dataField:'ProjectName', header: 'Project Name',
          //   dataFormat: this.projectFormater,
          // },
          // _Uncover:{
          //   width:'30px', dataSort: true, dataField:'_Uncover', header: 'Uncover Needs',
          //   dataFormat: this.uncoverFormater,
          // }
        // },
        addExtraColumns: this._getTableConfig('addExtraColumns',{}),
        customAction: this._getTableConfig('canDelete',true)?{
          width:'100px', dataSort: false, dataField:'_ActionDelete', header: '',
          dataFormat: this.actionFormater,
          columnClassName: 'no-print-col mtb-col-action',
        }:null,
      },
      fnRequestUpdate: this._onRequestUpdate,
      fnRequestDelete: this._onRequestDelete,
    })
    return _cols;
  }

  loadWithOptions(options){
    this.options = options;
    this._onRequestList();
  }
  reload(){
    this._onRequestList();
  }
  handleSearch=(text)=>{
    console.log('handleSearch:',text);
    if(this._cTable!=null){
      this._cTable.handleSearch(text);
    }
  }
  handleFilterData=(obj)=>{
    const {filterConfig,onAfterFilter}  = this.props;
    console.log('handleFilterData:',obj,filterConfig);
    if(filterConfig){
      if(filterConfig.customQueryFromSever){
        this._customQuery = filterConfig.customQueryFromSever({
          obj: obj
        });
        if(Object.keys(this._customQuery).length>0){
          return this._onRequestList();
        }
      }
    }
    if(this._cTable!=null){
      this._cTable.handleFilterData(obj);
      if (onAfterFilter != null) {
        let _data = this._cTable.getTableDataIgnorePaging();
        // console.log('handleFilterData after filter _data:', _data);
        onAfterFilter({ filter: obj, data: _data });
      }
    }
  }
  handleHideCol=(listCols,opts)=>{
    if(listCols!=null){
      if(opts && opts.isRemove==true){
        this.setState({listRemoveCols:listCols});
      }
      else{
        this.setState({listHideCols:listCols});
      }
    }
  }

  _onRequestUpdate=(row, cellName, cellValue)=>{
    const {onAfterUpdateField}=this.props;
    ApiGeneric.generic({
      request:{
        method: 'POST',
        path: this.props.apiPath,
        name: ApiGeneric.NAME.UpdateFields
      },
      data:{
        ProjectId: row.ProjectId,
        Id: row.Id,
        Values:[{
          FieldName: cellName,
          NewValue: cellValue,
        }]
      },
      successCallBack:(response)=>{
        if(response.Data!=null && response.Data.Id==row.Id){
          let _data = this.state.data;
          // console.log('_data:',_data);
          for(let i=0;i<_data.length;i++){
            if(_data[i].Id == response.Data.Id){
              // _data[i] = response.Data;//Update new
              // Update attr of obj
              for(let _key of Object.keys(_data[i])){
                _data[i][_key] = response.Data[_key];
              }
              break;
            }
          }

          if(onAfterUpdateField){
            onAfterUpdateField({data:_data})
          }
        }

        let _msg = response.Msg || 'Lưu thành công!';
        H.UI.Toast.showSuccess(_msg);
        // H.Global.TableHelper.Updating.remove(row,cellName);
        
        this.forceUpdate();
        // if(['Source','Building','Area','Address'].indexOf(cellName)>-1){
        //   this.reload();
        // }
        // else{
        //   this.forceUpdate();
        // }
      },
      errorCallBack:(error,response)=>{}
    })
  }

  _onRequestDelete=(row)=>{
    let _isDeleteWithData = this._getTableConfig("deleteWithData",false);
    let _pathName = `${ApiGeneric.NAME.Delete}/${row.Id}`;
    let _query = {
      Id: row.Id,
    }
    if(_isDeleteWithData==true){
      _pathName = ApiGeneric.NAME.Delete;
      _query.projectId = this.props.projectId;
    }
    ApiGeneric.generic({
      request:{
        method: 'POST',
        path: this.props.apiPath,
        name: _pathName
      },
      data: _query,
      successCallBack:(response)=>{
        let _msg = response.Msg || 'Xóa thành công!';
        H.UI.Toast.showSuccess(_msg);
        let _data = this.state.data;

        if(_data!=null){
          for(let i=0;i<_data.length;i++){
            if(_data[i].Id==row.Id){
              _data.splice(i,1);
              break;
            }
          }
        }
        this.setState({
          data: _data,
        })
      },
      errorCallBack:(error,response)=>{
      }
    });
  }

  _onRequestList=()=>{
    const {onLoadListFinish}=this.props;
    this._query = {};
    if(this.props.projectId){
      this._query = {
        ProjectId: this.props.projectId
      };
    }
    let _query = Object.assign(this._query,this._customQuery)||{};
    ApiGeneric.generic({
      request:{
        method: 'POST',
        path: this.props.apiPath,
        name: ApiGeneric.NAME.List
      },
      data: _query,
      successCallBack:(response)=>{
        let _extraData = this._getTableConfig('extraData',response.Data.ExtraData);
        _extraData = this._mixExtraData({exLocal:_extraData,exSever:response.Data.ExtraData});
        console.log('_extraData 2:',_extraData,response);
        let _cols = this._buildCols({extraData: _extraData});
        let _data = response.Data.Data;
        this.setState({
          data: _data,
          extraData: _extraData,
          cols: _cols,
          error:null,isLoading:false
        },()=>{
        });
        if(onLoadListFinish!=null){
          console.log('onLoadListFinish call:',response.Data.ExtraData);
          onLoadListFinish(response.Data.Data,null,response);
        }
      },
      errorCallBack:(error,response)=>{
        console.log('errorCallBack:',error,response);
        this.setState({
          error:error!=null?error:response,isLoading:false
        });
        if(onLoadListFinish!=null){onLoadListFinish(response.Data.Data,error,response);}
      }
    });
  }

  render() {
    let _className = this._getTableConfig("showHeader",true) ? "": "s_table_hideheader";
    let _tableProps = this._getTableConfig("tableProps",{});
    _tableProps = Object.assign(_tableProps,{striped:true,hover:true});
    return (
      <H.MyTable 
        ref={r=>{this._cTable=r;}}  
        cols={this.state.cols}
        data={this.state.data}
        colsHidden={this.state.listHideCols}
        colsRemove={this.state.listRemoveCols}
        optionsTable={{
        }}
        tableProps={_tableProps}
        className={_className}
      />
    )
  }
}

export default CTable;