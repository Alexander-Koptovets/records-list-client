import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducer from './slice';

const rootReducer = combineReducers({
    store: reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});