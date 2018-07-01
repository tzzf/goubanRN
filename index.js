import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';

AppRegistry.registerComponent('doubanRN', () => App);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);