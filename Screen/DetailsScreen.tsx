
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const DetailsScreen = () => {
  const tableNumber = useSelector((state: RootState) => state.tableNumber);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>LunchME</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Your Table</Text>
        <Text style={styles.tableNumber}>{tableNumber || 'N/A'}</Text>
        <Text style={styles.description}>
          Please have a seat at your assigned table.
          Your server will be with you shortly.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9ff',
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.051,
    color: 'black',
    marginVertical: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: '#6750A4',
    marginBottom: 8,
  },
  tableNumber: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});

export default DetailsScreen;