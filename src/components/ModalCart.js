import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

export const ModalCart = ({
    showModal,
    handleClose,
    cartDetail,
    qty,
    ket,
    btnPlus,
    btnMinus,
    changeHandler,
    handleSubmit,
    totalHarga,
    deleteCart
}) => {
    console.log(cartDetail);
    if (cartDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {cartDetail.product.nama}
                        <strong>
                            {" "}Rp. {numberWithCommas(totalHarga)}
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Total harga</Form.Label>
                            <p>Rp. {numberWithCommas(totalHarga)}</p>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>QTY</Form.Label>
                            <br />
                            <Button variant="primary" className="mr-2" onClick={() => btnMinus()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>

                            <strong>{qty}</strong>
                            <Button variant="primary" className="ml-2" onClick={() => btnPlus()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="keterangan"
                                placeholder="Contoh: Tambah nasi, pedas dsb"
                                value={ket}
                                onChange={(event) => changeHandler(event)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteCart(cartDetail.id)}>
                        Hapus pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Kosong
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Kosong</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}
