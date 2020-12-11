import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/constants';

export default class Success extends Component {
    componentDidMount() {
        axios.get(API_URL + "keranjangs")
            .then(res => {
                const keranjangs = res.data;
                keranjangs.map(function(item) {
                    return axios
                        .delete(API_URL+"keranjangs/"+item.id)
                        .then((res)=> console.log(res))
                        .catch((err)=> console.log(err))
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className="mt-4 text-center">
                <p>Success</p>
                <Button variant="primary" as={Link} to="/">
                    Back
                </Button>
            </div>
        )
    }
}
