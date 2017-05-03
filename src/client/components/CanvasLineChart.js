import React from 'react';
import ReactDOM from 'react-dom';

class CanvasLineChart extends React.Component {

  componentDidMount() {

    // Init CreateJS
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    /*eslint-disable */
    this.stage = new createjs.Stage(canvas);
    createjs.Ticker.addEventListener('tick', this.stage);
    createjs.Ticker.setFPS(45);
    /*eslint-enable */

    // Set Properties
    this.canvasWidth = this.stage.canvas.width;
    this.canvasHeight = this.stage.canvas.height;
    this.color = this.props.colorBar || '#1DBEFF';
    this.padding = this.props.hpadding || 1;
    this.animationSpeed = this.props.animationSpeed || 300;
    this.staggerDelay = this.props.staggerDelay || 20;
    this.rotation = this.props.rotation || 0;

    // Draw Chart first time
    if (this.props.data) {
      this.draw(this.props.data);
    }

  }

  componentWillReceiveProps(nextProps) {
    this.hidePreviousChart(nextProps.data);
  }

  hidePreviousChart(data) {

    console.log(data);
    /*eslint-disable */

    /*eslint-enable */
  }

  flipPointVertically(point, rect) {
    point.y = rect.height - point.y;
  }

  draw(data) {

    /*eslint-disable */

    this.group = new createjs.Container();
    this.stage.addChild(this.group);

    // Total of bars
    const _total = data.length;

    var line = new createjs.Shape();
    line.graphics.setStrokeStyle(1);
    line.graphics.beginStroke(this.color);
    line.graphics.moveTo(0, 0);
    line.graphics.lineTo(20, 20);
    line.graphics.endStroke();

    // Add bar to this.stage
    this.group.addChild(line);

    /*eslint-enable */
  }

  render() {
    return (
      <canvas ref='canvas' width={this.props.width} height={this.props.height}></canvas>
    );
  }

}

CanvasLineChart.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  colorBar: React.PropTypes.string,
  animationSpeed: React.PropTypes.number,
  staggerDelay: React.PropTypes.number,
  hpadding: React.PropTypes.number,
  rotation: React.PropTypes.number,
  data: React.PropTypes.arrayOf(React.PropTypes.number)
};

export default CanvasLineChart;

