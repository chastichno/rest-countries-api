import React, { Component } from 'react';
import moon_dark from '../images/moon_01.svg';
import moon_light from '../images/moon_02.svg';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <div className="header__logo">Where in the world?</div>
                <div onClick={this.props.themeSwitcher} className="header__theme">
                    <img src={this.props.theme ? moon_light : moon_dark} alt="dark" className="header__toggle"></img>
                    {this.props.theme ? "Dark" : "Light"} mode</div>
            </div>
        )
    }
}



