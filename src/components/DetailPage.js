import React, { Component } from 'react';
import back_dark from '../images/back_dark.svg';
import back_light from '../images/back_light.svg';

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: {},
            err: null,
            isLoading: true,
            borders: {}
        }
    }

    componentDidMount() {
        console.log(window.location.pathname.slice(1, 4));
        this.setState({ isLoading: true })
        let api_url = `https://restcountries.eu/rest/v2/alpha/${window.location.pathname.slice(1, 4)}`;

        fetch(api_url)
            .then(res => {

                if (res.status >= 400) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(country => {
                this.setState({
                    country,
                    isLoading: false
                });
                country.borders.map(border => {
                    fetch(`https://restcountries.eu/rest/v2/alpha/${border}`)
                        .then(res => {
                            if (res.status >= 400) {
                                throw new Error("Server responds with error!");
                            }
                            return res.json();
                        })
                        .then(country => {
                            let borders = this.state.borders;
                            borders[country.alpha3Code] = country.name;
                            this.setState({
                                borders: borders
                            })
                        })
                })
            },
                err => {
                    this.setState({
                        err,
                        isLoading: false
                    })
                });
    }
    render() {
        let { country, err, isLoading, borders } = this.state;
        console.log(isLoading);
        console.log(country);

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
        return (
            <div className="detail">
                <a className="detail__back" href='/' style={{ backgroundImage: `url(${this.props.theme ? back_light : back_dark})` }}>Back</a>

                <div className="detail__main">
                    <div className="detail__flag">
                        <img src={country.flag} alt="flag" />
                    </div>

                    <div className="detail__info">
                        <h1>{country.name}</h1>
                        <div className="detail__properties">
                            <div className="detail_prop_group group1">
                                <ul>
                                    <li><span className="detail__bold">Native Name:</span> {country.nativeName}</li>
                                    <li><span className="detail__bold">Population:</span> {country.population.toLocaleString('en-US')}</li>
                                    <li><span className="detail__bold">Region:</span> {country.region}</li>
                                    <li><span className="detail__bold">Sub Region:</span> {country.subregion}</li>
                                    <li><span className="detail__bold">Capital:</span> {country.capital}</li>
                                </ul>
                            </div>
                            <div className="detail_prop_group">
                                <ul>
                                    <li><span className="detail__bold">Top Level Domain:</span> {country.topLevelDomain}</li>
                                    <li><span className="detail__bold">Currencies: </span>
                                        {country.currencies.map((currency, index) => (
                                            <span key={currency.name}>{index >= 1 ? ", " + currency.name : currency.name}</span>
                                        ))
                                        }
                                    </li>
                                    <li><span className="detail__bold">Languages: </span>
                                        {country.languages.map((language, index) => (
                                            <span key={language.name}>{index >= 1 ? ", " + language.name : language.name}</span>
                                        ))
                                        }</li>
                                </ul>
                            </div>
                        </div>
                        <div className="detail__borders">
                            <div className="detail__borders__title">
                                <span className="detail__bold">Border Countries: </span>
                            </div>
                            <div className="detail__borders__list">
                                {country.borders.length > 0 ?
                                    country.borders.map(border => {

                                        return (<a key={border} href={"/" + border} className="detail__border">{borders[border]}</a>)
                                    })
                                    : <span>None</span>}
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        )
    }

}
