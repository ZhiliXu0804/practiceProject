// BottomSheetContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

interface BottomSheetContextType {
  openBottomSheet: (content: ReactNode, canBeDismissed?: boolean) => void;
  closeBottomSheet: () => void;
  setBottomSheetHeight: (height: number) => void;
  bottomSheetContent: ReactNode | null;
  isBottomSheetOpen: SharedValue<boolean>;
  bottomSheetHeight: number;
  canBottomSheetBeDismissed: boolean;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

interface BottomSheetProviderProps {
  children: ReactNode; // This makes sure children is typed correctly
}
export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
}) => {
  const [canBottomSheetBeDismissed, setCanBottomSheetBeDismissed] =
    useState<boolean>(true);
  const [bottomSheetHeight, setHeight] = useState<number>(502);

  const isBottomSheetOpen = useSharedValue<boolean>(false);
  const [bottomSheetContent, setBottomSheetContent] =
    useState<ReactNode | null>(null);

  const openBottomSheet = (content?: ReactNode, canBeDismissed = true) => {
    setBottomSheetContent(content);
    setCanBottomSheetBeDismissed(canBeDismissed);
    isBottomSheetOpen.value = true;
  };

  const closeBottomSheet = () => {
    isBottomSheetOpen.value = false;
    setBottomSheetContent(null);
  };

  const setBottomSheetHeight = (height: number) => {
    setHeight(height);
  };

  return (
    <BottomSheetContext.Provider
      value={{
        isBottomSheetOpen,
        bottomSheetContent,
        bottomSheetHeight,
        canBottomSheetBeDismissed,
        openBottomSheet,
        closeBottomSheet,
        setBottomSheetHeight,
      }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
