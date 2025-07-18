import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider} from 'react-redux';
import store from './src/redux/auth/store';
import UnauthenticatedStackNavigator from './src/Navigation/UnauthenticatedStackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <UnauthenticatedStackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
