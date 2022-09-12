import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import css from './UserPage.module.css';
import avatar from '../../images/avatar.jpg';
import {logout} from '../../store';


const UserPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user, jwt} = useSelector(state => state['userReducers']);

    const dispatch = useDispatch();

    if (!user) {
        return <Navigate to={'/login'} replace/>;
    }

    return (
        <div className={css.user__page}>
            <div className={css.user__wrap}>
                <img src={avatar} className={css.user__avatar} alt={user.username}/>
                <div className={css.user__username}> {user.username}</div>
                <div className={css.user__email}> {user.email}</div>
                <div className={css.logout__btn} onClick={() => dispatch(logout())}>{EN ? 'Logout' : 'Вихід'}</div>
            </div>

        </div>
    );
};

export {UserPage};