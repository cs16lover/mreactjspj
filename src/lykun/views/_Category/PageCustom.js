import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {
  Row,Col, Badge,
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Button, Table,
} from 'reactstrap';

import * as H from '../../helpers';
import Category from './Category';

// import StackHolderChart from './StakeHolder/Chart';
// import CharterInfoSign from './CharterInfo/Sign';

const PageCustom = {
  PLANWEEK_REPORT :{
    Header: {
      show: true,
      showAddNew: false,
    },
    AddNew:{},
    Table:{
      canDelete: false,
      extraData:{
        Columns:{
          Id:{Type:null,CanShow:true,CanEdit:true,Header:"Id",Width:null,ExtData:null},
          Project_Name:{Type:{type:'readonly',bgF:'ColorCode'},CanShow:true,CanEdit:false,Header:"Project Name",Width:"100px",ExtData:null},
          DepartmentName:{Type:{type:'readonly',bgF:'DepartmentColorCode'},CanShow:true,CanEdit:false,Header:"Department",Width:"100px",ExtData:null},
          AssignToId_Name:{Type:null,CanShow:true,CanEdit:false,Header:"Resp",Width:"100px",ExtData:null},
          Stage_Text:{Type:null,CanShow:true,CanEdit:false,Header:"Stage",Width:"100px",ExtData:null},
          Mark:{Type:null,CanShow:true,CanEdit:true,Header:"Milestone",Width:"100px",ExtData:null},
          ConfigTaskId_Name:{Type:null,CanShow:true,CanEdit:true,Header:"Task",Width:"100px",ExtData:null},
          FromDate:{Type:{type:'readonly_date',more:'{"format":"DD/MM/YYYY"}'},CanShow:true,CanEdit:true,Header:"Start",Width:"100px",ExtData:null},
          ToDate:{Type:{type:'readonly_date',more:'{"format":"DD/MM/YYYY"}'},CanShow:true,CanEdit:true,Header:"End",Width:"100px",ExtData:null},
          WorkDate:{Type:{type:'readonly_date',more:'{"format":"DD/MM/YYYY"}'},CanShow:true,CanEdit:true,Header:null,Width:"60px",ExtData:null},
          WorkHours:{Type:null,CanShow:true,CanEdit:true,Header:"H",Width:"20px",ExtData:null},
        }
      } 
    },
    Filter:{
      listInList: ['Project_Name','AssignToId_Name'],
      customQueryFromSever: function({obj}){
        var _query = {};
        if(obj){
          for(let _k in obj){
            let _item = obj[_k];
            console.log('handleFilterData custom sever:',_k,_item);
            if(_item!=null){
              if(_k=='DepartmentId'){
                if(_item.value!=null && _item.value.length>0){
                  _query.DepartmentId = _item.value;
                }
              }
              else if(_k=='Date'){
                _query.FromDate = _item.start;
                _query.ToDate = _item.end;
              }
              else if(_k=='StaffId'){
                if(_item.value!=null && _item.value.length>0){
                  _query.StaffId = _item.value;
                }
              }
              else if(_k=='ProjectId'){
                if(_item.value!=null && _item.value.length>0){
                  _query.ProjectId = _item.value;
                }
              }
            }
          }
        }
        return _query;
        
      },
      data: [
        { type: 'datefromto',title: 'Date',fieldName: 'Date',},
        // { type: 'select2',optionKey: 'Project_Name_InList',fieldName: 'Project_Name',title: 'Project',},
        // { type: 'select2',optionKey: 'AssignToId_Name_InList',fieldName: 'AssignToId_Name',title: 'Resp',},
        { type: 'select2',optionKey: 'ProjectList',fieldName: 'ProjectId',title: 'Project', needConvert: true,},
        { type: 'select2',optionKey: 'StaffList',fieldName: 'StaffId',title: 'Resp', needConvert: true,},
        { type: 'select2',optionKey: 'DepartmentList',fieldName: 'DepartmentId',title: 'Department',needConvert: true,},
        { type: 'search',title: 'Tìm kiếm ',/*instant: true,*/ },
      ]
    },
  },
  PROJECT_SEARCH:{
    Page:{
      isGetOptions: false,
    },
    Header: {
      show: true,
      showAddNew: false,
    },
    Table:{
      canDelete: false,
      extraData: {
        Columns:{
          Id:{ CanEdit: false, CanShow: false, Header: 'Id',},
          Name:{ CanEdit: false, CanShow: true, Header: 'Project Name', Width: '400px', Type: null,},
          IM_FilterString:{ CanEdit: false, CanShow: true, Header: 'Project Name', Width: '0px', Type: {type:'invisible'},},
        }
      },
    },
    Filter:{
      require4ShowData: true,
      data: [
        { type: 'search',title: 'Tìm kiếm ',instant: true, nosymbol: true,},
      ]
    }
  },
  WI_GM_CHARTER:{
    Page:{
      isGetOptions: false,
      isWithProjectId: true,
    },
    Header: {
      show: true,
      showProjectMenu: true,
      showProjectHeader: false,
      showAddNew: false,
    },
    Table:{
      canDelete: false,
      showHeader: false,
      extraData: {
        Columns:{
          Id:{ CanEdit: false, CanShow: false, Header: 'Id',},
          F1:{ CanEdit: true, CanShow: true, Header: 'F1', Width: '100px', Type: {type:'textareafull'}, CCls:"tbct_f1"},
          F2:{ CanEdit: true, CanShow: true, Header: 'F2', Width: '100px', Type: {type:'textareafull'}, CCls:"tbct_f2"},
          F3:{ CanEdit: true, CanShow: true, Header: 'F3', Width: '300px', Type: {type:'textareafull'}, CCls:"tbct_f3"},
        }
      },
      // cnMyTable: "s_table_hideheader",
    },
    Filter: {
      show: false
    },
  },
  // STAKE_HOLDER:{
  //   Header: {
  //     show: true,
  //     showProjectMenu: true,
  //     showProjectHeader: true,
  //     showAddNew: true,
  //   },
  //   Page:{
  //     isGetOptions: true,
  //     isWithProjectId: true,
  //     componentBelowFilter: StackHolderChart,
  //   },
  //   Table:{
  //     canDelete: true,
  //     deleteWithData: true,
  //     showHeader: true,
  //     extraData: {
  //       Columns:{
  //         Id:{ CanEdit: false, CanShow: false, Header: 'Id',},
  //         STKHName:{ CanEdit: true, CanShow: true, Header: 'StakeHolder Name', Width: '100px', Type: {type:'text'},},
  //         STKHTypeId:{ CanEdit: true, CanShow: true, Header: 'Vai trò', Width: '100px', Type: {type:'select',source:'STKHTypeList'},},
  //         STKHInterestText:{ CanEdit: true, CanShow: true, Header: 'Interest', Width: '100px', Type: {type:'text'},},
  //         STKHInterestNo:{ CanEdit: true, CanShow: true, Header: 'Interest No', Width: '30px', Type: {type:'select',source:'STKHInterestNoList'},},          
  //         STKHPowerId:{ CanEdit: true, CanShow: true, Header: 'Power', Width: '100px', Type: {type:'select',source:'STKHPowerList'},},
  //         STKHPowerNo:{ CanEdit: true, CanShow: true, Header: 'Power No', Width: '30px', Type: {type:'select',source:'STKHPowerNoList'},},
  //       }
  //     },
  //   },
  //   Filter:{
  //     listInList: ['STKHName','STKHInterestText'],
  //     data: [
  //       { type: 'select2',optionKey: 'STKHName_InList',fieldName: 'STKHName',title: 'StakeHolder Name',},
  //       { type: 'select2',optionKey: 'STKHTypeList',fieldName: 'STKHTypeId',title: 'Vai trò', needConvert: true},
  //       { type: 'select2',optionKey: 'STKHInterestText_InList',fieldName: 'STKHInterestText',title: 'Interest', needConvert: false},
  //       { type: 'select2',optionKey: 'STKHPowerList',fieldName: 'STKHPowerId',title: 'Power', needConvert: true},
  //       { type: 'search',title: 'Tìm kiếm ',instant: true, nosymbol: false},
  //     ]
  //   }
  // },
  // CHARTER_INFO:{
  //   Header: {
  //     show: true,
  //     showProjectMenu: true,
  //     showProjectHeader: true,
  //     showAddNew: false,
  //   },
  //   Page:{
  //     isGetOptions: true,
  //     isWithProjectId: true,
  //     // componentBelowFilter: StackHolderChart,
  //     componentFooter: CharterInfoSign,
  //   },
  //   Table:{
  //     canDelete: false,
  //     showHeader: false,
  //     tableProps:{
  //       pagination: false,
  //     },
  //     extraData: {
  //       Columns:{
  //         Id:{ CanEdit: false, CanShow: false, Header: 'Id',},
  //         Item:{ CanEdit: true, CanShow: true, Header: 'Item', Width: '100px', Type: {type:'readonly_tooltip',sourceField: 'Description',more:'{"style":{"fontWeight":"bold","minHeight":"50px"}}'},},
  //         Value:{ CanEdit: true, CanShow: true, Header: 'Value', Width: '200px', Type: {type:'textareafull',},},
  //       }
  //     },
  //   },
  // },
  CONFIG_HR_DIAGRAM:{
    // Header: {
    //   show: true,
    //   showProjectMenu: true,
    //   showProjectHeader: true,
    //   showAddNew: false,
    // },
    // Page:{
    //   isGetOptions: true,
    //   isWithProjectId: true,
    //   // componentBelowFilter: StackHolderChart,
    //   componentFooter: CharterInfoSign,
    // },
    Table:{
      addExtraColumns: {
        _FirstCol :{ Type: { type: 'link_icon', link: '/config-hr-diagram/[Id]'}, Index: 0, CanShow: true, CanEdit: false, CanSort: false, Header: " ", Width: '30px', }
      },
    //   canDelete: true,
    //   showHeader: true,
    //   tableProps:{
    //     pagination: true,
    //   },
    //   extraData: {
    //     Columns:{
    //       Id:{ CanEdit: false, CanShow: false, Header: 'Id',},
    //       _FirstCol :{ Type: { type: 'link_icon', link: '/config-hr-diagram/[Id]'}, Index: 0, CanShow: true, CanEdit: false, CanSort: false, Header: " ", Width: '30px', },
    //       Name:{ CanEdit: true, CanShow: true, Header: 'Name', Width: '100px', Type: {type:'text',},},
    //       CountCols:{ CanEdit: true, CanShow: true, Header: 'CountCols', Width: '100px', Type: {type:'text',},},
    //       CountRows:{ CanEdit: true, CanShow: true, Header: 'CountRows', Width: '100px', Type: {type:'text',},},
    //       Note:{ CanEdit: true, CanShow: true, Header: 'Note', Width: '200px', Type: {type:'textareafull',},},
    //     }
    //   },
    },
  },
}

export default PageCustom;
