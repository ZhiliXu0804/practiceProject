import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  lastLoginTime: number;
}

const initialState: AppState = { lastLoginTime: new Date().getTime()};

const appStateSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLastLoginTime: (
      state: AppState,
      action: PayloadAction<number>,
    ) => {
      state.lastLoginTime = action.payload;
    },
  },
});

const store = configureStore({
  reducer: appStateSlice.reducer,
});

export const {
  setLastLoginTime,
} = appStateSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;
