import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {LoginValidator} from '../../validation';
import {Link, Navigate} from 'react-router-dom';
import css from '../RegisterPage/RegisterPage.module.css';
import logo from '../../images/header/SKILLERS.svg';
import {clearError, login} from '../../store';

const LoginPage = () => {
    const {user, jwt, error} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearError());
    }, []);

    const {
        register, handleSubmit, formState: {errors}
    } = useForm({resolver: joiResolver(LoginValidator)});

    const makeLogin = (obj) => {
        dispatch(login(obj));
    };

    if (user) {
        return <Navigate to="/user" replace/>;
    }

    return (
        <div className={css.login__page}>
            <div className={css.register__right}>
                <form onSubmit={handleSubmit(makeLogin)} className={css.register__form}>
                    <input
                        type="text"
                        placeholder={EN ? 'Email' : 'Пошта'}
                        {...register('identifier')}
                        autoComplete="off"
                        autoCorrect="off"
                        className={css.register__input}
                    />
                    {errors.email && <div className={css.error}>{errors.email.message}</div>}

                    <input
                        type="password"
                        placeholder={EN ? 'Password' : 'Пароль'}
                        autoComplete="off"
                        {...register('password')}
                        className={css.register__input}
                    />

                    {errors.password && <div className={css.error}>{errors.password.message}</div>}
                    <Link to={'/registration'} className={css.toRegister__link}>
                        {EN ? <span> You haven't profile? <br/>Sign up </span> :
                            <span>У вас немає облікового засобу? <br/>Зареєструватися</span>}
                    </Link>
                    {error &&
                        <div
                            className={css.error}>
                            {EN ? 'Incorrect email or password' :
                                'Не правильний емейл або пароль'
                            }
                        </div>}
                    <button className={css.registration__btn}>{EN ? 'SIGN IN' : 'УВІЙТИ'}</button>
                </form>
            </div>
            <div className={css.register__left}>
                <img className={css.home__logo} src={logo} alt="logo"/>
                <div className={css.home__description}>
                    {EN ? 'Platform for testing your IT skills' :
                        'Платформа для перевірки твоїх IT навичок'}
                </div>
            </div>
        </div>
    );
};

export {LoginPage};