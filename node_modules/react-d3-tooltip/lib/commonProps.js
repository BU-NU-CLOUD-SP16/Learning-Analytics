"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pieProps = undefined;

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = 960;
var height = 500;
var margins = { top: 80, right: 100, bottom: 80, left: 100 };

exports.default = {
  width: width,
  height: height,
  margins: margins,
  y: function y(d) {
    return +d;
  },
  xScale: 'linear',
  yScale: 'linear',
  focus: true,
  showXGrid: true,
  showYGrid: true
};
var pieProps = exports.pieProps = {
  width: width,
  height: height,
  margins: margins,
  innerRadius: 0,
  categoricalColors: _d2.default.scale.category10(),
  pieSort: _d2.default.descending
};