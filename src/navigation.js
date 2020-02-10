import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './screen/homeScreen';
import DisplayItem from './screen/displayItem';
import CheckOutScreen from './screen/checkOutScreen'
import WebViewComponent from './screen/webViewComponent'

const NavigationStack = createStackNavigator(
  {
    HomeScreen: { screen: Home },
    DisplayItem: { screen: DisplayItem },
    CheckOutScreen: { screen: CheckOutScreen },
    WebViewScreen: { screen: WebViewComponent }
  },
  {
    headerMode: 'none',
  },
);

const navigator = createSwitchNavigator(
  {
    NavigationStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'NavigationStack',
    navigationOptions: {
      headerVisible: true,
    },
    cardStyle: {
      backgroundColor: '#ffffff',
    },
  },
);

export default createAppContainer(navigator);
