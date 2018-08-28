import React, { Component } from 'react';
import GridRow from "./GridRow";
import GridCol from "./GridCol";

// type Props = {|
//   +children: React.Node,
// |};

// function Grid(props: Props): React.Node {
//   return props.children;
// }

class Grid extends Component {
  render() {
    return this.props.children;
  }
}
Grid.displayName = "Grid";

Grid.Row = GridRow;
Grid.Col = GridCol;
/** @component */
export default Grid;
