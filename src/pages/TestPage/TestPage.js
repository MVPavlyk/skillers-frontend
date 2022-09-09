import React, {useEffect} from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import css from './TestPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getOneTest} from '../../store/slices/testPage.slice';
import {checkResults, clear, getExercises, makeTimeToPush} from '../../store/slices/exercises.slice';
import {ExerciseBlock} from '../../components';

const TestPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {oneTest} = useSelector(state => state['testsReducers']);
    const {exercises, result, timeToPush, checked} = useSelector(state => state['exercisesReducers']);

    const {testId} = useParams();
    const dispatch = useDispatch();
    const {pathname} = useLocation();

    useEffect(() => {
        dispatch(getOneTest({testId}));
        dispatch(getExercises({testId}));
    }, []);


    useEffect(() => {
        dispatch(clear());
    }, [pathname]);


    useEffect(() => {
        if (timeToPush) {
            setTimeout(() => {

                dispatch(checkResults());
            });
        }
    }, [timeToPush]);

    return (
        <div className={css.test__page}>
            <div className={css.test__page_title}>{oneTest.name}</div>
            {!!exercises.length &&
                <div className={css.exercises__wrap}>
                    {exercises.map(exercise => <ExerciseBlock key={exercise.id} exercise={exercise}/>)}
                </div>
            }

            {!checked && <button className={css.check__btn} onClick={() => dispatch(makeTimeToPush())}>{EN ? 'CHECK' : 'ПЕРЕВІРИТИ'}</button>}
            {result &&
                <div className={css.result__wrap}>
                    <div className={css.result__block}>
                        {EN ? 'Your result:' : 'Ваш результат:'} {result}
                    </div>
                    <Link to={'/'} className={css.check__btn}>{EN ? 'TO MAIN' : 'НА ГОЛОВНУ'}</Link>
                </div>
            }
        </div>
    );
};

export {TestPage};