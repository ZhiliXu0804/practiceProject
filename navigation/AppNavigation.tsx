
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../Screen/DetailsScreen';
import HomeScreen from '../Screen/HomeScreen';


export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home'  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;