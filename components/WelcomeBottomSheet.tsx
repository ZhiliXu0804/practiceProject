
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';


type WelcomeBottomSheetProps = {
  tableNumber: number;
  onClose: () => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const WelcomeBottomSheet: React.FC<WelcomeBottomSheetProps> = ({ tableNumber, onClose }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleMeetGroupPress = () => {
    onClose();
    navigation.navigate('Details');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>You are invited to the</Text>
      <Text style={styles.groupText}>Group {tableNumber}</Text>
      
      <View style={styles.illustrationContainer}>
        <Image 
          source={require('../assets/group-illustration.png')} 
          style={styles.illustration}
          defaultSource={require('../assets/group-illustration.png')}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleMeetGroupPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Meet your group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#1C1B1F',
    textAlign: 'center',
    marginBottom: 8,
  },
  groupText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1C1B1F',
    textAlign: 'center',
    marginBottom: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  illustration: {
    width: 240,
    height: 160,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#6750A4',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeBottomSheet;