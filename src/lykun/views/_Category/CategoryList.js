import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {
  Row,Col, Badge,
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Button, Table,
} from 'reactstrap';

import * as H from '../../helpers';
import Category from './Category';
import Detail from './Detail';

import PageCustom from './PageCustom';
import PageOveride from './PageOveride';
import PageConfig from './PageConfig';

// import ConfigBriefReportDetail from './ConfigBriefReport/Detail';
// import ConfigHRDiragram from './ConfigHRDiagram/Detail';
import Blank from './Blank';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      isAddNew: false,
      options: {},
      error: null,
    };

    this._title = 'Category List';
    this._screenCode = this.props.screenCode||'CATEGORY_LIST';

    this._categoryList = [];
    try{
      let _localCategory = localStorage.getItem('CATEGORY_LIST');
      if(_localCategory){
        let _arrCategory = JSON.parse(_localCategory);
        if(_arrCategory){
          let _newArr = _arrCategory.map((e,i)=>{
            return {
              path: e.UIUrl,
              controller: e.APIName,
              name: e.Title,
              screenCode: e.ScreenCode,
            }
          });
          this._categoryList = this._categoryList.concat(_newArr);
          console.log('this._categoryList :',this._categoryList);
        }
      }
    }catch(error){
      console.warn('error build local category:',error);
    }
    this._projectLinks = [
      { path: '/project-search', name: 'Project Search', screenCode: 'PROJECT_SEARCH', },
      { path: '/plan_week_report', name: 'Planweek Report', screenCode: 'PLANWEEK_REPORT', },
      { path: '/project/charter/TEST_COPY_FILE', name: 'Charter', screenCode: 'WI_GM_CHARTER', },
      { path: '/project/stakeholder/TEST_COPY_FILE', name: 'Stakeholder', screenCode: 'STAKE_HOLDER', },
      { path: '/project/charter-info/TEST_COPY_FILE', name: 'Charter Info', screenCode: 'CHARTER_INFO', },
    ];
  }

  componentDidMount(){
  }

  _renderList=(list)=>{
    let _ui = [];
    if(list){
      _ui = list.map((e,i)=>{
        return (
          <tr key={i}>
            <td>
              {e.screenCode}
            </td>
            <td>
              {e.path}
            </td>
            <td>
              <Badge color="success" pill>
                <NavLink style={{color:'white'}} to={e.path} target={'_self'}>
                  {e.name}
                </NavLink>
              </Badge>
            </td>
          </tr>
        )
      });
    }
    return (
      <Table responsive striped bordered>
        <thead>
        <tr>
          <th>Screen Code</th>
          <th>Path</th>
          <th>Link</th>
        </tr>
        </thead>
        <tbody>
          { _ui }
        </tbody>
      </Table>
    )
  }
  
  render() {
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <strong>Category List</strong>
          </CardHeader>
          <CardBody style={{padding:'10px'}}>
          {
            this._renderList(this._categoryList)
          }
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Project Link</strong>
          </CardHeader>
          <CardBody style={{padding:'10px'}}>
          {
            this._renderList(this._projectLinks)
          }
          </CardBody>
        </Card>
      </div>
    )
  }
}

