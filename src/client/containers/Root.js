import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import Main from '../Main.jsx';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
