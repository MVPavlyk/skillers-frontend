import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {HomePage, TestListPage, TestPage} from './pages';
import {Layout} from './components';
import {getLanguage} from './store';



function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLanguage());
    });


    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'/test-list/:techId'} element={<TestListPage/>}/>
                <Route path={'/test/:testId'} element={<TestPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
