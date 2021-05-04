import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser } from '../../Requests/AuthRequests';
import {saveToken}  from '../../utils/index';

const initialState = {
    user: {},
    status: 'idle'
};
export const registerUserAsync = createAsyncThunk(
    'counter/registerUserAsync',
    async ({userData, callback}) => {
        const response = await registerUser(userData);    
        return {userData: response.data.user, callback};
    }
);
export const loginUserAsync = createAsyncThunk(
    'counter/loginUserAsync',
    async ({userData, callback}) => {
        const response = await loginUser(userData);
        return {userData: response.data.user, token: response.data.token, callback};
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,    
    reducers: {
        resetUser: (state) => {         
            state.user = {};
        },
    },    
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload.userData;
                action.payload.callback();
            })
            .addCase(loginUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload.userData;
                saveToken(action.payload.token)
                action.payload.callback();
            })
    },
});

export const { resetUser } = userSlice.actions;

export const selectUser = (state) => {
    return state.user.user
};

export default userSlice.reducer;
