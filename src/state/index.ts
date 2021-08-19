import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';

import application from './application/reducer';
import { updateVersion } from './global/actions';
import multicall from './multicall/reducer';
import pledge from './pledge/reducer';
import yamatoEntirety from './yamato-entirety/reducer';

const PERSISTED_KEYS: string[] = [];

const store = configureStore({
  reducer: {
    application,
    multicall,
    yamatoEntirety,
    pledge,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

store.dispatch(updateVersion());

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
