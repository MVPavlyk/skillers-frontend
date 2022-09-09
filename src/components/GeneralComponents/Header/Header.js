import React from 'react';
import css from './Header.module.css'
import logo from '../../../images/header/SKILLERS.svg'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {switchLanguage} from '../../../store';



const Header = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const dispatch = useDispatch();



    return (
        <div className={css.main__header}>
            <Link to={'/'}>
                <img className={css.header__logo} src={logo} alt="logo"/>
            </Link>

            <div>
                <div>
                    <button onClick={() =>  dispatch(switchLanguage())}
                            className={EN ? css.switch_btn_en : css.switch_btn_uk}>
                        <div className={EN ? css.switch_btn_ball_en : css.switch_btn_ball_uk}>
                        </div>
                        <div
                            className={EN ? css.switch_btn_name_en : css.switch_btn_name_uk}>
                            {EN ? 'EN' : 'UK'}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export {Header};