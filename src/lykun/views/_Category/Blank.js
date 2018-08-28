import React, { Component } from 'react';
import {
  Row,Col,
  Card,CardHeader,CardBody,CardFooter,CardTitle,
  Button,
} from 'reactstrap';

import * as H from '../../helpers';

class Page extends Component {
  constructor(props) {
    super(props);
    const {match} = props;
    console.log('props:',props);
    this.state = { 
    };
  }

  componentDidMount(){
  }

  render() {
    return (
      <div className="animated">
        Blank!!!
      </div>
    )
  }
}

export default Page;
