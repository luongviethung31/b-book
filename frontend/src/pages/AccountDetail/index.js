import userAPI from 'api/userAPI';
import useNotification from 'hooks/notification';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form, Col, Container, Row, Tab, Tabs, InputGroup, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const AccountDetail = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();
    const [key, setKey] = useState('info');
    const { userInfo } = useSelector(store => store.auth)
    const [newPass, setNewPass] = useState('')
    const [oldPass, setOldPass] = useState('')

    const onSubmit = () => {
        let data = {
            old_password: oldPass,
            new_password: newPass
        }
        userAPI.changePassword(data)
            .then((rs) => {
                if (rs.status === 204) {
                    reset()
                    useNotification.Success({
                        title: "THÀNH CÔNG!",
                        message: "Bạn vừa thay đổi mật khẩu!"
                    })
                }
            })
            .catch((e) => {
                useNotification.Error({
                    title: "LỖI!",
                    message: "Mật khẩu không đúng!"
                })
            })
    };

    return (
        <div className='account-detail'>
            <Container fluid="">
                <Row className='mt-4'>
                    <Col sm={8} className="list-book-col">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab className='title-tab' eventKey="info" title="Thông tin tài khoản">
                                <div className=" login-modal container">
                                    <div className="row pt-4">
                                        <div className="col-sm-6 shadow round pt-2 login-modal">
                                            <div className="login-modal__head">
                                                <h2>THÔNG TIN TÀI KHOẢN</h2>
                                            </div>
                                            <Form onSubmit={() => { }}>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                                                    <Form.Label column sm={3} style={{ textAlign: 'left' }}>
                                                        Họ:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control
                                                            className='first-name'
                                                            type="text"
                                                            disabled
                                                            value={userInfo.first_name}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                                                    <Form.Label column sm={3} style={{ textAlign: 'left' }}>
                                                        Tên:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control
                                                            className='last-name'
                                                            type="text"
                                                            disabled
                                                            value={userInfo.last_name}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                    <Form.Label column sm={3} style={{ textAlign: 'left' }}>
                                                        Email:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control
                                                            className='email'
                                                            type="email"
                                                            disabled
                                                            value={userInfo.email}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone" >
                                                    <Form.Label column sm={3} style={{ textAlign: 'left' }}>
                                                        Admin:
                                                    </Form.Label>
                                                    <Col sm={9} style={{ textAlign: 'left' }}>
                                                        <Form.Check
                                                            type='checkbox'
                                                            disabled
                                                            checked={userInfo?.is_admin}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab className='title-tab' eventKey="change-pass" title="Đổi mật khẩu">
                                <div className=" login-modal container">
                                    <div className="row pt-4">
                                        <div className="col-sm-6 shadow round pt-2 login-modal">
                                            <div className="login-modal__head">
                                                <h2>ĐỔI MẬT KHẨU</h2>
                                            </div>
                                            <Form onSubmit={handleSubmit(onSubmit)}>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" >
                                                    <Form.Label column sm={4} style={{ textAlign: 'left' }}>
                                                        Mật khẩu mới:
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control
                                                            className={`${errors.password ? "invalid" : ''}`}
                                                            type="password"
                                                            minLength={6}
                                                            maxLength={14}
                                                            required
                                                            placeholder="Nhập mật khẩu..."
                                                            {...register("password", {
                                                                required: "Mật khẩu là bắt buộc!",
                                                                pattern: '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
                                                            })}
                                                            onKeyUp={(e) => {
                                                                setNewPass(e.target.value)
                                                                trigger("password");
                                                            }}
                                                            onChange={(e) => {
                                                                setNewPass(e.target.value)
                                                            }}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" >
                                                    <Form.Label column sm={4} style={{ textAlign: 'left' }}>
                                                        Xác nhận:
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control
                                                            className={`${errors.password_confirm ? "invalid" : ''}`}
                                                            type="password"
                                                            minLength={6}
                                                            maxLength={14}
                                                            required
                                                            pattern={newPass}
                                                            // isValid="123123"
                                                            placeholder="Xác nhận mật khẩu..."
                                                            {...register("password_confirm", {
                                                                required: "Xác nhận bắt buộc!",
                                                            })}
                                                            onKeyUp={() => {
                                                                trigger("password_confirm");
                                                            }}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" >
                                                    <Form.Label column sm={4} style={{ textAlign: 'left' }}>
                                                        Mật khẩu cũ:
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control
                                                            className={`${errors.old_password ? "invalid" : ''}`}
                                                            type="password"
                                                            required
                                                            // isValid="123123"
                                                            placeholder="Mật khẩu cũ..."
                                                            {...register("old_password", {
                                                                required: "Mật khẩu cũ là bắt buộc!",
                                                            })}
                                                            onKeyUp={(e) => {
                                                                trigger("old_password");
                                                                setOldPass(e.target.value)
                                                            }}
                                                            onChange={(e) => setOldPass(e.target.value)}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Button type="submit" className="mb-4">Xác nhận</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AccountDetail;