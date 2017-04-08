import React from 'react';
import { render } from 'react-dom';
//https://github.com/CreateJS/EaselJS/issues/713
import 'script-loader!CreateJS/builds/createjs-2015.11.26.combined.js';
import './index.scss';
import Sample from './components/Sample.js';
import CanvasChart from './components/CanvasChart.js';

export default class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      chartData: [10, 15, 30, 100]
    };
  }
  // Component Mount (init)
  componentDidMount() {
    console.log("component mount app.jsx");
    //this.updateData(10, 15, 30, 100);
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
  render() {
    const myFunc = function test(){};
    return (
      <div>
        <Sample func={myFunc}/>
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
    )
  }
}