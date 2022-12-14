import React from 'react';
import {useSelector} from 'react-redux';
import css from './HomePage.module.css';
import logo from '../../images/header/SKILLERS.svg';
import {TechList} from '../../components';
import {Link} from 'react-router-dom';

const HomePage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user, jwt} = useSelector(state => state['userReducers']);

    return (
        <>
            <div className={css.home__page}>
                <div className={css.home__welcome}>
                    {EN ? 'Welcome on' : 'Вітаємо на'}
                </div>
                <img className={css.home__logo} src={logo} alt="logo"/>
                <div className={css.home__description}>
                    {EN ? 'Platform for testing your IT skills' :
                        'Платформа для перевірки твоїх IT навичок'}
                </div>
                <Link to={user ? '/user' : '/registration'} className={css.register__btn}>
                     {user ? (EN ? 'To my profile' : 'На мій профіль') : (EN ? 'Register now' : 'Зареєструватися')}
                </Link>
            </div>
            <TechList/>
        </>
    );
};

export {HomePage};