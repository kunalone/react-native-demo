/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import _ from 'lodash';
import React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/actions';
import Dashboard from './src/dashboard';

var delayInMilliseconds = 4000;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default App;
