import React, { Component } from 'react';

import { Button, Popover, Tooltip } from '../core';
const test = () => {
  alert('test'); // eslint-disable-line no-alert
};

const onOk = (cb) => {
  cb();
};
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  componentDidMount(){
  }

  render() {
    const overlay = (<div>
      <div className="demoContent">
        <span>Nội dung！</span>
      </div>
    </div>);
    return (
      <div className="animated">
        Demo MReact!
        <div>
          <Button type="primary" onClick={()=>{console.log('onClick primary')}}>primary</Button>&nbsp;
          <Button type="secondary">secondary</Button>&nbsp;
          <Button type="outline">outline</Button>
          <Button loading type="primary"/>
          <Button loading type="outline">outline</Button>
        </div>
        <div>
          <div style={{ marginLeft: '30px', marginTop: '10px' }}>
            <div style={{ marginLeft: '60px' }}>
              <Popover placement="topLeft" title={'Top Left'} overlay={overlay}>
                <Button>TL</Button>
              </Popover>
              <Popover placement="top" title={'Top'} overlay={overlay} trigger="click">
                <Button style={{marginLeft:'10px'}}>Top</Button>
              </Popover>
              <Popover placement="topRight" title={'Top Right'} overlay={overlay} trigger="click" showButton onOk={()=>{console.log('OK')}} onCancel={()=>{console.log('Cancel')}}>
                <Button style={{marginLeft:'10px'}}>TR</Button>
              </Popover>
            </div>
          </div>
        </div>
        <div>
          <div style={{ marginLeft: '30px', marginTop: '10px' }}>
            <div style={{ marginLeft: '60px' }}>
              <Tooltip placement="topLeft" overlay={overlay}>
                <Button>TL</Button>
              </Tooltip>
              <Tooltip placement="top" overlay={overlay} trigger="click">
                <Button style={{marginLeft:'10px'}}>Top</Button>
              </Tooltip>
              <Tooltip placement="topRight" overlay={overlay} trigger="click">
                <Button style={{marginLeft:'10px'}}>TR</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Demo;
