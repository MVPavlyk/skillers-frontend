import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {HomePage, LoginPage, RegisterPage, TestListPage, TestPage, UserPage} from './pages';
import {Layout} from './components';
import {getLanguage, setJwtFromLocalStorage, setUserFromLocalStorage} from './store';


function App() {
    const {user, jwt} = useSelector(state => state['userReducers'])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLanguage());
        dispatch(setUserFromLocalStorage())
        dispatch(setJwtFromLocalStorage())
    }, []);

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'/test-list/:techId'} element={<TestListPage/>}/>
                <Route path={'/test/:testId'} element={<TestPage/>}/>
                <Route path={'/registration'} element={<RegisterPage/>}/>
                <Route path={'/user'} element={<UserPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
