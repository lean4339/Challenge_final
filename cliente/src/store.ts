import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sessionReducer from './features/session'

export const store = configureStore({
  devTools: true,
  reducer: {
    session: sessionReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;