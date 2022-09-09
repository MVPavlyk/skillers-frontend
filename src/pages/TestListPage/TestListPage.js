import React, {useEffect} from 'react';
import css from './TestListPage.module.css';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getTechnology, getTests} from '../../store/slices/testPage.slice';
import {TestBlock} from '../../components';


const TestListPage = () => {
    const {techId} = useParams();
    const {EN} = useSelector(state => state['languageReducers']);
    const {tests, technology} = useSelector(state => state['testsReducers']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTests({techId, pageNum: 1, pageSize: 4}))
        dispatch(getTechnology({techId}))
    }, []);


    return (
        <div className={css.test__page}>
            <div className={css.test__page_title}>{EN ? `${technology} tests` : `Тести з ${technology}`}</div>
            {!!tests.length &&
                <div className={css.tests__wrap}>
                    {!!tests.length && tests.map(test => <TestBlock key={test.id} test={test}/>)}
                </div>
            }
        </div>
    );
};

export {TestListPage};