import React, { Component } from 'react';
import { 
  Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, 
  Card, CardBody, CardFooter, CardHeader, CardTitle, Col, 
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table, } from 'reactstrap';
// import MindMap from 'react-mindmap';

import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';

const map = {
  "title": "learn anything - programming - programming languages - python",
  "nodes": [
    {
      "text": "python",
      "url": "http://www.wikiwand.com/en/Python_(programming_language)",
      "fx": -13.916222252976013,
      "fy": -659.1641376795345,
      "nodes": [
        {
          "text": "",
          "url": "https://www.reddit.com/r/Python/",
          "fx": 176.083777747024,
          "fy": -665.1641376795345,
          "nodes": [],
          "category": "reddit",
          "color": "rgba(255, 189, 10, 1.0)"
        },
        {
          "text": "source",
          "note": "original python implementation in c, compiles python code into byte code and interprets the byte code in a evaluation loop",
          "url": "https://github.com/python/cpython",
          "fx": 176.083777747024,
          "fy": -625.1641376795345,
          "nodes": [],
          "category": "github",
          "color": "rgba(36, 170, 255, 1.0)"
        }
      ],
      "category": "wiki"
    },
    {
      "text": "help",
      "url": "",
      "fx": 154.3247731601375,
      "fy": -429.73700786748157,
      "nodes": [
        {
          "text": "awesome python",
          "url": "https://github.com/vinta/awesome-python",
          "fx": 291.3247731601375,
          "fy": -546.2370078674815,
          "nodes": [],
          "category": "github",
          "color": "rgba(175, 54, 242, 1.0)"
        },
        {
          "text": "awesome asyncio",
          "url": "https://github.com/timofurrer/awesome-asyncio",
          "fx": 291.3247731601375,
          "fy": -506.23700786748157,
          "nodes": [],
          "category": "github",
          "color": "rgba(36, 170, 255, 1.0)"
        },
        {
          "text": "python data model",
          "url": "https://docs.python.org/3/reference/datamodel.html",
          "fx": 291.3247731601375,
          "fy": -466.23700786748157,
          "nodes": [],
          "color": "rgba(255, 189, 10, 1.0)"
        },
        {
          "text": "python testing",
          "url": "http://pythontesting.net/framework/pytest/pytest-introduction/",
          "fx": 291.3247731601375,
          "fy": -432.23700786748157,
          "nodes": [],
          "category": "free book",
          "color": "rgba(34, 205, 224, 1.0)"
        },
        {
          "text": "scientific python cheat sheet",
          "url": "https://ipgp.github.io/scientific_python_cheat_sheet/",
          "fx": 291.3247731601375,
          "fy": -392.23700786748157,
          "nodes": [],
          "color": "rgba(209, 21, 88, 1.0)"
        },
        {
          "text": "structuring your project",
          "url": "http://python-guide-pt-br.readthedocs.io/en/latest/writing/structure/",
          "fx": 291.3247731601375,
          "fy": -358.23700786748157,
          "nodes": [],
          "color": "rgba(49, 187, 71, 1.0)"
        },
        {
          "text": "style guide for python code",
          "url": "https://www.python.org/dev/peps/pep-0008/",
          "fx": 291.3247731601375,
          "fy": -324.23700786748157,
          "nodes": [],
          "color": "rgba(175, 54, 242, 1.0)"
        },
        {
          "text": "cpython internals  ️",
          "url": "http://pgbovine.net/cpython-internals.htm",
          "fx": 291.3247731601375,
          "fy": -290.23700786748157,
          "nodes": [],
          "category": "article",
          "color": "rgba(36, 170, 255, 1.0)"
        }
      ]
    },
    {
      "text": "articles",
      "url": "",
      "fx": 455.7839253819375,
      "fy": -183.5539283546699,
      "nodes": [
        {
          "text": "16: the history behind the decision to move python to github  ️",
          "url": "https://snarky.ca/the-history-behind-the-decision-to-move-python-to-github/",
          "fx": 617.7839253819375,
          "fy": -245.0539283546699,
          "nodes": [],
          "category": "article",
          "color": "rgba(175, 54, 242, 1.0)"
        },
        {
          "text": "15: a modern python development toolchain  ️",
          "url": "http://www.chriskrycho.com/2015/a-modern-python-development-toolchain.html",
          "fx": 617.7839253819375,
          "fy": -183.0539283546699,
          "nodes": [],
          "category": "article",
          "color": "rgba(36, 170, 255, 1.0)"
        },
        {
          "text": "17: python's instance, class, and static methods demystified  ️",
          "url": "https://realpython.com/blog/python/instance-class-and-static-methods-demystified/",
          "fx": 617.7839253819375,
          "fy": -121.05392835466989,
          "nodes": [],
          "category": "article",
          "color": "rgba(255, 189, 10, 1.0)"
        }
      ]
    },
    {
      "text": "basics",
      "note": "",
      "url": "",
      "fx": -98.5231997717085,
      "fy": -60.07462866512333,
      "nodes": [
        {
          "text": "1. the python tutorial",
          "url": "https://docs.python.org/3/tutorial/",
          "fx": 83.4768002282915,
          "fy": -96.57462866512333,
          "nodes": [],
          "color": "rgba(255, 189, 10, 1.0)"
        },
        {
          "text": "1. dive into python 3",
          "url": "http://www.diveintopython3.net",
          "fx": 83.4768002282915,
          "fy": -62.57462866512333,
          "nodes": [],
          "category": "free book",
          "color": "rgba(175, 54, 242, 1.0)"
        },
        {
          "text": "1. automate the boring stuff with python",
          "url": "https://automatetheboringstuff.com/",
          "fx": 83.4768002282915,
          "fy": -22.574628665123328,
          "nodes": [],
          "category": "free book",
          "color": "rgba(36, 170, 255, 1.0)"
        }
      ]
    },
    {
      "text": "package manager",
      "url": "http://www.wikiwand.com/en/Package_manager",
      "fx": -346.2056231217888,
      "fy": 39.035120728630204,
      "nodes": [],
      "category": "wiki"
    },
    {
      "text": "python libraries  ️",
      "fx": -78.69331502906573,
      "fy": 100.14771605920942,
      "nodes": [],
      "category": "mindmap"
    },
    {
      "text": "pip",
      "url": "https://pypi.python.org/pypi/pip",
      "fx": -317.77054724755226,
      "fy": 153.56934975958518,
      "nodes": []
    }
  ],
  "connections": [
    {
      "source": "python",
      "target": "basics",
      "curve": {
        "x": -43.5535,
        "y": 299.545
      }
    },
    {
      "source": "help",
      "target": "python",
      "curve": {
        "x": -78.1206,
        "y": -114.714
      }
    },
    {
      "source": "basics",
      "target": "python libraries  ️",
      "curve": {
        "x": 29.6649,
        "y": 80.1111
      }
    },
    {
      "source": "basics",
      "target": "package manager",
      "curve": {
        "x": -103.841,
        "y": 49.5548
      }
    },
    {
      "source": "package manager",
      "target": "pip",
      "curve": {
        "x": -19.7824,
        "y": 57.2671
      }
    },
    {
      "source": "articles",
      "target": "help",
      "curve": {
        "x": -238.287,
        "y": -54.4818
      }
    }
  ]
}

