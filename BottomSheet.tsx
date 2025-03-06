import React, { ReactNode, useEffect } from 'react';
import { Dimensions, Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
  SharedValue,
  useSharedValue,
} from 'react-native-reanimated';

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
  // We’ll multiply by the bottom sheet's height to slide it off-screen.
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
        {children}
      </Animated.View>
    </>
  );
}

const sheetStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
