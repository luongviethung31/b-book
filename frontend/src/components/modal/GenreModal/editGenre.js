import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";


const EditGenreModal = ({ show, handleClose = () => { }, handleEditGenre = () => { }, data = {}, header=''}) => {
  const [genreValue, setGenreValue] = useState('')
  const [desValue, setDesValue] = useState('')
  useEffect(() => {
    setGenreValue(data?.title || '')
    setDesValue(data?.description || '')
  }, [data.slug])
  
  return (
    <Modal className='edit-genre' show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{color:'#114444 !important', textDecoration:'underline'}}>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Thể loại:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                required
                value={genreValue}
                onChange={(e) => {
                  setGenreValue(e.target.value);
                  console.log(e);
                }}
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
                as='textarea'
                required
                className="edit-genre__description"
                value={desValue}
                onChange={(e) => {
                  setDesValue(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 edit-genre__save-wrap">
            <Col sm={4} className="edit-genre__save-wrap--button">
              <Button onClick={() => { handleEditGenre({title:genreValue, description:desValue}, data.slug)}} variant="primary">
                Lưu
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditGenreModal;