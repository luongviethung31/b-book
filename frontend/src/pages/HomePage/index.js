import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import Slider from 'react-slick';
const dummyData = ['Category1', 'Category2', 'Category3', 'Category4', 'Category5', 'Category6']
const CustomSlide = ({title}) => {
    return (
        <div>
            <h3>{title}</h3>
        </div>
    );
}
const Homepage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className='home-page-container'>
            <Container>
                <Row className='instoduce-session'>
                    <Col className='menu-col' lg={3} md={0}>
                        <ListGroup>
                            {
                                dummyData.map((item, index) => (
                                    <ListGroup.Item key={index} action variant="light">
                                        {item}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Col>
                    <Col className='main-contents-row' lg={9} md={12}>
                        <Slider {...settings}>
                            <CustomSlide title='Slide 1'/>
                            <CustomSlide title='Slide 2'/>
                            <CustomSlide title='Slide 3'/>
                        </Slider>
                    </Col>
                </Row>
                <Row className='items-session'>
                    <Col className='items--left-col' lg={9}>
                        <Row className='new-book-wrapper'></Row>
                        <Row className='discount-book-wrapper'></Row>
                    </Col>
                    <Col className='items--right-col' lg={3}></Col>
                </Row>
            </Container>
        </div>
    );
};

export default Homepage;