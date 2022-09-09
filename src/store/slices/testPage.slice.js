import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {testsServices} from '../../services';

export const getTests = createAsyncThunk(
    'testSlice/getTests',
    async ({techId, pageNum, pageSize}, {rejectWithValue}) => {
        try {
            return await testsServices.getTestsPaginated(techId, pageNum, pageSize);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getTechnology = createAsyncThunk(
    'testSlice/getTechnology',
    async ({techId}, {rejectWithValue}) => {
        try {
            return await testsServices.getTechnologyName(techId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getOneTest = createAsyncThunk(
    'testSlice/getOneTest',
    async ({testId}, {rejectWithValue}) => {
        try {
            return await testsServices.getOneTest(testId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


const testSlice = createSlice({
    name: 'testSlice',
    initialState: {
        status: null,
        error: null,
        tests: [],
        technology: '',
        oneTest: {}
    },

    reducers: {
        setCurrent: (state, action) => {
            state.pageNum = action.payload;
        },
    },

    extraReducers: {
        [getTests.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.tests = action.payload;
        },

        [getTests.pending]: (state) => {
            state.status = 'pending';
        },

        [getTechnology.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.technology = action.payload;
        },

        [getTechnology.pending]: (state) => {
            state.status = 'pending';
        },

        [getOneTest.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.oneTest = action.payload;
        },

        [getOneTest.pending]: (state) => {
            state.status = 'pending';
        }
    }

});

const testsReducers = testSlice.reducer;

export default testsReducers;