import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/Authorization/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
