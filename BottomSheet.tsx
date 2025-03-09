import React, { ReactNode, useEffect } from 'react';
import { Dimensions, Keyboard, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
  SharedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface BottomSheetProps {
  canBeDismissed?: boolean;
  isOpen: SharedValue<boolean>;
  bottomSheetHeight: number;
  duration?: number;
  children: ReactNode;
}

export default function BottomSheet({
  canBeDismissed = true,
  isOpen,
  bottomSheetHeight,
  duration = 500,
  children,
}: BottomSheetProps) {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const navigation = useNavigation<NavigationProp>();
  const tableNumber = useSelector((state: RootState) => state.tableNumber);

  const height = useDerivedValue(() => {
    return withTiming(isOpen.value ? bottomSheetHeight : 0, { duration });
  });

  const radius = useSharedValue(32);
  useEffect(() => {
    radius.value =
      bottomSheetHeight >= 0.95 * SCREEN_HEIGHT
        ? withTiming(0, { duration })
        : 32;
  }, [bottomSheetHeight, duration]);

  // This progress value goes from 0 --> 1 (open --> closed).
  // We'll multiply by the bottom sheet's height to slide it off-screen.
  const openProgress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration }),
  );

  // Animate the backdrop opacity from 0 --> 1 and set zIndex accordingly.
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - openProgress.value,
    zIndex: isOpen.value
      ? 24
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return (
    <>
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity
          disabled={!canBeDismissed}
          style={{ flex: 1 }}
          onPress={() => {
            isOpen.value = false;
            Keyboard.dismiss();
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          height: height,
          backgroundColor: '#f8f9ff',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          zIndex: 25,
          overflow: 'hidden',
        }}>
        <View style={sheetStyles.container}>
          <Text style={sheetStyles.title}>You are invited to the</Text>
          <Text style={sheetStyles.tableNumber}>Group {tableNumber}</Text>
          <Image
            source={require('./assets/table.png')}
            style={sheetStyles.image}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={sheetStyles.button}
            onPress={() => {
              navigation.navigate('Details');
              isOpen.value = false;
            }}>
            <Text style={sheetStyles.buttonText}>Meet your group</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const sheetStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginTop: 24,
    marginBottom: 24,
  },
  tableNumber: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4F378B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 36,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  image: {
    width: 306,
    height: 204,
    marginBottom: 36,
  },
});
