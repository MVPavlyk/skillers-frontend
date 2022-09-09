import {axiosServices} from './axios.services';

import {urls} from '../config';

export const testsServices = {
    getTestsPaginated: (techId, pageNum, pageSize) => axiosServices.get(
        `${urls.tests}?filters[techId][$eq]=${techId}&pagination[page]=${pageNum}&pagination[pageSize]=${pageSize}`
    ).then(value => value.data.data),
    getOneTest: (testId) => axiosServices.get(`${urls.tests}/${testId}`).then(value => value.data.data.attributes),
    getTechnologyName: (techId) => axiosServices.get(`${urls.techNames}/${techId}`).then(value => value.data.data.attributes.name)
};