import React, { Component } from 'react';
import down_dark from '../images/down_dark.svg';
import down_light from '../images/down_light.svg';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
        this.showDropdown = this.showDropdown.bind(this);
        this.regionChange = this.regionChange.bind(this);
    }
    showDropdown() {
        this.setState(state => ({
            toggle: !state.toggle
        }))
        console.log(this.state.toggle);
    }
    regionChange(e) {
        this.props.regionBtn(e);
        this.showDropdown();
        console.log(e)
    }

    render() {
        return (
            <div className="dropdown">
                <button onClick={this.showDropdown} className="dropdown__btn" style={{ backgroundImage: `url(${this.props.theme ? down_light : down_dark})` }}>{this.props.region ? this.props.region : "Filter by Region"}</button>
                <div className={this.state.toggle ? "dropdown__content dropdown__show" : "dropdown__content"}>
                    <button name="region" value="Africa" onClick={this.regionChange} className="dropdown__option" style={{ fontWeight: `${this.props.region==='Africa' ? 800 : 600}` }}>Africa</button>
                    <button name="region" value="Americas" onClick={this.regionChange} className="dropdown__option" style={{ fontWeight: `${this.props.region==='Americas' ? 800 : 600}` }}>Americas</button>
                    <button name="region" value="Asia" onClick={this.regionChange} className="dropdown__option" style={{ fontWeight: `${this.props.region==='Asia' ? 800 : 600}` }}>Asia</button>
                    <button name="region" value="Europe" onClick={this.regionChange} className="dropdown__option" style={{ fontWeight: `${this.props.region==='Europe' ? 800 : 600}` }}>Europe</button>
                    <button name="region" value="Oceania" onClick={this.regionChange} className="dropdown__option" style={{ fontWeight: `${this.props.region==='Oceania' ? 800 : 600}` }}>Oceania</button>
                </div>
            </div>
        )
    }
}
