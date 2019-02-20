import React from 'React';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import Home from './home'
import Dashboard from './Weather';

const AppDrawerNavigator = createDrawerNavigator(
  {
    Map: () => <Home/>,
    Weather: () => <Dashboard/>,
  }, {
   unmountInactiveRoutes: true,
   defaultNavigationOptions: {
     headerStyle:{
       backgroundColor: 'orange'
     }
   }
  }
)

const AppContainer = createAppContainer(AppDrawerNavigator);

export default AppContainer;












