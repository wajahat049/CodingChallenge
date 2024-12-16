import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import {NavigationContainer} from '@react-navigation/native';
import Auth from '../screens/Auth';

const Stack = createNativeStackNavigator();

const RootNavigator = ({
  navigationContainerRef,
}: {
  navigationContainerRef: any;
}) => {
  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6825f7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
