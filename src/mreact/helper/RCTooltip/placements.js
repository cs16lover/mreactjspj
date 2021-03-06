'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

var targetOffset = [0, 0];

var placements = {
  left: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflow,
    offset: [-3, 0],
    targetOffset: targetOffset
  },
  right: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflow,
    offset: [3, 0],
    targetOffset: targetOffset
  },
  top: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset: targetOffset
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset: targetOffset
  },
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset: targetOffset
  },
  leftTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [-3, 0],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset: targetOffset
  },
  rightTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [3, 0],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset: targetOffset
  },
  rightBottom: {
    points: ['bl', 'br'],
    overflow: autoAdjustOverflow,
    offset: [3, 0],
    targetOffset: targetOffset
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset: targetOffset
  },
  leftBottom: {
    points: ['br', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [-3, 0],
    targetOffset: targetOffset
  }
};

exports.placements = placements;
exports['default'] = placements;