

import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetProvider } from './BottomSheetContext';
import BottomSheet from './BottomSheet';
import { useBottomSheet } from './BottomSheetContext';
import AppNavigator from './navigation/AppNavigation';


// Create a wrapper component that combines navigation context and bottom sheet
const AppContent = () => {
  const { isBottomSheetOpen, bottomSheetContent, bottomSheetHeight, canBottomSheetBeDismissed } = useBottomSheet();

  return (
    <>
      <AppNavigator />
      <BottomSheet
        canBeDismissed={canBottomSheetBeDismissed}
        isOpen={isBottomSheetOpen}
        bottomSheetHeight={bottomSheetHeight}
        duration={300}
      >
        {bottomSheetContent}
      </BottomSheet>
    </>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={styles.container}>
          <BottomSheetProvider>
            <AppContent />
          </BottomSheetProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;