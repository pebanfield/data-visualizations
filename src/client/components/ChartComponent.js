import CanvasChart from './CanvasChart.js';
import React from 'react';

class ChartComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      chartData: [10, 15, 30, 100]
    };
  }
  // Component Mount (init)
  componentDidMount() {
    this.updateData(10, 15, 30, 100);
  }
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
  }
  // Random between numbers
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // render func
  render() {

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
}

export default ChartComponent;
