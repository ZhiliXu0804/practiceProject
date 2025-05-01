
import React, { useEffect } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTableNumber } from '../store';
import { useBottomSheet } from '../BottomSheetContext';
import WelcomeBottomSheet from '../components/WelcomeBottomSheet';
import { fetchTableNumber } from '../api';


const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const { openBottomSheet, closeBottomSheet, setBottomSheetHeight } = useBottomSheet();
  
  const lastLoginTime = useSelector((state: RootState) => state.lastLoginTime);
  const tableNumber = useSelector((state: RootState) => state.tableNumber);

  useEffect(() => {
    const getTableNumber = async () => {
      try {
        const response = await fetchTableNumber();
        
        // Store in Redux
        dispatch(setTableNumber(response.tableNumber));
        

        const bottomSheetHeight = 400;
        setBottomSheetHeight(bottomSheetHeight);

        // console.log('Table number fetched:', response.tableNumber);
        

        openBottomSheet(
          <WelcomeBottomSheet 
            tableNumber={response?.tableNumber || 1} 
            onClose={closeBottomSheet} 
          />,
          true 
        );
      } catch (error) {
        console.error('Failed to fetch table number:', error);
      }
    };


    getTableNumber();
  }, []);

  return (
    <ScrollView style={styles.sectionContainer}>
      <Text style={styles.headerText}>
        LunchME
      </Text>
      {lastLoginTime && (
        <Text>Last login time: {new Date(lastLoginTime).toLocaleTimeString()}</Text>
      )}
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
  );
};

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

export default HomeScreen;