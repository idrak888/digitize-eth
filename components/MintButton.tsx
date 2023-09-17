import { Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from 'react'

export default function MintButton() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{
                    backgroundColor: "#080808",
                    border: 0
                }}>
                    <Modal.Title>Digitize your Collectible</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#080808",
                    border: 0
                }}>
                    <Form className="AuthForm">
                        <input type="file" />
                        <input type="text" placeholder="Name of Item" />
                        <input type="text" placeholder="PSA Grade" />
                        <input type="text" placeholder="Certificate Number" />
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{
                    backgroundColor: "#080808",
                    border: 0
                }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <button style={{
                marginLeft: 20
            }} onClick={handleShow} className='btn btn-outline-primary'>Mint New</button>
        </div>
    )
}
