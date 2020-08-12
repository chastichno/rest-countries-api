import React, { Component } from 'react';
import Navbar from './Navbar';

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: {},
            err: null,
            isLoading: false,
            borders: []
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        let api_url = `https://restcountries.eu/rest/v2/alpha/${this.props.match.params.id}`;

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
                            return res.json();
                        })
                        .then(data => {
                            this.setState(state => ({
                                borders: [...state.borders, data.name]
                            }))
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
        console.log(country);
        console.log(borders);
        if (err) {
            return (
                <div> {err.message} </div>
            )
        }
        if (isLoading) {
            return (
                <div>
                    <Navbar />
                    <div> Loading... </div>
                </div>
            )
        }
        return (
            <div className="detail-page">
                <Navbar />

            </div>
        )
    }

}
