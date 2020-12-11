import React, { Component } from 'react';
import { Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import { ModalCart } from './ModalCart';
import PayCount from './PayCount';
import { API_URL } from '../utils/constants';

import axios from 'axios';
import swal from 'sweetalert';


class ResultComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            cartDetail: false,
            qty: 0,
            ket: "",
            totalHarga: 0,
        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            cartDetail: menuKeranjang,
            qty: menuKeranjang.qty,
            ket: menuKeranjang.ket,
            totalHarga: menuKeranjang.total_harga
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    btnPlus = () => {
        this.setState({
            qty: this.state.qty + 1,
            totalHarga: this.state.cartDetail.product.harga * (this.state.qty+1)
        })
    }
    btnMinus = () => {
        if (this.state.qty !== 1) {
            this.setState({
                qty: this.state.qty - 1,
                totalHarga: this.state.cartDetail.product.harga * (this.state.qty-1)
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            ket: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleClose();
        const data = {
            qty: this.state.qty,
            total_harga: this.state.totalHarga,
            product: this.state.cartDetail.product,
            ket: this.state.ket
          };

          axios
            .put(API_URL + "keranjangs/"+this.state.cartDetail.id, data)
            .then(res => {
              swal("Data", data.product.nama + " berhasil di perbarui ", "success");
            })
            .catch(err => {
              console.log(err);
            });
    }
    deleteCart = (id) => {
        this.handleClose();

          axios
            .delete(API_URL + "keranjangs/"+id)
            .then(res => {
              swal("Sukses", this.state.cartDetail.product.nama + " berhasil di hapus ", "error");
            })
            .catch(err => {
              console.log(err);
            });
    }
    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} className="mt-2 mb-4">
                <h5>Hasil</h5>
                <hr />
                {keranjangs.length !== 0 && (

                    <ListGroup variant="flush">
                        {keranjangs.map((menuKeranjang) => (
                            <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                                <Row >
                                    <Col xs={2}>
                                        <h4>
                                            <Badge pill variant="success">
                                                {menuKeranjang.qty}
                                            </Badge>
                                        </h4>
                                    </Col>
                                    <Col>
                                        <h5>{menuKeranjang.product.nama}</h5>
                                        <p>{menuKeranjang.product.harga}</p>
                                    </Col>
                                    <Col>
                                        <strong className="float-right">{numberWithCommas(menuKeranjang.total_harga)}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ModalCart
                            handleClose={this.handleClose}
                            {...this.state}
                            btnPlus={this.btnPlus}
                            btnMinus={this.btnMinus}
                            handleSubmit={this.handleSubmit}
                            changeHandler={this.changeHandler}
                            deleteCart={this.deleteCart}
                        />
                    </ListGroup>
                )}
                <PayCount keranjangs={keranjangs} {...this.props} />
            </Col>
        );
    }
}

export default ResultComponent;