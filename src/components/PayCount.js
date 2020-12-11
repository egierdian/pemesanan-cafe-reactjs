import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import { API_URL } from '../utils/constants';

export default class PayCount extends Component {
    submitPayCount = (sum) => {
        const order = {
            total_bayar: sum,
            menus: this.props.keranjangs
        }

        axios.post(API_URL + "pesanans", order).then((res) => {
            this.props.history.push('/success')
        })
    };
    render() {
        const sum = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);

        return (
            <div className="fixed-bottom">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} px={4}>
                        <h4>Total : <strong className="float-right px-4">Rp. {numberWithCommas(sum)}</strong></h4>

                        <Button variant="primary" block onClick={() => this.submitPayCount(sum)}>
                            Bayar
                        </Button>
                    </Col>

                </Row>
            </div>
        )
    }
}
