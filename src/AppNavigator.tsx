import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform } from 'react-native';
import {useSelector} from "react-redux";
import {IAppState} from "store";

import { INavigationProps } from 'types/INavigation';

import {
  LoginScreen,
  ProfileEditScreen,
} from './components/screens';
import { Screen } from './types/INavigation';

const ProfileStack = createStackNavigator();
function ProfileStackScreen(props: INavigationProps) {
  const logout: boolean = useSelector(
    (state: IAppState) => state.auth.logout,
  );

  React.useEffect(() => {
    if (logout) {
      props.navigation.navigate(Screen.Login);
    }
  }, [logout])

  return (
    <ProfileStack.Navigator initialRouteName={Screen.Profile}>
      <ProfileStack.Screen
        name={Screen.Profile}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={Screen.ProfileEdit}
        component={ProfileEditScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

const CommunityStack = createStackNavigator();
function CommunityStackScreen() {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen
        name={Screen.Community}
        component={CommunityScreen}
        options={{ headerShown: false }}
      />
    </CommunityStack.Navigator>
  );
}

const RootStack = createStackNavigator();

export default function AppNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Screen.LandingStack}
        component={LandingStackScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <RootStack.Screen
        name={Screen.ProfileStack}
        component={ProfileStackScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <RootStack.Screen
        name={Screen.TabNavigator}
        component={TabNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </RootStack.Navigator>
  );
}
