import React, { Component } from 'react';
import {
  Button,
} from 'reactstrap';
// import M from '../M';
// import Global from '../Global';
// import App from './App';
import CellHelper from './CellHelper';

const TableHelper = {
  Updating:{
    list:{},
    reset(){
      this.list={};
    },
    add(row,fieldName,component){
      // console.log('Updating add:',row,fieldName,component,this.list);
      if(row.Id!=null){
        if(this.list[row.Id]==null){
          this.list[row.Id] = {};
        }
        this.list[row.Id][fieldName]=true;
        this.list[row.Id][fieldName + '_component']=component;
        if(component!=null){component.forceUpdate()}
      }
    },
    remove(row,fieldName){
      // console.log('Updating remove:',row,fieldName,this.list);
      if(row.Id!=null){
        if(this.list[row.Id]!=null){
          this.list[row.Id][fieldName]=false;
          if(this.list[row.Id][fieldName + '_component']!=null){
            this.list[row.Id][fieldName + '_component'].forceUpdate();
          }
          this.list[row.Id][fieldName + '_component']=null;
        }
      }
    },
    isUpdating(row,listFieldName){
      // console.log('Updating isUpdating:',row,listFieldName,this.list);
      if(row.Id!=null){
        if(this.list[row.Id]!=null){
          for(let i=0;i<listFieldName.length;i++){
            if(this.list[row.Id][listFieldName[i]]==true)
            return true;
          }
        }
        return false;
      }
      return false;
    },
  },
  ExtraData:{
    getCanEdit({row,fieldName,extraData,canEdit}){
      if(typeof canEdit == 'boolean' && canEdit===false){
        return false;
      }
      if(extraData!=null && extraData.Columns!=null && extraData.Columns[fieldName]!=null){
        if(extraData.Columns[fieldName].CanEdit==true){
          return true;
        }
      }
      else if(extraData==null){
        return true;
      }
      return false;
    },
    getHeader({row,fieldName,extraData}){
      if(extraData!=null && extraData.Columns!=null && extraData.Columns[fieldName]!=null){
        if(extraData.Columns[fieldName].Header!=null){
          return extraData.Columns[fieldName].Header;
        }
      }
      else if(extraData==null){
        return '';
      }
      return '';
    },
  },
  // onRequestList({component,api,data,fnSuccess,fnRebuildData,fnBuildCols,}){
  //   if(component!=null && api!=null && api.list!=null){
  //     const props = component.props;
  //     console.log('onRequestList: ',component,component.props,component.state);
  //     // component.setState.call(component,{a:1},()=>{
  //     //   console.log(component.state);
  //     // });
  //     api.list({
  //       data: data || {},
  //       successCallBack:(response)=>{
  //         let _cols;
  //         if(fnBuildCols!=null){
  //           _cols = fnBuildCols(response);
  //         }
  //         App.setState(component,{
  //           data:response.Data.Data,
  //           extraData:response.Data.ExtraData,
  //           cols: _cols,
  //           error:null,isLoading:false
  //         })
  //         if(props.onLoadListFinish!=null){
  //           props.onLoadListFinish(response.Data.Data);
  //         };
  //         if(fnSuccess!=null){
  //           fnSuccess(response);
  //         }
  //       },
  //       errorCallBack:(error,response)=>{
  //         App.setState(component,{
  //           error:error!=null?error:response,isLoading:false
  //         });
  //         if(props.onLoadListFinish!=null){
  //           props.onLoadListFinish(response.Data.Data);
  //         };
  //       }
  //     });
  //   } else { console.warn('onRequestList failed check component,api,api list')}
  // },
  // onRequestDelete({component,api,data,row,fnSuccess,fnError,}){
  //   if(component!=null && api!=null && api.delete!=null){
  //     const props = component.props;
  //     api.delete({
  //       data: data||{},
  //       successCallBack:(response)=>{
  //         let _msg = response.Msg || 'Xóa thành công!';
  //         Global.Toast.showSuccess(_msg);

  //         let _data = component.state.data;
  //         if(_data!=null){
  //           for(let i=0;i<_data.length;i++){
  //             if(_data[i].Id==row.Id){
  //               _data.splice(i,1);
  //               break;
  //             }
  //           }
  //           App.setState(component,{
  //             data:_data
  //           })
  //         }
  //       },
  //       errorCallBack:(error,response)=>{
  //       }
  //     });
  //   } else { console.warn('onRequestDelete failed check component,api,api delete')}
  // },
  // onRequestUpdate({component,api,data,row,fnSuccess,fnError,cellName}){
  //   if(component!=null && api!=null && api.update_field!=null){
  //     const props = component.props;
  //     api.update_field({
  //       data: data||{},
  //       successCallBack:(response)=>{
  //         let _data = []
  //         let _msg = response.Msg || 'Lưu thành công!';
  //         Global.Toast.showSuccess(_msg);
  //         Global.TableHelper.Updating.remove(row,cellName);

  //         if(response.Data!=null && response.Data.Id==row.Id){
  //           _data = component.state.data;
  //           for(let i=0;i<_data.length;i++){
  //             if(_data[i].Id == response.Data.Id){
  //               _data[i] = response.Data;
  //               break;
  //             }
  //           }
  //         }
  //         component.forceUpdate();
  //         /*
  //         Gọi callback để trả về data cho trang view
  //         */
  //         if(fnSuccess) fnSuccess(_data);
  //       },
  //       errorCallBack:(error,response)=>{
  //       }
  //     });
  //   } else { console.warn('onRequestUpdate failed check component,api,api update_field')}
  // },
  // onRequestAddNew({component,api,data,fnSuccess,fnError,cTable}){
  //   if(component!=null && api!=null && api.add!=null){
  //     const props = component.props;
  //     api.add({
  //       data: data||{},
  //       successCallBack:(response)=>{
  //         let _msg = response.Msg || 'Thêm thành công!';
  //         Global.Toast.showSuccess(_msg);
  //         if(cTable!=null){
  //           cTable.reload();
  //         }
  //       },
  //       errorCallBack:(error,response)=>{
  //       }
  //     });
  //   } else { console.warn('onRequestUpdate failed check component,api,api add')}
  // },
  onUpdateField({component,row,fieldName,newValue,oldValue,fnCallback,fnRequestUpdate,opts={}}){
    console.log('onUpdateField:',row,fieldName,newValue,fnRequestUpdate);
    if(fnRequestUpdate!=null){
      if(newValue!=oldValue && !(newValue=="" && oldValue==null)){
        TableHelper.Updating.add(row,fieldName,component);
        fnRequestUpdate(row,fieldName,newValue,{
          component: component,
          opts: opts,
        });
      }
      else{ 
        console.log('Not change!');
      }
    }
    else{ console.warn('fnRequestUpdate is null');}
  },
  buildCols({component,extraData,fieldId="Id",fnRequestUpdate,fnRequestDelete,sourceList,fnList,options={}}){
    console.log('buildCols:',extraData);
    let _cols = [];
    if(extraData!=null && extraData.Columns!=null){
      if(options.addExtraColumns!=null){
        for(let _key of Object.keys(options.addExtraColumns)){
          let _newCol = options.addExtraColumns[_key];
          extraData.Columns[_key] = _newCol;
          // if(_newCol.Index>=0){
          //   extraData.Columns.splice(_newCol.Index,0,_newCol);
          // }
        }
        console.log('buildCols with addExtraColumns:',extraData);
      }
      if(options.customExtraColumns!=null){
        for(let e of Object.keys(options.customExtraColumns)){
          let _type = extraData.Columns[e].Type;
          extraData.Columns[e] = Object.assign(extraData.Columns[e],options.customExtraColumns[e]);
          extraData.Columns[e].Type = Object.assign(extraData.Columns[e].Type,_type);
        }
        console.log('customExtraColumns: ',extraData.Columns);
      }
      let _arrColumns = Object.keys(extraData.Columns);
      for(let i=0;i<_arrColumns.length;i++){
        let _fieldName = _arrColumns[i];
        let _item = extraData.Columns[_fieldName];
        // console.log('col:',_fieldName,_item);
        let _col;
        if(_fieldName==fieldId){
          let _hidden = true;
          if(options.showID!=null && options.showID==true){
            _hidden = false;
          }
          if(_hidden==true){
            _col = {
              width:'40px', hidden: true, isKey:true, dataField: fieldId, header: 'ID',
            }
          }
          else{
            _col = {
              width:_item.Width || '40px', hidden: false, isKey:true, dataField: fieldId, header: _item.Header||_fieldName,
            }
          }
        }
        else{
          if(options.excludeFieldName!=null && options.excludeFieldName.indexOf(_fieldName)>-1){
            continue;
          }
          if(_item.CanShow==true){
            _col = {
              width: _item.Width||'100px', 
              dataField: _fieldName, 
              header: _item.Header||_fieldName,
              colProps: {},
            }
            if(options.columnClassName!=null){
              _col.columnClassName = options.columnClassName;
            }
            if(options.defaultFormat!=null){
              _col.dataFormat = options.defaultFormat;
            }
            else{
              _col.dataFormat = CellHelper.DataFormat.readonly;
            }

            if(_item.CanSort!=null){
              _col.colProps.dataSort = _item.CanSort;
            }
            if(_item.Cls!=null){
              _col.className = _col.className||'' + ' ' + _item.Cls;
            }
            if(_item.CCls!=null){
              _col.columnClassName = _col.columnClassName||'' + ' ' + _item.CCls;
            }
            if(_item.CanPrint===false){
              _col.columnClassName = _col.columnClassName||'' + ' no-print-col';
              _col.className = _col.className||'' + ' no-print-col';
            }
            
            
            if(_item.CanEdit==true || _item.CanEdit==false){
              if(options.customProps!=null && options.customProps['_Arr']!=null){
                let _regex = options.customProps['_Arr'].regex;
                let _test = _regex.test(_fieldName);
                if(_test==true){
                  _col.colProps = Object.assign(_col.colProps,options.customProps['_Arr'].props);
                }
              }
              if(options.customProps!=null && options.customProps[_fieldName]!=null){
                _col.colProps = Object.assign(_col.colProps,options.customProps[_fieldName]);
              }

              if(options.customType!=null && options.customType[_fieldName]!=null){
                _item.Type = Object.assign(_item.Type,options.customType[_fieldName]);
                console.log('_item.Type:',_item.Type,options.customType);
              }

              let _formatExtraData = {
                fieldName: _fieldName,
                fnRequestUpdate: fnRequestUpdate,
                fnRequestDelete: fnRequestDelete,
                extraData: extraData,
                sourceList: sourceList||{},
                fnList: fnList||{},
              }
              _formatExtraData = Object.assign(_formatExtraData,_item);
              _col.colProps.formatExtraData = _formatExtraData;

              if(_item.Type!=null){
                if(CellHelper.DataFormat[_item.Type.type]!=null){
                  _col.dataFormat = CellHelper.DataFormat[_item.Type.type];
                }
              }
            }
          }
        }
        // _col.colProps.formatExtraData = {
        // } 
        if(_col!=null){
          if(_item.Index!=null){
            if(_cols.length>_item.Index){
              _cols.splice(_item.Index,0,_col);
            }
            else{
              // _cols.unshift(_col);
              _cols.push(_col);
            } 
          }
          else{
            _cols.push(_col);
          }
        }
      }
      if(options.customAction!=null){
        _cols.push(
          options.customAction
        )
      }
      else if(_cols.length>0 && options.canDelete==true){
        _cols.push(
          {
            width:'35px', dataSort: false, dataField:'_ActionDelete', header: '',
            dataFormat: CellHelper.DataFormat.delete,
            columnClassName: 'no-print-col',
            colProps: {
              formatExtraData: {
                fieldName: '_ActionDelete',
                fnRequestUpdate: fnRequestUpdate,
                fnRequestDelete: fnRequestDelete,
                extraData: extraData,
              }
            }
          },
        )
      }
    }
    console.log('buildCols finish:',_cols);
    return _cols;
  },
}

export default TableHelper;