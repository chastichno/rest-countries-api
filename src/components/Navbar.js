import React from 'react';
import moon_dark from '../images/moon_01.svg';
import moon_light from '../images/moon_02.svg';

export default function Navbar(props) {

    return (
        <div className="header">
            <div className="header__logo">Where in the world?</div>
            <div onClick={props.themeSwitcher} className="header__theme">
                <img src={props.theme ? moon_light : moon_dark} alt="dark" className="header__toggle"></img>
                {props.theme ? "Dark" : "Light"} mode</div>
        </div>
    )
}



