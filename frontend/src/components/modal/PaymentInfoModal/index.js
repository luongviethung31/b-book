import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { handleShowLoginModal } from 'redux/reducers/auth/action';
import ConfirmModal from '../ConfirmModal';


const PaymentInfoModal = ({ show, handleClose = () => { }, handlePayment = () => { } }) => {
    const initState = {
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();
    const [isShowConfirm, setIsConfirm] = useState(false)
    const onSubmit = (data) => {
        if (!provice || !district || !ward) return
        const paymentData = {
            ...data,
            ship_date: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString(),
            ship_place: `${ward}, ${district}, ${provice}`,
            paid_at: paidAt,
            is_paid: !(paidAt === 'ship_code')
        }
        setAllData(paymentData)
        setIsConfirm(true)
        handleClose()
    }
    const handleConfirm = () => {
        handlePayment(allData)
    }
    const dispatch = useDispatch()
    const [provice, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [dataVie, setDataVie] = useState([])
    const [paidAt, setPaidAt] = useState('ship_code')
    const [allData, setAllData] = useState({})
    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/?depth=3')
            .then(rs => {
                if (rs.status === 200) {
                    setDataVie(rs.data)
                }
            })
            .catch(e => console.log(e))
    }, [])
    const { userInfo } = useSelector(store => store.auth)
    return (
        <>
            <Modal className='login-modal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {userInfo?.last_name ?
                            'THÔNG TIN THANH TOÁN' :
                            'BẠN CHƯA ĐĂNG NHẬP'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        userInfo?.last_name ?
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group as={Row} className="mb-3" controlId="tinh">
                                    <Form.Label column sm={3}>
                                        Tỉnh/Thành phố:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Select size="sm" onChange={(e) => {
                                            setProvince(e.target.value)
                                            setDistrict('')
                                            // setDistrict(dataVie.find(item => item.name===e.target.value).districts[0])
                                            // setDistrict(dataVie.find(item => item.name===e.target.value).districts[0])
                                        }}
                                            placeholder='Chọn thành phố...'
                                        >
                                            {
                                                dataVie.map((item, index) => (
                                                    <option value={item.name} key={index}>{item.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="quan">
                                    <Form.Label column sm={3}>
                                        Quận/Huyện:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Select size="sm" onChange={(e) => {
                                            setDistrict(e.target.value)
                                            setWard('')
                                        }}>
                                            {provice && dataVie.find(item => item.name === provice).districts.map((dis, index) => (
                                                <option key={index}>{dis.name}</option>
                                            ))}
                                            <option></option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="phuong">
                                    <Form.Label column sm={3}>
                                        Phường/Xã:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Select size="sm" onChange={(e) => setWard(e.target.value)}>
                                            <option></option>
                                            {district && dataVie.find(item => item.name === provice).districts.find(dis => dis.name === district).wards.map((ward, index) => (
                                                <option key={index}>{ward.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column sm={3}>
                                        Chi tiết:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            as='textarea'
                                            name='tramy'
                                            required
                                            {...register("note")}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Col>
                                        <Form.Check
                                            inline
                                            checked={paidAt === 'ship_code'}
                                            onClick={() => setPaidAt('ship_code')}
                                            label="Thanh toán khi nhận hàng"
                                            name="group1"
                                            type='radio'
                                            id='inline-ratio-1'
                                        />
                                        <Form.Check
                                            disabled
                                            inline
                                            label="Thanh toán online"
                                            name="group1"
                                            type='radio'
                                            id='inline-ratio-2'
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalForgetPassword">
                                    <Form.Label column sm={3}>
                                    </Form.Label>
                                    <Col sm={4}>
                                        <Button type='submit' variant="primary">
                                            Đặt hàng
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                            : <h5>
                                Vui lòng <span onClick={() => {
                                    dispatch(handleShowLoginModal(true))
                                    handleClose()
                                }}
                                    style={{ textDecoration: 'underline', color: '#198754', cursor:'pointer'}}
                                >Đăng nhập</span> để đặt hàng! <br />
                                Chưa có tài khoản? Vui lòng <a href="/register" style={{ color: '#198754' }}>Đăng ký </a>
                            </h5>
                    }
                </Modal.Body>
            </Modal>
            <ConfirmModal show={isShowConfirm} handleClose={() => setIsConfirm(false)} handleConfirm={handleConfirm} title="Xác nhận đặt hàng?" />
        </>
    );
};

export default PaymentInfoModal;