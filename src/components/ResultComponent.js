import React, { Component } from 'react';
import { Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

class ResultComponent extends Component {
    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} className="mt-2 mb-4">
                <h5>Hasil</h5>
                <hr />
                {keranjangs.length !== 0 && (

                    <ListGroup variant="flush">
                        {keranjangs.map((menuKeranjang) => (
                            <Row key={menuKeranjang.id}>
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

                        ))}
                    </ListGroup>
                )}
            </Col>
        );
    }
}

export default ResultComponent;