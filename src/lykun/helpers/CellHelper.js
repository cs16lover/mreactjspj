import React, { Component } from 'react';
import {
  Button,
} from 'reactstrap';
// import {Link} from 'react-router-dom';
// import { ChromePicker } from 'react-color';
// import M from '../M';
// import Moment from "moment";
// import App from './App';
// import TableHepler from './TableHelper';

// import InputEditor from '../../views/Components/InputEditor/index2';
// import InputControl from '../../views/Components/InputEditor/CustomControl';
// import { HTEditor } from '../../views/Components/InputEditor/CustomCell';
// import { Popover } from '../../mreact/core';
// import Tooltip from '../../mreact/tooltip';


const CellHelper = {
  getMoreInType({extra,row}){
    let _more = {};
    if(extra!=null){
      let _type = extra.Type;
      try {
        if(_type!=null && _type.more){
          _more = JSON.parse(_type.more);
        }
      } catch (error) { console.warn('Parser json more in Type error:',error,_type);}
    }
    return _more;
  },
  getFnList({extra,row}){
    let _fnList = {};
    if(extra!=null){
      _fnList = extra.fnList||{};
    }
    return _fnList;
  },
  getFormatInMore({extra,row}){
    let _more = this.getMoreInType({extra,row});
    if(_more!=null){
      return _more.format;
    }
  },
  getOptionTextFieldInMore({extra,row}){
    let _more = this.getMoreInType({extra,row});
    if(_more!=null){
      return _more.otF;
    }
  },
  getCanEdit({extra,row,defaultValue=true}){
    let _type = extra.Type;
    // console.log('getCanEdit:',extra,row);
    if(_type!=null && _type.more!=null){
      let _more = CellHelper.getMoreInType({extra:extra,row:row});
      // console.log('getCanEdit more:',_more);
      if(typeof _more.lockF == 'bolean'){
        return _more.lockF;
      }
      else if(typeof _more.lockF == 'string'){
        if(_more.lockF.length>0 && row[_more.lockF]!=null){
          // console.log('getCanEdit more:',_more,row[_more.lockF]);
          return !row[_more.lockF];
        }
      }
    }
    return defaultValue;
  },
  getExtraStyle({extra,row}){
    let _style = {};
    if(extra!=null){
      let _styleEx = extra.Style;
      if(_styleEx!=null){
        if(M.isString(_styleEx)==true){
          try {
            _style = Object.assign(_style,JSON.parse(_styleEx));
          } catch (error) {
            console.log('getExtraStyle error:',_style,error);
          }
        }
        else if(M.isObject(_styleEx)==true){
          _style = Object.assign(_style,_styleEx);
        }
      }
      if(extra.Type!=null && extra.Type.bgF!=null && row!=null){
        if(row[extra.Type.bgF]!=null){
          let _color = M.Color(row[extra.Type.bgF]).getTextWB();
          _style = Object.assign(_style,{backgroundColor:row[extra.Type.bgF],color:_color});
        }
        else if(extra.Type.bgF.startsWith('#')){
          let _color = M.Color(extra.Type.bgF).getTextWB();
          _style = Object.assign(_style,{backgroundColor:extra.Type.bgF,color:_color});
        }
      }
      let _more = CellHelper.getMoreInType({extra,row});
      if(_more && _more.style){
        try {
          let _styleInMore = _more.style || {};
          if(_styleInMore){
            _style = Object.assign(_style,_styleInMore);
          }
        } catch (error) {
          
        }
      }
    }
    // console.log('getExtraStyle:',extra,_style);
    return _style;
  },
  getSourceSelect({extra,row}){
    let _sourceOption = [];let _type = extra.Type;
    // console.log('getSourceSelect:',row,extra);

    //Check source have .
    if(_type.source!=null && _type.source.indexOf('.')>0){
      let _f1 = _type.source.split('.')[0];
      let _f2 = _type.source.split('.')[1];
      let _sf = _type.sourceField;
      let _valueSourceField = row[_sf];

      if(extra.sourceList[_f1]!=null  && extra.sourceList[_type.source]==null){//&& extra.sourceList[_f2]!=null
        let _obj = M.arrayObj2ObjWithKey(extra.sourceList[_f1],'Value');
        if(_obj!=null)
        {
          let _keys = Object.keys(_obj);
          let _newObj = {};
          for(let i of _keys){
            _newObj[i] = _obj[i][_f2];
          }
          extra.sourceList[_type.source] = _newObj;
          console.log('getSourceSelect:',extra);
        }
      }
      if(extra.sourceList[_type.source]!=null && _valueSourceField!=null){
        _sourceOption = extra.sourceList[_type.source][_valueSourceField];
        // console.log('getSourceSelect option 1:',_sourceOption);
      }
    }
    else if(_type.source!=null && extra.sourceList!=null){
      _sourceOption = extra.sourceList[_type.source] || [];
    }

    if(_type.type=='select2color' || _type.type=='pickcolor'){
      let _s = extra.sourceList[_type.source];
      let _newFieldSource = _type.source+'_Select2Color';
      if(extra.sourceList[_newFieldSource]!=null){
        _sourceOption = extra.sourceList[_newFieldSource];
      }
      else if(_s!=null){
        extra.sourceList[_newFieldSource] = _s.map((e,i)=>{
          return {
            value: e.ColorCode,
            label: e.Name,
          }
        });
        _sourceOption = extra.sourceList[_newFieldSource];
      }
    }

    if(_type.sourceList!=null){
      try {
        extra.Type.sourceListParser = JSON.parse(_type.sourceList);
        _sourceOption = extra.Type.sourceListParser;
      } catch (error) { console.warn('parser json type source list error:',error);}
    }
    // console.log('getSourceSelect _sourceOption:',extra.sourceList,_sourceOption);
    return _sourceOption;
  },
  Type:{
    readonly: 'readonly',
    text: 'text',
  },
  addCustomDataFormat(key,format){
    if(CellHelper.DataFormat[key]==null){
      CellHelper.DataFormat[key] = format;
    }
    else{
      console.warn('CustomFormat exist:',key)
    }
  },
  DataFormat:{
    invisible:(cell,row,extra,index)=>{
      return <div></div>
    },
    readonly:(cell,row,extra,index)=>{
      let _style = CellHelper.getExtraStyle({extra:extra,row:row});
      if(typeof cell == 'object' && cell!=null){
        return <div className="mtb-col-ro has-wrap" style={_style}>{"[object]"}</div> 
      }
      return <div className="mtb-col-ro has-wrap" style={_style}>{cell}</div>
    },
    // readonly_date:(cell,row,extra,index)=>{
    //   let _style = CellHelper.getExtraStyle({extra:extra,row:row});
    //   let _value = '';
    //   let _format = CellHelper.getFormatInMore({extra:extra,row:row}) || 'DD/MM/YYYY';
    //   if(cell && cell>0){
    //     _value = Moment(cell).format(_format);
    //   }
    //   return <div className="idiv-ro has-wrap" style={_style}>{_value}</div>
    // },
    // readonly_currency:(cell,row,extra,index)=>{
    //   let _style = CellHelper.getExtraStyle({extra:extra,row:row});
    //   let _value = '';
    //   if(cell && cell>0){
    //     _value = cell.toFixed().replace(/./g, function(c, i, a) {
    //       return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    //     });
    //   }
    //   return <div className="idiv-ro has-wrap" style={_style}>{_value}</div>
    // },
    // readonly_tooltip:(cell,row,extra,index)=>{
    //   let _style = CellHelper.getExtraStyle({extra:extra,row:row});
    //   let _value = cell;
    //   if(extra.Type && extra.Type.sourceField && row[extra.Type.sourceField]){
    //     let _tooltip = row[extra.Type.sourceField];
    //     return (
    //       <div className="idiv-ro has-wrap" style={_style}>
    //         <Tooltip placement="top" overlay={<div style={{maxWidth:'300px'}}>{_tooltip}</div>}>
    //           <div>{_value}</div>
    //         </Tooltip>
    //       </div>
    //     )
    //   }
    //   return 
    //   <div className="idiv-ro has-wrap" style={_style}>
    //     {_value}
    //   </div>
    // },
    // readonly_array:(cell,row,extra,index)=>{
    //   let _style = CellHelper.getExtraStyle({extra:extra,row:row});
    //   let _ui = [];
    //   let _more = CellHelper.getMoreInType({extra,row});
    //   if(cell!=null && Array.isArray(cell)==true){
    //     for(let i in cell){
    //       let _item = cell[i];
    //       let _class = "sp-btn-blue";
    //       let _value = '';
    //       // console.log('readonly_array:',i,_item,_more,extra);
    //       if(typeof _item == 'string'){
    //         _value = _item;
    //       }
    //       else if(typeof _item == 'object' && extra && extra.sourceField){
    //         // console.log('readonly_array1:',i,_item,_more);
    //         _value = _item[extra.sourceField]||"";
    //       }
    //       else if(typeof _item == 'object' && _more.readonly_array_field){
    //         // console.log('readonly_array2:',i,_item,_more);
    //         _value = _item[_more.readonly_array_field]||"";
    //       }
    //       else if(typeof _item == 'object' && _item['StaffId_Name']){
    //         // console.log('readonly_array3:',i,_item,_more);
    //         _value = _item['StaffId_Name'];
    //       }
    //       _ui.push(
    //         <span className={_class} key={i}>{_value}</span>
    //       )
    //     }
    //   }
    //   return (
    //     <div className="idiv-ro has-wrap dFaiCfwW" style={_style}>
    //     {
    //       _ui
    //     }
    //     </div>
    //   )
    // },
    // ro_nowrap:(cell,row,extra,index)=>{
    //   let _style = CellHelper.getExtraStyle({extra:extra,row:row});
    //   return <div className="idiv-ro-ellipsis" style={_style}>{cell}</div>
    // },
    // link:(cell,row,extra,index)=>{
    //   let _style = CellHelper.getExtraStyle({extra:extra,row:row});
    //   let _link = extra.Type!=null?extra.Type.link:'';
    //   if(_link && _link.indexOf('[')>-1){
    //     let _extract = M.SquareBracket.extract(_link);
    //     if(_extract!=null && _extract.length>0){
    //       for(let _e of _extract){
    //         if(row[_e]!=null){
    //           let _rg = new RegExp('\\['+_e+'\\]','g');
    //           // console.log(_rg,_link,row[_e]);
    //           _link = _link.replace(_rg, row[_e]);
    //         }
    //       }
    //     }
    //   }
    //   // console.log('link:',_link);
    //   return <div className="idiv-ro has-wrap" style={_style}>
    //     <Link to={_link} target='_blank'>{cell}</Link>
    //   </div>
    // },
    // link_icon:(cell,row,extra,index)=>{
    //   let _style = CellHelper.getExtraStyle({extra:extra,row:row});
    //   let _link = extra.Type!=null?extra.Type.link:'';
    //   if(_link && _link.indexOf('[')>-1){
    //     let _extract = M.SquareBracket.extract(_link);
    //     if(_extract!=null && _extract.length>0){
    //       for(let _e of _extract){
    //         if(row[_e]!=null){
    //           let _rg = new RegExp('\\['+_e+'\\]','g');
    //           // console.log(_rg,_link,row[_e]);
    //           _link = _link.replace(_rg, row[_e]);
    //         }
    //       }
    //     }
    //   }
    //   // console.log('link:',_link);
    //   return <div className="idiv-ro has-wrap dFaiCjcC" style={_style}>
    //     <Link to={_link} target='_blank'>
    //       <i className="fa fa-location-arrow"/>
    //     </Link>
    //   </div>
    // },
    // input:({cell,row,extra,index,type,inputProps})=>{
    //   // console.log('DataFormat input :',type,extra);
    //   let _type = extra.Type;
    //   var moreProps = {extra:extra,styleControl:CellHelper.getExtraStyle({extra:extra,row:row}),moreProps:{}};
    //   // var controlProps = {};
    //   let _more = CellHelper.getMoreInType({extra:extra,row:row});

    //   if(inputProps!=null){
    //     moreProps = Object.assign(moreProps,inputProps);
    //   }
    //   if(_type!=null && _type.multipleLine!=null){
    //     moreProps.multipleLine = _type.multipleLine;
    //   }
    //   let _canEdit = extra.CanEdit;
    //   if(_canEdit==true){
    //     _canEdit = CellHelper.getCanEdit({extra:extra,row:row});
    //   }
    //   if(type=='select'){
    //     let _showRemoved = _more.showRemoved;
    //     if(_showRemoved==true){
    //       moreProps.showRemoved=true;
    //     }
    //   }
    //   else if(type=='text'){
    //     let _mask = _more.mask;
    //     if(_mask!=null){
    //       // controlProps.mask = _mask;
    //       moreProps.moreProps.mask = _mask;
    //     }
    //     if(_more.regexDelete!=null){
    //       moreProps.moreProps.regexDelete = _more.regexDelete;
    //     }
    //   }
    //   if(_more && _more.disableField){
    //     let _isDisable = row[_more.disableField];
    //     if(_isDisable==true){
    //       let _value = row[extra.fieldName];
    //       if(_more.showField){
    //         _value = row[_more.showField];
    //       }
    //       console.log("disableField: ",_more);
    //       return <div className="idiv-ro has-wrap">{_value}</div>
    //     }
    //   }

    //   return <InputEditor row={row} fnRequestUpdate={extra.fnRequestUpdate} extraData={extra.extraData} canEdit={_canEdit}
    //   type={type} fieldName={extra.fieldName} {...moreProps}/>
    // },
    // text:(cell,row,extra,index)=>{
    //   return CellHelper.DataFormat.input({cell:cell,row:row,extra:extra,index:index,type:'text'});
    // },
    // number:(cell,row,extra,index)=>{
    //   return CellHelper.DataFormat.input({cell:cell,row:row,extra:extra,index:index,type:'number'});
    // },
    // checkbox:(cell,row,extra,index)=>{
    //   return CellHelper.DataFormat.input({cell:cell,row:row,extra:extra,index:index,type:'checkbox'});
    // },
    // textarea:(cell,row,extra,index)=>{
    //   return CellHelper.DataFormat.input({cell:cell,row:row,extra:extra,index:index,type:'textarea'});
    // },
    // textareafull:(cell,row,extra,index)=>{
    //   let _inputProps = {textareafull:true};
    //   if(extra && extra.Type){
    //     extra.Type.multipleLine = true;
    //   }
    //   return CellHelper.DataFormat.input({cell:cell,row:row,extra:extra,index:index,type:'textarea',inputProps:_inputProps});
    // },
    // date:(cell,row,extra,index)=>{
    //   return CellHelper.DataFormat.input({cell:cell,row:row,extra:extra,index:index,type:'date'});
    // },
    // select:(cell,row,extra,index)=>{
    //   let _inputProps = {};
    //   _inputProps.options = CellHelper.getSourceSelect({extra: extra,row:row});
    //   _inputProps.optionText = CellHelper.getOptionTextFieldInMore?row[CellHelper.getOptionTextFieldInMore]:null;
    //   return CellHelper.DataFormat.input({cell:cell,row:row,extra:extra,index:index,type:'select',inputProps:_inputProps});
    // },
    // selectlevel:(cell,row,extra,index)=>{
    //   let _inputProps = {};
    //   _inputProps.options = CellHelper.getSourceSelect({extra: extra,row:row})
    //   return CellHelper.DataFormat.input({cell:cell,row:row,extra:extra,index:index,type:'select',inputProps:_inputProps});
    // },
    // select2color:(cell,row,extra,index)=>{
    //   let _inputProps = {};
    //   _inputProps.options = CellHelper.getSourceSelect({extra: extra,row:row})
    //   return CellHelper.DataFormat.input({cell:cell,row:row,extra:extra,index:index,type:'select2color',inputProps:_inputProps});
    // },
    // percent:(cell,row,extra,index)=>{
    //   let _source = CellHelper.getSourceSelect({extra: extra,row:row})
    //   let _canEdit = extra.CanEdit;
    //   if(_canEdit==true){
    //     _canEdit = CellHelper.getCanEdit({extra:extra,row:row});
    //   }
    //   return (
    //     <HTEditor row={row} fnRequestUpdate={extra.fnRequestUpdate} extraData={extra.extraData} canEdit={_canEdit}
    //         fieldName={extra.fieldName} source={_source}/>
    //   );
    // },
    // chromecolor:(cell,row,extra,index)=>{
    //   let _value = row[extra.fieldName];
    //   return (
    //     <div className="a_del">
    //       <Popover placement="topRight" 
    //         // title={'Chọn màu'}
    //         overlay={
    //           <ChromePicker color={ _value||"#cccccc" } onChange={ (color)=>{
    //             console.log('onchange: ',color);
    //             TableHepler.onUpdateField({
    //               component: null,
    //               row: row,
    //               fieldName: extra.fieldName,
    //               fnRequestUpdate: extra.fnRequestUpdate,
    //               newValue: color.hex,
    //               oldValue: _value,
    //             });
    //           } }/>
    //         } 
    //         trigger="click" >
    //         <Button style={{border:'0px',width:'100%',height:'100%',backgroundColor:_value}}></Button>
    //       </Popover>
    //     </div>
    //   );
    // },
    // pickcolor:(cell,row,extra,index)=>{
    //   let _options = CellHelper.getSourceSelect({extra: extra,row:row});
    //   let _value = row[extra.fieldName];
    //   return (
    //     <div className="a_del">
    //       <Popover placement="topRight" title={'Chọn màu'}
    //         overlay={
    //         <InputControl
    //           // ref={r=>{this._cInputColor2=r;}}
    //           type={'select2color'} 
    //           options={_options}
    //           value={_value}
    //           onChange={(value)=>{
    //             console.log('pick:',value);
    //             TableHepler.onUpdateField({
    //               component: null,
    //               row: row,
    //               fieldName: extra.fieldName,
    //               fnRequestUpdate: extra.fnRequestUpdate,
    //               newValue: value,
    //               oldValue: _value,
    //             });
    //           }}
    //           moreProps={{
    //             closeOnSelect: true
    //           }}
    //         />
    //         } 
    //         trigger="click" >
    //         <Button style={{border:'0px',width:'100%',height:'100%',backgroundColor:_value}}></Button>
    //       </Popover>
    //     </div>
    //   );
    // },
    // select2:(cell,row,extra,index)=>{
    //   let _options = CellHelper.getSourceSelect({extra: extra,row:row});
    //   let _value = row[extra.fieldName];
    //   return (
    //     <div className="a_del">
    //       <Popover placement="topRight" 
    //         // title={'Chọn màu'}
    //         overlay={
    //         <InputControl
    //           // ref={r=>{this._cInputColor2=r;}}
    //           type={'select2'} 
    //           options={_options}
    //           value={_value}
    //           onChange={(e,value)=>{
    //             console.log('pick:',value);
    //             TableHepler.onUpdateField({
    //               component: null,
    //               row: row,
    //               fieldName: extra.fieldName,
    //               fnRequestUpdate: extra.fnRequestUpdate,
    //               newValue: value,
    //               oldValue: _value,
    //             });
    //           }}
    //           moreProps={{
    //             closeOnSelect: true,
    //             autoFocus: true,
    //             openOnFocus: true,
    //           }}
    //         />
    //         } 
    //         trigger="click" >
    //         <Button style={{border:'0px',width:'100%',height:'100%'}}>{_value}</Button>
    //       </Popover>
    //     </div>
    //   );
    // },
    // delete:(cell,row,extra,index)=>{
    //   const {fnRequestDelete}=extra;
    //   // console.log('delete:',extra);
    //   return (
    //     <div className="a_del">
    //       <Popover placement="topRight" title={'Xóa'}
    //         overlay={<div>Bạn có chắc muốn xóa?</div>} trigger="click" showButton okText="Đồng ý" cancelText="Đóng" 
    //         onOk={()=>{fnRequestDelete(row)}} onCancel={()=>{console.log('Cancel')}}>
    //         <Button color="danger" outline style={{border:'0px'}} onKeyPress={(ev)=>{
    //             if(ev.key === 'Enter'){
    //               fnRequestDelete(row);
    //             }
    //           }}><i className="fa fa-trash"/></Button>
    //       </Popover>
    //     </div>
    //   );
    // },
    // action:(cell,row,extra,index)=>{
    //   const {fnList}=extra;
    //   // console.log('delete:',extra);
    //   return (
    //     <div className="col-action">
    //       <Button color="primary" style={{border:'0px'}} onClick={()=>{
    //         if(fnList!=null && fnList.fnEdit!=null){
    //           fnList.fnEdit({row});
    //         }
    //       }}><i className="fa fa-edit"/></Button>
    //       <Popover placement="topRight" title={'Xóa'}
    //         overlay={<div>Bạn có chắc muốn xóa?</div>} trigger="click" showButton okText="Đồng ý" cancelText="Đóng" 
    //         onOk={()=>{
    //           if(fnList!=null && fnList.fnDelete!=null){
    //             fnList.fnDelete({row});
    //           }
    //         }} onCancel={()=>{console.log('Cancel')}}>
    //         <Button color="danger" style={{border:'0px'}}><i className="fa fa-trash"/></Button>
    //       </Popover>
    //     </div>
    //   );
    // },
  },
}

export default CellHelper;