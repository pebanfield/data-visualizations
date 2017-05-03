import React from 'react';
import ReactDOM from 'react-dom';

class CanvasBarChart extends React.Component {

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

  /**
   * New Properties are received.
   * Remove previous Chart and draw a new one
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.hidePreviousChart(nextProps.data);
  }

  hidePreviousChart(data) {

    /*eslint-disable */
    // Remove previous tween applied to the chart
    createjs.Tween.removeTweens(this.group);

    const _grp = this.group;
    const _total = _grp.getNumChildren();

    // Remove previous chart
    for (let i = 0; i < _total; i++) {

      // Get a single bar reference and remove previous tweens
      const _bar = _grp.getChildAt(i);
      createjs.Tween.removeTweens(_bar);

      // Hide a Bar
      createjs.Tween.get(_bar)
        .wait(i * this.staggerDelay)
        .to({
          y: this.canvasHeight,
          scaleX: 3,
          rotation: this.rotation
        }, this.animationSpeed, createjs.Ease.cubicInOut)
        .call((bar) => {
          _grp.removeChild(bar);
        }, [_bar]);
    }

    // Draw next chart after previous animation
    const totalTime = this.animationSpeed + (_total * this.staggerDelay);
    createjs.Tween.get(_grp)
      .wait(totalTime)
      .call(() => this.draw(data));

    /*eslint-enable */
  }

  draw(data) {

    /*eslint-disable */

    this.group = new createjs.Container();
    this.stage.addChild(this.group);

    // Total of bars
    const _total = data.length;

    // Bar width
    const _barWidth = (this.canvasWidth / _total) - this.padding;

    // Create and display bars
    for (let i = 0; i < _total; i++) {

      const _barHeight = this.canvasHeight * (data[i] / 100);

      // Draw a Rectangle
      const bar = new createjs.Graphics();
      bar.beginFill(this.color);
      bar.drawRect(0, 0, _barWidth, _barHeight);

      // Show the Bar and set the position (x,y)
      const barShape = new createjs.Shape(bar);
      barShape.x = (_barWidth + this.padding) * i;
      barShape.y = this.canvasHeight + _barHeight;
      barShape.rotation = this.rotation;

      // Add bar to this.stage
      this.group.addChild(barShape);

      // Show and animate the bar (with delay)
      createjs.Tween.get(barShape)
        .wait(i * this.staggerDelay)
        .to({
          y: this.canvasHeight - _barHeight,
          rotation: 0
        }, 1000, createjs.Ease.cubicInOut);
    }

    /*eslint-enable */
  }

  render() {
    return (
      <canvas ref='canvas' width={this.props.width} height={this.props.height}></canvas>
    );
  }

}

CanvasBarChart.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  colorBar: React.PropTypes.string,
  animationSpeed: React.PropTypes.number,
  staggerDelay: React.PropTypes.number,
  hpadding: React.PropTypes.number,
  rotation: React.PropTypes.number,
  data: React.PropTypes.arrayOf(React.PropTypes.number)
};

export default CanvasBarChart;
