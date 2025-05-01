
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../Screen/DetailsScreen';


export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;