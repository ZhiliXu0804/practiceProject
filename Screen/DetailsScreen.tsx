import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const DetailsScreen = () => {
  const tableNumber = useSelector((state: RootState) => state.tableNumber);

  return (
    <View style={styles.container}>
      <Text>
        Welcome to table #
      </Text>
      <Text style={styles.tableNumber}>#{tableNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
});
export default DetailsScreen;