const model = {
  nodeDataArray: [
      { key: 'Alpha', color: 'lightblue' },
      { key: 'Beta', color: 'orange' },
      { key: 'Gamma', color: 'lightgreen' },
      { key: 'Delta', color: 'pink' },
      { key: 'Omega', color: 'grey' }
  ],
  linkDataArray: [
      { from: 'Alpha', to: 'Beta' },
      { from: 'Alpha', to: 'Gamma' },
      { from: 'Beta', to: 'Delta' },
      { from: 'Gamma', to: 'Omega' }
  ]
};

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  createDiagram=(diagramId) =>{
    const $ = go.GraphObject.make;

    const myDiagram = $(go.Diagram, diagramId, {
        initialContentAlignment: go.Spot.LeftCenter,
        layout: $(go.TreeLayout, {
            angle: 0,
            arrangement: go.TreeLayout.ArrangementVertical,
            treeStyle: go.TreeLayout.StyleLayered
        }),
        isReadOnly: false,
        allowHorizontalScroll: true,
        allowVerticalScroll: true,
        allowZoom: false,
        allowSelect: true,
        autoScale: Diagram.Uniform,
        contentAlignment: go.Spot.LeftCenter
    });

    myDiagram.toolManager.panningTool.isEnabled = false;
    myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

    myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        {
            selectionChanged: node => this.nodeSelectionHandler(node.key, node.isSelected)
        },
        $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, new go.Binding('fill', 'color')),
        $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'key'))
    );

    return myDiagram;
}

