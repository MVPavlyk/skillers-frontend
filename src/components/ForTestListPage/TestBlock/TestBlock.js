import React from 'react';
import css from './TestBlock.module.css';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const TestBlock = (test) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const currentTest = test.test.attributes;

    const testId = test.test.id


    return (
        <>
            {currentTest &&
                <Link to={`/test/${testId}`} className={css.test__block}>
                    <div className={css.test__left}>
                        <div className={css.test__name}>{currentTest.name}</div>
                        <div className={css.test__rating}>{EN? "Rating:" : "Рейтинг:"} {currentTest.rating}/10</div>
                    </div>
                </Link>
            }
        </>
    );
};

export {TestBlock};