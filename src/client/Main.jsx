import React, { Component, PropTypes } from 'react';
// https://github.com/CreateJS/EaselJS/issues/713
import 'script-loader!CreateJS/builds/createjs-2015.11.26.combined.js';
import './index.scss';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from './actions';
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
import Picker from './components/Picker';
import Posts from './components/Posts';

class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.state = {
      chartData: [{x: 5, y: 10}, {x: 5, y: 20}, {x: 20, y: 50}, {x: 30, y: 40}]
    };
  }
  // Component Mount (init)
  componentDidMount() {
    // this.updateData(10, 15, 30, 100);
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
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
      [{label: 'Gen 7', value: 50, onClick: clickHandler, colorIndex: 'graph-1'},
        {label: 'Gen 8', value: 1, onClick: clickHandler, colorIndex: 'graph-2'},
        {label: 'Gen 9', value: 19, onClick: clickHandler, colorIndex: 'graph-3'},
        {label: 'Gen 10', value: 30, onClick: clickHandler, colorIndex: 'graph-4'}];
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
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
            <div>
              <Picker value={selectedSubreddit}
                      onChange={this.handleChange}
                      options={['reactjs', 'frontend']} />
              <p>
                {lastUpdated &&
                <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                  {' '}
            </span>
                }
                {!isFetching &&
                <a href='#'
                   onClick={this.handleRefreshClick}>
                  Refresh
                </a>
                }
              </p>
              {isFetching && posts.length === 0 &&
              <h2>Loading...</h2>
              }
              {!isFetching && posts.length === 0 &&
              <h2>Empty.</h2>
              }
              {posts.length > 0 &&
              <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <Posts posts={posts} />
              </div>
              }
            </div>
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

Main.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(Main);
