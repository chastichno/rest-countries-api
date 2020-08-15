import React, { Component } from 'react';
import Dropdown from './Dropdown';
import {
    Link
} from "react-router-dom";
import search_dark from '../images/search_dark.svg';
import search_light from '../images/search_light.svg';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: {},
            err: null,
            isLoading: false,
            search: "",
            region: ""
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        let api_url = "https://restcountries.eu/rest/v2/all";

        fetch(api_url)
            .then(res => {

                if (res.status >= 400) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(countries => {
                this.setState({
                    countries,
                    isLoading: false
                })
            },

                err => {
                    this.setState({
                        err,
                        isLoading: false
                    })
                });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        // console.log(e.target.name)
    };
    regionBtn = (e) => {
        if (this.state.region === e.target.value) {
            this.setState({ region: "" });
        } else {
            this.setState({ region: e.target.value });
        }
    }

    render() {
        let { countries, err, isLoading } = this.state;
        if (err) {
            return (
                <div> {err.message} </div>
            )
        }
        if (isLoading) {
            return (
                <div>
                    <div> Loading... </div>
                </div>
            )
        }
        console.log(countries);
        let filteredCountries = countries.length > 0
            ? countries
                .filter(country => {
                    const regex = new RegExp(this.state.search, 'gi');
                    return country.name.match(regex)
                })
                .filter(country => {
                    return this.state.region ? country.region === this.state.region : true;
                })
            : {}
        return (
            <div className="homepage">
                <div className="container">
                    <div className="filters">
                        <input id="search" name="search" onChange={this.onChange} className="search" placeholder="Search for a country…" style={{ backgroundImage: `url(${this.props.theme ? search_light : search_dark})` }}></input>
                        <Dropdown region={this.state.region} regionBtn={this.regionBtn} theme={this.props.theme} />
                    </div>
                    {filteredCountries.length > 0 ?
                        <ul className="list">
                            {filteredCountries

                                .map(country => (
                                    <li className="card" key={country.alpha3Code}>
                                        {/* <img src={country.flag}></img> */}
                                        <div className="card__image" style={{ backgroundImage: `url(${country.flag})` }}></div>
                                        <div className="card__text">
                                            <Link className="card__link" to={{
                                                pathname: country.alpha3Code
                                            }}>{country.name}</Link>
                                            <ul>
                                                <li className="card__properties"><span className="card__bold">Population: </span>{country.population.toLocaleString('en-US')}</li>
                                                <li className="card__properties"><span className="card__bold">Region: </span>{country.region}</li>
                                                <li className="card__properties"><span className="card__bold">Capital: </span>{country.capital}</li>
                                            </ul>
                                        </div>


                                    </li>
                                ))}
                        </ul>
                        : <div> No countries found! </div>}
                </div>

            </div>
        )
    }
}
