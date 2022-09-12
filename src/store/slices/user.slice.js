import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userServices} from '../../services';


export const registration = createAsyncThunk(
    'userSlice/registration',
    async (obj, {rejectWithValue}) => {
        try {
            const userData = await userServices.register(obj);
            localStorage.setItem('user', JSON.stringify(userData.user));
            localStorage.setItem('token', JSON.stringify(userData.jwt));
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const login = createAsyncThunk(
    'userSlice/login',
    async (obj, {rejectWithValue}) => {
        try {
            const userData = await userServices.login(obj);
            localStorage.setItem('user', JSON.stringify(userData.user));
            localStorage.setItem('token', JSON.stringify(userData.jwt));
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        error: null,
        status: null,
        user: null,
        token: null,
        noUser: true,
    },

    reducers: {
        setUserFromLocalStorage: (state) => {
            state.user = JSON.parse(localStorage.getItem('user'));
        },
        setJwtFromLocalStorage: (state) => {
            state.roles = JSON.parse(localStorage.getItem('jwt'));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('jwt');
        },
        clearError: (state) => {
            state.error = null;
        }
    }, extraReducers: {
        [registration.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [registration.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action;
        },
        [registration.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [login.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [login.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action;
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    }
});

export const {setUserFromLocalStorage, setJwtFromLocalStorage, logout, clearError} = userSlice.actions;


const userReducers = userSlice.reducer;


export default userReducers;