import React, { Component } from 'react';
import {
  Badge,
  Row,Col,
  Progress,
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Button,ButtonToolbar,ButtonGroup,ButtonDropdown,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class CTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  componentDidMount(){

  }

  handleFilterData=(obj)=>{
    if(this._cTable!=null){
      this._cTable.handleFilterData(obj);
    }
  }
  handleSearch=(obj)=>{
    if(this._cTable!=null){
      this._cTable.handleSearch(obj);
    }
  }
  handleExportCSV=()=>{
    if(this._cTable!=null){
      this._cTable.handleExportCSV();
    }
  }
  
  getTableDataIgnorePaging=()=>{
    if(this._cTable!=null){
      return this._cTable.getTableDataIgnorePaging();
    }
  }

  _renderCol=(col,i)=>{
    const {colsHidden,colsRemove} = this.props;
    let _defaultCol = {
      width:'100px',
      dataField: '',
      dataAlign: 'left',
      isKey:false,
      hidden:false,
      dataSort:true,
      header: '',
      dataFormat: (cell,row,e,r)=>{return cell},
      columnClassName: 'pR',
    }
    _defaultCol = Object.assign(_defaultCol,col);
    var {width,isKey,hidden,dataField,filter,dataAlign,dataSort,header,dataFormat,columnClassName} = _defaultCol;

    var moreProps = {
    };
    if(col.colProps!=null){
      moreProps = Object.assign(moreProps,col.colProps);
    }
    let _header = header;
    if(moreProps.componentHeader!=null){
      _header = moreProps.componentHeader(header,dataField);
    }
    if(colsHidden && colsHidden.indexOf(dataField)>-1){
      hidden = true;
    }
    if(colsRemove && colsRemove.indexOf(dataField)>-1){
      return <TableHeaderColumn key={i} hidden/>
    }
    return (
      <TableHeaderColumn 
        key={i}
        columnClassName={columnClassName}
        width={width} 
        isKey={isKey}
        hidden={hidden} 
        editable={ false } 
        dataField={dataField}
        dataAlign={dataAlign}
        filter={filter}
        formatExtraData={{fieldName:dataField}}
        dataFormat={dataFormat}
        expandable={false}
        dataSort={dataSort}
        {...moreProps}>
        { _header }
      </TableHeaderColumn>
    )
  }
  _renderTable=()=>{
    const {data,cols,hideHeader,tableProps,optionsTable}=this.props;
    const {className} = this.props;
    let _className = "s_table table-cell-full";
    if(hideHeader==true){
      _className+= ' s_table_hideheader';
    }
    if(className!=null && className.length>0){
      _className += ` ${className}`;
    }

    let _optionsTable = {
      sortIndicator: true,
      hideSizePerPage: false,
      sizePerPage: 100,
      // hidePageListOnlyOnePage: true,
      paginationShowsTotal: true,
      withFirstAndLast: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
    }
    if(optionsTable!=null){
      _optionsTable = Object.assign(_optionsTable,optionsTable);
    }

    let _uiCols = [];
    if(cols!=null && cols.length>0){
      for(let i=0;i<cols.length;i++){
        _uiCols.push(
          this._renderCol(cols[i],i)
        )
      }
    }
    else{
      return (
        <div>Table not config!</div>
      )
    }

    var moreProps = {
    };
    moreProps = Object.assign(moreProps,tableProps);

    return (
      <BootstrapTable 
        className={_className} 
        ref={r=>{this._cTable=r;}} 
        data={data} version="4" striped={false} pagination search={false} 
        options={_optionsTable} 
        insertRow={ false }
        {...moreProps}>
        {
          _uiCols
        }
      </BootstrapTable>
    )
  }
  render() {
    // console.log('render MyTable');
    return (
      <div>
        {this._renderTable()}
      </div>
    )
  }
}
export default CTable;