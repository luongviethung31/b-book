import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = ({show, handleClose, title, handleConfirm}) => {

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="true"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => {
            handleConfirm()
            handleClose()
          }}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;