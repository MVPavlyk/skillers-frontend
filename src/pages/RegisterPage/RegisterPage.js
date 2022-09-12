import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import css from './RegisterPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../images/header/SKILLERS.svg';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {UserValidator} from '../../validation';
import {clearError, registration} from '../../store';
import {Navigate} from 'react-router-dom';



const RegisterPage = () => {
    const {user, jwt, error} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        register, handleSubmit, formState: {errors}
    } = useForm({resolver: joiResolver(UserValidator)});

    const [repeatError, setRepeatError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearError());
    }, []);


    const makeRegister = (obj) => {
        if (obj.password === obj.repeatPassword) {
            const regObj = {
                username: obj.username,
                email: obj.email,
                password: obj.password,
            };
            dispatch(registration(regObj));
            setRepeatError(false);
        } else {
            setRepeatError(true);
        }
    };


    if (user) {
        return <Navigate to="/user" replace/>;
    }

    return (
        <div className={css.register__page}>
            <div className={css.register__left}>
                <img className={css.home__logo} src={logo} alt="logo"/>
                <div className={css.home__description}>
                    {EN ? 'Platform for testing your IT skills' :
                        'Платформа для перевірки твоїх IT навичок'}
                </div>
            </div>
            <div className={css.register__right}>
                <form onSubmit={handleSubmit(makeRegister)} className={css.register__form}>
                    <input
                        type="text"
                        placeholder={EN ? 'Username' : 'Нікнейм'}
                        {...register('username')}
                        className={css.register__input}
                    />
                    {errors.username && <div className={css.error}>{errors.username.message}</div>}

                    <input
                        type="text"
                        placeholder={EN ? 'Email' : 'Пошта'}
                        {...register('email')}
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

                    <input
                        type="password"
                        placeholder={EN ? 'Repeat password' : 'Повторіть пароль'}
                        autoComplete="off"
                        {...register('repeatPassword')}
                        className={css.register__input}
                    />

                    {repeatError &&
                        <div className={css.error}>{EN ? 'Error repeat password' : 'Помилка повтору пароля'}
                        </div>}
                    {error &&
                        <div
                            className={css.error}>
                            {EN ? 'User with such email or username already registered' :
                                'Користувач з таким емейлом або нікнеймом вже зареєстрований'
                            }
                        </div>}
                    <button className={css.registration__btn}>{EN ? 'SIGN UP' : 'ЗАРЕЄСТРУВАТИСЯ'}</button>
                </form>
            </div>
        </div>
    );
};

export {RegisterPage};