import React from 'react';
import { render } from 'react-dom';
// https://github.com/CreateJS/EaselJS/issues/713
import 'script-loader!CreateJS/builds/createjs-2015.11.26.combined.js';
import './index.scss';
// import Sample from './components/Sample.js';
import CanvasLineChart from './components/CanvasLineChart.js';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';
import Label from 'grommet/components/Label';
import Legend from 'grommet/components/Legend';

export default class Main extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      chartData: [{x: 5, y: 10}, {x: 5, y: 20}, {x: 20, y: 50}, {x: 30, y: 40}]
    };
  }
  // Component Mount (init)
  componentDidMount() {
    // this.updateData(10, 15, 30, 100);
  }
  // Generate random data
  updateData(minBars, maxBars, minValue, maxValue) {
    const elements = [];
    // Random Total of Bars
    const totalBars = this.random(minBars, maxBars);
    for (let i = 0; i < totalBars; i++) {
      elements.push(this.random(minValue, maxValue)); // Random Value
    }
    this.setState({
      chartData: elements
    });
  }
  // Random between numbers
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  render() {
    // const myFunc = function test() {};
    // <Sample func={myFunc}/>
    /**

     <button className='btn btn-info'
     onClick={(minBars, maxBars, minValue, maxValue) => this.updateData(10, 50, 10, 100)}>
     Generate new data</button>

     <Distribution series={[{"label": "First", "value": 40, "colorIndex": "graph-1"}, {"label": "Second", "value": 30, "colorIndex": "accent-2"}, {"label": "Third", "value": 20, "colorIndex": "unset"}, {"label": "Fourth", "value": 10, "colorIndex": "graph-1"}]}
     size='xsmall'
     units='%' />

     <CanvasChart width={150} height={70}
     data={this.state.chartData}/>

     **/

    function clickHandler(evt) {};
    let series =
      [{"label": "Gen 7", "value": 50, "onClick": clickHandler, "colorIndex": "graph-1"},
        {"label": "Gen 8", "value": 1, "onClick": clickHandler, "colorIndex": "graph-2"},
        {"label": "Gen 9", "value": 19, "onClick": clickHandler, "colorIndex": "graph-3"},
        {"label": "Gen 10", "value": 30, "onClick": clickHandler, "colorIndex": "graph-4"}];

    return (
      <App centered={true}>
        <Header>Charting</Header>
        <Split>
          <Box justify='center'
               align='center'
               pad='small'>
            <CanvasLineChart colorBar='#FFC67F'
                         width={500}
                         height={300}
                         animationSpeed={300}
                         staggerDelay={100}
                         hpadding={4}
                         rotation={90}
                         data={this.state.chartData}/>
          </Box>
          <Box justify='center'
               align='center'
               pad='small'>
            <Sidebar size='small'>
                  <Box direction='row'
                       justify='between'
                       align='center'
                       pad={{between: 'small'}}
                       announce={true}
                       responsive={true}>
                    <Value value={100}
                           units='GB'
                           align='start' />
                    <span>
                    Total
                  </span>
                  </Box>
                  <Meter threshold={90}
                         series={series}
                         max={100}/>
                  <Box direction='row'
                       justify='between'
                       pad={{between: 'small'}}
                       responsive={false}>
                    <Label size='small'>
                      0 GB
                    </Label>
                    <Label size='small'>
                      100 GB
                    </Label>
                  </Box>
                  <Legend series={series}
                          total={false}
                          units='B' />
            </Sidebar>
          </Box>
        </Split>
      </App>
    );
  }
}
