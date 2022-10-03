import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <div className='footer-session'>
            <Container fluid className='container-p-4'>
                <Row>
                    <Col lg={3}>
                        <h4>ĐỐI TÁC VẬN CHUYỂN</h4>
                        <ul className='contact'>
                            <li className='info'>Giao hàng nhanh</li>
                            <li className='info'>Giao hàng tiết kiệm</li>
                            <li className='info'>Viettel Post</li>
                        </ul>
                    </Col>
                    <Col>
                        <h4>VỀ CHÚNG TÔI</h4>
                        <ul className='contact'>
                            <li className='info'>BBOOK.COM</li>
                            <li className='info'>Địa chỉ: TP Đà Nẵng</li>
                            <li className='info'>Email: bbook.vn@gmail.com</li>
                            <li className='info'>SĐT: 0964.465.300</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;