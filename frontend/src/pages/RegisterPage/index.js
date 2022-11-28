import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import userAPI from 'api/userAPI'
import useNotification from "hooks/notification";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        delete data.password_confirm
        userAPI.registerUser(data)
        .then((rs) => {
            if(rs.status === 201) {
                useNotification.Success({
                    title: "THÀNH CÔNG!",
                    message:"Chúc mừng bạn đã tạo tài khoản thành công!"
                })
                setTimeout(() => {
                    window.open('/','_self')
                },2000)
            }
        })
        .catch((e) => {
            useNotification.Error({
                title: "LỖI!",
                message:"Tạo tài khoản không thành công!"
            })
        })
    };


    // console.log(watch());

    // console.log(errors.name)
    const [pass, setPass] = useState('')

    return (
        <div className=" login-modal container">
            <div className="row pt-4">
                <div className="col-sm-6 shadow round pt-2 login-modal">
                    <div className="login-modal__head">
                        <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                            <Form.Label column sm={3} style={{textAlign:'left'}}>
                                Họ:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    className={`${errors.first_name ? "invalid " : ''}`}
                                    type="text"
                                    required
                                    maxLength={50}
                                    placeholder="Nhập tên của bạn..."
                                    {...register("first_name", {
                                        required: "Tên là bắt buộc!",
                                    })}
                                    onKeyUp={() => {
                                        trigger("first_name");
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                            <Form.Label column sm={3} style={{textAlign:'left'}}>
                                Tên:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    className={`${errors.last_name ? "invalid " : ''}`}
                                    type="text"
                                    required
                                    maxLength={50}
                                    placeholder="Nhập họ của bạn..."
                                    {...register("last_name", {
                                        required: "Bắt buộc!",
                                    })}
                                    onKeyUp={() => {
                                        trigger("last_name");
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                            <Form.Label column sm={3} style={{textAlign:'left'}}>
                                Tên người dùng:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    className={`${errors.username ? "invalid " : ''}`}
                                    type="text"
                                    required
                                    maxLength={50}
                                    placeholder="Nhập tên người dùng..."
                                    {...register("username", {
                                        required: "Bắt buộc!",
                                    })}
                                    onKeyUp={() => {
                                        trigger("username");
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3} style={{textAlign:'left'}}>
                                Email:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    className={`${errors.email ? "invalid" : ''}`}
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
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone" >
                            <Form.Label column sm={3} style={{textAlign:'left'}}>
                                Số điện thoại:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    className={`${errors.phone ? "invalid" : ''}`}
                                    type="text"
                                    required
                                    placeholder="Nhập SĐT của bạn..."
                                    pattern='^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$'
                                    {...register("phone", {
                                        required: "SĐT là bắt buộc!",
                                    })}
                                    onKeyUp={() => {
                                        trigger("phone");
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" >
                            <Form.Label column sm={3} style={{textAlign:'left'}}>
                                Mật khẩu:
                            </Form.Label>
                            <Col sm={9}>
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
                                        setPass(e.target.value);
                                        trigger("password");
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" >
                            <Form.Label column sm={3} style={{textAlign:'left'}}>
                                Mật khẩu:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    className={`${errors.password_confirm ? "invalid" : ''}`}
                                    type="password"
                                    minLength={6}
                                    maxLength={14}
                                    required
                                    pattern={pass}
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
                        <Button type="submit" className="mb-4">Đăng ký</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;