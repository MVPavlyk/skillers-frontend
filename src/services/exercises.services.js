import {axiosServices} from './axios.services';

import {urls} from '../config';

export const exercisesServices = {
    getTestExercises: (testId) => axiosServices.get(`${urls.exercises}${testId}`).then(value => value.data.data)
};