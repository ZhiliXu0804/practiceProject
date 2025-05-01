import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  lastLoginTime: number;
  tableNumber: string | number | null;
}

const initialState: AppState = { 
  lastLoginTime: new Date().getTime(),
  tableNumber: null
};

const appStateSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLastLoginTime: (
      state: AppState,
      action: PayloadAction<number>,
    ) => {
      state.lastLoginTime = action.payload;
    },
    setTableNumber: (
      state: AppState,
      action: PayloadAction<string>,
    ) => {
      state.tableNumber = action.payload;
      state.lastLoginTime = new Date().getTime(); // Update login time when setting table number
    },
  },
});

const store = configureStore({
  reducer: appStateSlice.reducer,
});

export const {
  setLastLoginTime,
  setTableNumber,
} = appStateSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;