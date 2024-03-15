/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import { BrowserRouter } from "react-router-dom";
Amplify.configure(amplifyconfig);

AppRegistry.registerComponent(appName, () => App);
