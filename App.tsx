/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import BottomSheet from './BottomSheet';
import { BottomSheetProvider, useBottomSheet } from './BottomSheetContext';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './store';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen(){
  const isDarkMode = useColorScheme() === 'dark';

  const lastLoginTime: number | undefined = useSelector(
    (state: RootState) => state.lastLoginTime,
  );

  return (
    <React.Fragment>
      <ScrollView style={styles.sectionContainer}>
        <Text style={styles.headerText}>
          LunchME
        </Text>
        <Text> Last login time: {lastLoginTime}</Text>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          Requirements
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          When the app starts, it should call the following endpoint to retrieve a table number and display a BottomSheet component with the design specified in Figma. The user will be directed to a new screen upon clicking the button inside the BottomSheet.
          {"\n"}{"\n"}What You Need to Implement:
          {"\n"}- <Text style={styles.highlight}>BottomSheet Display:</Text> Use the existing BottomSheet component included in the project to present the retrieved table number.
          {"\n"}- <Text style={styles.highlight}>Backend Communication:</Text> Fetch data from the provided endpoint and include the response inside the BottomSheet.
          {"\n"}- <Text style={styles.highlight}>Navigation:</Text> Implement navigation to the screen named DetailsScreen using StackNavigation when the user clicks the button.
          {"\n"}- <Text style={styles.highlight}>State Management:</Text> Store the table number in Redux so it can be accessed and displayed on DetailsScreen.
          {"\n"}- <Text style={styles.highlight}>Version Control:</Text> Commit your changes to your branch created based on main
          {"\n"}{"\n"}Endpoint: https://us-central1-net-planetxr-buffettlunch.cloudfunctions.net/practiceProject
          {"\n"}{"\n"}Figma: https://www.figma.com/design/t0KlHFgGtsQKpSGgsKjGhq/Coding-Exercise?node-id=0-1&t=BsGRLah0sKpG3BpE-1
        </Text>
      </ScrollView>
    </React.Fragment>
  );
}

function App(): React.JSX.Element {
  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */

  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView>
          <BottomSheetProvider>
            <HomeScreen />
          </BottomSheetProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.051,
    color: 'black',
    marginVertical: 16,
  },
  sectionContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
