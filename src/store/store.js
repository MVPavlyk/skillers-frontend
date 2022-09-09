import {
    configureStore
} from '@reduxjs/toolkit';
import languageReducers from './slices/language.slice';
import testsReducers from './slices/testPage.slice';
import exercisesReducers from './slices/exercises.slice';


const store = configureStore({
    reducer: {
        languageReducers,
        testsReducers,
        exercisesReducers
    }
});

export default store;