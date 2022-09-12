const badeURL = 'http://localhost:1337';

export default badeURL;

export const urls = {
    tests: '/api/tests',
    techNames: '/api/tech-names',
    exercises: '/api/exercises?populate=%2A&filters[testId][$eq]=',

    register: '/api/auth/local/register',
    login: '/api/auth/local'
};