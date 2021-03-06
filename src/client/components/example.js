/*********************************************************************
 * CANVAS CHART component
 * A React component to display a chart based on percentage (0-100).
 * Built in CreateJS (EaselJS+TweenJS)
 */
var CanvasChart = React.createClass({

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    colorBar: React.PropTypes.string,
    animationSpeed: React.PropTypes.number,
    staggerDelay: React.PropTypes.number,
    hpadding: React.PropTypes.number,
    rotation: React.PropTypes.number,
    data: React.PropTypes.arrayOf(React.PropTypes.number)
  },

  componentDidMount: function () {
    // Init CreateJS
    var canvas = React.findDOMNode(this.refs.canvas)
    this.stage = new createjs.Stage(canvas);
    createjs.Ticker.addEventListener('tick', this.stage);
    createjs.Ticker.setFPS(45);


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

  },

  /**
   * New Properties are received.
   * Remove previous Chart and draw a new one
   * @param nextProps
   */
  componentWillReceiveProps: function (nextProps) {
    this.hidePreviousChart(nextProps.data);
  },

  /**
   * Hide Current Chart with animations
   */
  hidePreviousChart: function (data) {

    // Remove previous tween applied to the chart
    createjs.Tween.removeTweens(this.group);

    var _grp = this.group;
    var _total = _grp.getNumChildren();

    // Remove previous chart
    for (var i = 0; i < _total; i++) {

      // Get a single bar reference and remove previous tweens
      var _bar = _grp.getChildAt(i);
      createjs.Tween.removeTweens(_bar);

      // Hide a Bar
      createjs.Tween.get(_bar)
        .wait(i * this.staggerDelay)
        .to({
          y: this.canvasHeight,
          scaleX: 3,
          rotation: this.rotation
        }, this.animationSpeed, createjs.Ease.cubicInOut)
        .call(function(bar) {
          _grp.removeChild(bar)
        }.bind(this),[_bar]);
    }

    // Draw next chart after previous animation
    var totalTime = this.animationSpeed + (_total * this.staggerDelay);
    createjs.Tween.get(_grp)
      .wait(totalTime)
      .call(this.draw,[data]);

  },

  /**
   * Draw a new chart
   * @param data
   */
  draw: function (data) {

    this.group = new createjs.Container();
    this.stage.addChild(this.group);

    // Total of bars
    var _total = data.length;

    // Bar width
    var _barWidth = (this.canvasWidth / _total) - this.padding;

    // Create and display bars
    for (var i = 0; i < _total; i++) {

      var _barHeight = this.canvasHeight * (data[i] / 100);

      // Draw a Rectangle
      var bar = new createjs.Graphics();
      bar.beginFill(this.color);
      bar.drawRect(0, 0, _barWidth, _barHeight);

      // Show the Bar and set the position (x,y)
      var barShape = new createjs.Shape(bar);
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
  },


  /**
   * Render Function
   * @returns {XML}
   */
  render: function () {
    return (
      <canvas ref="canvas"
              width={this.props.width}
              height={this.props.height}></canvas>
    );
  }


});


/**
 * App (main component)
 * Render two <CanvasChart> components and generate random data
 */
var App = React.createClass({
  // Initial state
  getInitialState: function () {
    return {chartData: []};
  },
  // Component Mount (init)
  componentDidMount: function () {
    this.updateData(10, 15, 30, 100);
  },
  // Generate random data
  updateData(minBars, maxBars, minValue, maxValue) {
    var elements = [];
    // Random Total of Bars
    var totalBars = this.random(minBars, maxBars);
    for (var i = 0; i < totalBars; i++) {
      elements.push(this.random(minValue, maxValue)); // Random Value
    }
    this.setState({
      chartData: elements
    })
  },
  // Random between numbers
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  // render func
  render: function () {

    return <div>

      <CanvasChart width={150} height={70}
                   data={this.state.chartData}></CanvasChart>

      <CanvasChart colorBar="#FFC67F"
                   width={500}
                   height={300}
                   animationSpeed={300}
                   staggerDelay={100}
                   hpadding={4}
                   rotation={90}
                   data={this.state.chartData}></CanvasChart>

      <hr/>
      <button className="btn btn-info"
              onClick={this.updateData.bind(this, 10, 50, 10, 100)}>
        Generate new data</button>
    </div>

  }
});

React.render(<App/>, document.getElementById('container'));

