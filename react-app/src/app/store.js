import { configureStore } from '@reduxjs/toolkit';
import viewModelReducer from './viewModel';

export const store = configureStore({
    reducer: {
        viewModel: viewModelReducer
    }
});