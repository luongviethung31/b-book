import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";


const LoginModal = ({ show, handleClose = () => { } }) => {
  const initState = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const onSubmit = () => {

  }
  return (
    <Modal className='login-modal' show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>ĐĂNG NHẬP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                className={`${errors.email && "invalid"}`}
                type="email"
                required
                placeholder="Nhập email của bạn..."
                pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                {...register("email", {
                  required: "Email là bắt buộc!",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Email chưa đúng!",
                  }
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                required
                placeholder="Nhập mật khẩu của bạn..."
                {...register("password", {
                  required: "Mật khẩu là bắt buộc!",
                })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalForgetPassword">
            <Form.Label column sm={2} className='forget-password-col'>
            </Form.Label>
            <Form.Label column sm={10} className='forget-password-col'>
              <a href='#'>Quên mật khẩu?</a>
            </Form.Label>
            <Form.Label column sm={2} className='forget-password-col'>
            </Form.Label>
            <Form.Label column sm={8} className='forget-password-col'>
              Chưa có tài khoản? Vui lòng <a href="#">Đăng ký </a>
            </Form.Label>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalForgetPassword">
            <Form.Label column sm={2}>
            </Form.Label>
            <Col sm={4}>
              <Button type='submit' variant="primary" onClick={handleClose}>
                Đăng nhập
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;