Page.Helper = {
  getConfig({screenCode,type}){
    let _config;
    if(screenCode && type){
      if(PageCustom && PageCustom[screenCode] && PageCustom[screenCode][type]){
        return PageCustom[screenCode][type];
      }
      else if(PageOveride && PageOveride[screenCode] && PageOveride[screenCode][type]){
        return PageOveride[screenCode][type];
      }
    }
    return _config;
  },
  getConfigAll({screenCode,configString}){
    let _configDefault = {};
    if(configString){
      try {
        _configDefault = JSON.parse(configString);
      } catch (error) {
        console.warn('Cant parse json configString:',error,configString);
      }
    }
    
    if(screenCode){
      if(PageCustom && PageCustom[screenCode]){
        return PageCustom[screenCode];
      }
      else if(PageOveride && PageOveride[screenCode]){
        let _configOveride = PageOveride[screenCode];
        let _keys = Object.keys(_configOveride);
        for(let _k of _keys){
          if(_configDefault[_k]){
            _configDefault[_k] = Object.assign(_configDefault[_k],_configOveride[_k]);
          }
          else{
            _configDefault[_k] = _configOveride[_k];
          }
          console.log('configall:',_keys,_configDefault,_configOveride);
        }
      }
    }
    return _configDefault;
  },
  getRoutes(){
    return [
      {
        path:'/department/:id',name:'Department Detail',component: Detail,
        screenCode:'SC_Department_Detail', config: PageConfig['Deparment'],
      },
      {
        path:'/department',name:'Department',component: Category,
        screenCode:'SC_Department', config: PageConfig['Deparment'],
      },
      {
        path:'/job-title/:id',name:'JobTitle Detail',component: Detail,
        screenCode:'SC_JobTitle_Detail', config: PageConfig['JobTitle'],
      },
      {
        path:'/job-title',name:'JobTitle',component: Category,
        screenCode:'SC_JobTitle', config: PageConfig['JobTitle'],
      },
      {
        path:'/blank',name:'Blank',component: Blank,
        screenCode:'SC_Blank', config: {c:'config'},
      },
    ];

    let _CategoryList = [
      // {path:'/project-search',screenCode:'PROJECT_SEARCH',name:'Project Search',controller:'ProjectSearch',more:{
      // }},
      // {path:'/project/charter/:projectId',screenCode:'WI_GM_CHARTER',name:'Charter',controller:'ProjectCharter',more:{
      // }},
      // {path:'/plan_week_report',screenCode:'PLANWEEK_REPORT',name:'Planweek Report',controller:'PlanWeekReportDetail',more:{
      // }},
      // {path:'/project/stakeholder/:projectId',screenCode:'STAKE_HOLDER',name:'Stakeholder',controller:'ProjectSTKH',more:{
      // }},
      // {path:'/project/charter-info/:projectId',screenCode:'CHARTER_INFO',name:'Charter Info',controller:'ProjectCharterInfo',more:{
      // }},

      // {path:'/config-brieft-report/:id',name:'Config Brief Report Detail',component: ConfigBriefReportDetail},
      // {path:'/config-hr-diagram/:id',screenCode:'CONFIG_HR_DIAGRAM_DETAIL',name:'Config HR Diagram Detail',component: ConfigHRDiragram},
      // {path:'/config-hr-diagram',screenCode:'CONFIG_HR_DIAGRAM',name:'Config HR Diagram',controller: 'ConfigHRDiagramChart'},

      {path:'/project-search',screenCode:'PROJECT_SEARCH',name:'Project Search',controller:'ProjectSearch',more:{
      }},
    ];

    try{
      let _localCategory = localStorage.getItem('CATEGORY_LIST');
      if(_localCategory){
        let _arrCategory = JSON.parse(_localCategory);
        if(_arrCategory){
          let _newArr = _arrCategory.map((e,i)=>{
            return {
              path: e.UIUrl,
              controller: e.APIName,
              name: e.Title||e.ScreenCode,
              screenCode: e.ScreenCode,
              config: e.Config,
              // filterConfig: e.FilterConfig,
              // tableConfig: e.TableConfig,
              // addNewConfig: e.AddNewConfig,
              // headerConfig: e.HeaderConfig,
              // pageConfig: e.PageConfig,
            }
          });
          _CategoryList = _CategoryList.concat(_newArr);
          console.log('_CategoryList:',_CategoryList);
        }
      }
    }catch(error){
      console.warn('error build local category:',error);
    }

    let _categoryRoutes = [];
    for(let _c of _CategoryList){
      if(_c.component){
        let _component = (props)=>{
          console.log('props category with component:',props);
          return <_c.component {...props} />
        }
        let _item = { 
          path: _c.path, 
          name: _c.name,
          component: _component,
        };
        _categoryRoutes.push(_item);
        continue;
      }
      let _component = (props)=>{
        let moreProps= _c.more||{};
        // console.log('props category:',props);
        return <Category title={_c.name} screenCode={_c.screenCode} controller={_c.controller} 
          config={Page.Helper.getConfigAll({screenCode:_c.screenCode,configString:_c.config})}
          // tableConfig={Page.Helper.getConfig({screenCode:_c.screenCode,type:'TableConfig'})}
          // pageConfig={Page.Helper.getConfig({screenCode:_c.screenCode,type:'PageConfig'})}
          // headerConfig={Page.Helper.getConfig({screenCode:_c.screenCode,type:'HeaderConfig'})}
          // addNewConfig={Page.Helper.getConfig({screenCode:_c.screenCode,type:'AddNewConfig'})}
          // filterConfig={Page.Helper.getConfig({screenCode:_c.screenCode,type:'Filter'})}
          {...moreProps} {...props}/>;
      };
      let _item = { 
        path: _c.path, 
        name: _c.name,
        component: _component,
      };
      _categoryRoutes.push(_item);
    }
    return _categoryRoutes;
  },
}

export default Page;