modelChangeHandler=(event)=>{
    switch (event.eventType) {
        case ModelChangeEventType.Remove:
            if (event.nodeData) {
                this.removeNode(event.nodeData.key);
            }
            if (event.linkData) {
                this.removeLink(event.linkData);
            }
            break;
        default:
            break;
    }
}

addNode=()=> {
    const newNodeId = 'node' + this.nodeId;
    const linksToAdd = this.state.selectedNodeKeys.map(parent => {
        return { from: parent, to: newNodeId };
    });
    this.setState({
        ...this.state,
        model: {
            ...this.state.model,
            nodeDataArray: [...this.state.model.nodeDataArray, { key: newNodeId, color: getRandomColor() }],
            linkDataArray:
                linksToAdd.length > 0
                    ? [...this.state.model.linkDataArray].concat(linksToAdd)
                    : [...this.state.model.linkDataArray]
        }
    });
    this.nodeId += 1;
}

removeNode=(nodeKey)=> {
    const nodeToRemoveIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
    if (nodeToRemoveIndex === -1) {
        return;
    }
    this.setState({
        ...this.state,
        model: {
            ...this.state.model,
            nodeDataArray: [
                ...this.state.model.nodeDataArray.slice(0, nodeToRemoveIndex),
                ...this.state.model.nodeDataArray.slice(nodeToRemoveIndex + 1)
            ]
        }
    });
}

removeLink=(linKToRemove)=> {
    const linkToRemoveIndex = this.state.model.linkDataArray.findIndex(
        link => link.from === linKToRemove.from && link.to === linKToRemove.to
    );
    if (linkToRemoveIndex === -1) {
        return;
    }
    return {
        ...this.state,
        model: {
            ...this.state.model,
            linkDataArray: [
                ...this.state.model.linkDataArray.slice(0, linkToRemoveIndex),
                ...this.state.model.linkDataArray.slice(linkToRemoveIndex + 1)
            ]
        }
    };
}

nodeSelectionHandler=(nodeKey, isSelected)=> {
    if (isSelected) {
        this.setState({
            ...this.state,
            selectedNodeKeys: [...this.state.selectedNodeKeys, nodeKey]
        });
    } else {
        const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(key => key === nodeKey);
        if (nodeIndexToRemove === -1) {
            return;
        }
        this.setState({
            ...this.state,
            selectedNodeKeys: [
                ...this.state.selectedNodeKeys.slice(0, nodeIndexToRemove),
                ...this.state.selectedNodeKeys.slice(nodeIndexToRemove + 1)
            ]
        });
    }
}

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Mindmap</CardHeader>
              <CardBody>
                {/* <MindMap
                  nodes={map.nodes}
                  connections={map.connections}
                /> */}
                <GojsDiagram
                  key="gojsDiagram"
                  diagramId="myDiagramDiv"
                  model={model}
                  createDiagram={this.createDiagram}
                  className="myDiagram"
                  onModelChange={this.modelChangeHandler}
                />
              </CardBody>
              <CardFooter>
                
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Page;
