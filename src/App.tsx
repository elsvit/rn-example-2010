/**
 * @format
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import PushNotification from 'react-native-push-notification';

import AppNavigator from './AppNavigator';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
};

export default App;
