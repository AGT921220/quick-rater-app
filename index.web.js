// index.web.js
import { AppRegistry, Platform } from 'react-native';
import App from './App.js';
import appConfig from './app.json';

const appName = appConfig.expo.name;

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication(appName, { rootTag });
}
