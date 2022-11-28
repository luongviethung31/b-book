import React from 'react';
import IconPayment from 'assets/icons/payment-icon.svg'
import IconQuality from 'assets/icons/quality-icon.svg'
import IconShip from 'assets/icons/ship-icon.svg'
import { Col, Container, Row } from 'react-bootstrap';

const PolicyCard = ({ icon, title, description }) => {
    return (
        <div className='policy-card'>
            <div className='policy-card__icon'>
                <img src={icon} alt={title} />
            </div>
            <div className='policy-card__text'>
                <div className='policy-card__text--title'>
                    {title}
                </div>
                <div className='policy-card__text--info'>
                    {description}
                </div>
            </div>
        </div>
    )
}

const policyList = [
    {
        icon: IconPayment,
        title: 'THANH TOÁN AN TOÀN',
        description: 'Nhiều phương thức thanh toán thuận tiện với độ an toàn tuyệt đối'
    },
    {
        icon: IconQuality,
        title: 'CAM KẾT CHẤT LƯỢNG',
        description: 'Tất cả sản phẩm được cam kết chính hãng và chất lượng cao'
    },
    {
        icon: IconShip,
        title: 'GIAO HÀNG NHANH CHÓNG',
        description: 'Nhiều đối tác vận chuyển uy tín, nhanh chóng và tiện lợi'
    }
]

const Policy = () => {
    return (
        <div className='policy-session'>
            <Container fluid className='container-p-4'>
                <Row>
                    {
                        policyList.map((item, index) => (
                            <Col lg={4} key={index}>
                                <PolicyCard icon={item.icon} title={item.title} description={item.description} />
                            </Col>
                        ))
                    }

                </Row>
            </Container>
        </div>
    );
};

export default Policy;