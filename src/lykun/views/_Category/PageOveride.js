import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {
  Row,Col, Badge,
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Button, Table,
} from 'reactstrap';

import * as H from '../../helpers';
import Category from './Category';

const PageCustom = {
  DM_STAFF:{
    AddNew:{
      data:[
        // { name: 'FirstName', label: 'First Name', type: 'text', optionKey: '', },
        // { name: 'DepartmentId', label: 'Department', type: 'select2', optionKey: 'DepartmentList', },
        // { name: 'HRGroupId', label: 'Group', type: 'select2', optionKey: 'HRGroupList', },
        // { name: 'HRPositionId', label: 'Position', type: 'select2', optionKey: 'HRPositionList', },
        // { name: 'IsPM', label: 'PM', type: 'checkbox', default: false, },
        { name: 'EmailAddress', label: 'Email', type: 'text', },
      ]
    },
    Table:{
      addExtraColumns: {
        _FirstCol :{ Type: { type: 'link_icon', link: '/staff-detail/[Id]'}, Index: 0, CanShow: true, CanEdit: false, CanSort: false, Header: " ", Width: '30px', }
      },
    },
    Filter:{
      data: [
        { type: 'select2', title: 'Department', optionKey: 'DepartmentList', fieldName: 'DepartmentId', needConvert: true, },
        { type: 'select2', title: 'Group', optionKey: 'HRGroupList', fieldName: 'HRGroupId', needConvert: true, },
        { type: 'select2', title: 'Position', optionKey: 'HRPositionList', fieldName: 'HRPositionId', needConvert: true, },
        { type: 'select2', title: 'JobTitle', optionKey: 'JobTitleList', fieldName: 'JobTitleId', needConvert: true, },
        { type: 'search', title: 'Tìm kiếm', },
      ]
    }
  },
  DM_DOITC:{
    Filter:{
      data: [
        { type: 'select2', optionKey: 'WPG_Text_InList', fieldName: 'WPG_Text', title: 'WPG', },
        // { type: 'hidecol', cols: {ContactEmail:'Email',ContactPhone: 'Phone',}, title: 'Ẩn Cột', isRemove: true},
        { type: 'search', title: 'Tìm kiếm ', },
      ]
    }
  },
  DM_HR_POSITION:{
    Filter:{
      data:[
        { type: 'select2', optionKey: 'HRGroupList', fieldName: 'HRGroupId', title: 'Group', needConvert: true, },
        { type: 'search', title: 'Tìm kiếm ', },
      ]
    }
  },
  DM_BRIEF_REPORT:{
    Table:{
      addExtraColumns: {
        _FirstCol :{ Type: { type: 'link_icon', link: '/config-brieft-report/[Id]'}, Index: 0, CanShow: true, CanEdit: false, CanSort: false, Header: " ", Width: '30px', }
      },
    },
  },
  DM_WPG:{
    Table:{
      addExtraColumns: {
        _FirstCol :{ Type: { type: 'link_icon', link: '/wpg-standard/[Id]'}, Index: 0, CanShow: true, CanEdit: false, CanSort: false, Header: " ", Width: '30px', }
      },
    },
  },
  // DM_TASK:{
  //   Filter:{
  //     listInList: ['TaskType','ProjectName'],
  //     data:[
  //       { type: 'select2', optionKey: 'TaskType_InList', fieldName: 'TaskType', title: 'TaskType', },
  //       { type: 'select2', optionKey: 'ProjectName_InList', fieldName: 'ProjectName', title: 'Project', },
  //       { type: 'select2', optionKey: 'DepartmentList', fieldName: 'DepartmentId', title: 'Department', needConvert: true, },
  //       { type: 'select2', optionKey: 'JobTitleList', fieldName: 'JobTitleId', title: 'JobTitle', needConvert: true, },
  //       { type: 'select2', optionKey: 'HrPositionList', fieldName: 'HrPositionId', title: 'Position', needConvert: true, },
  //       { type: 'search', title: 'Tìm kiếm ', },
  //     ]
  //   }
  // },
  WPG_STANDARDS:{
    Header: {
      show: true,
      showAddNew: false,
    },
    Table:{
      addExtraColumns: {
        _FirstCol :{ Type: { type: 'link_icon', link: '/wpg-standard/[WPGId]'}, Index: 0, CanShow: true, CanEdit: false, CanSort: false, Header: " ", Width: '30px', }
      },
      canDelete: false,
      showHeader: true,
      tableProps:{
        pagination: true,
      },
      // extraData: {
      //   Columns:{
      //     Id:{ CanEdit: false, CanShow: false, Header: 'Id',},
      //     _FirstCol :{ Type: { type: 'link_icon', link: '/wpg-standard/[Id]'}, Index: 0, CanShow: true, CanEdit: false, CanSort: false, Header: " ", Width: '30px', },
      //     Name:{ CanEdit: true, CanShow: true, Header: 'Name', Width: '100%', Type: {type:'readonly',},},
      //   }
      // },
    },
  },
}

export default PageCustom;
