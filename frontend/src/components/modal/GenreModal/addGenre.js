import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";


const AddGenreModal = ({ show, handleClose = () => { }, handleAddGenre = () => { } }) => {
  const {
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    handleAddGenre(data)
  }
  return (
    <Modal className='add-genre' show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Thể loại</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Thể loại:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Mô tả:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                required
                className="add-genre__description"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 add-genre__save-wrap" >
            <Col sm={4} className="add-genre__save-wrap--button">
              <Button type='submit' variant="primary">
                Lưu
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddGenreModal;