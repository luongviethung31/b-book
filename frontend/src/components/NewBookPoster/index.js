import FormatPrice from 'components/FormatPrice';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const NewBookPoster = ({ title, image, description, price, discount, author, slug }) => {
    return (
        <div className='new-book-poster'>
            <Container fluid='lg'>
                <Row>
                    <Col lg={4} className='image-instroduce'>
                        <img src={image} alt={title} />
                    </Col>
                    <Col lg={8} className='text-info'>
                        <div className='title-container'>
                            <div className='title-wrapper'>
                                <div className='title-book'>{title}</div>
                                <div className='author-book'>{author}</div>
                            </div>
                        </div>
                        <div className='description-book'>
                            <div className='description'>{description}</div>
                        </div>
                        <div className='price-info'>
                            <div className='price-wrapper'>
                                <div className='discount-num'>{discount}%</div>
                                <FormatPrice discount={discount} price={price} />
                            </div>
                        </div>
                        <div className='action-button'>
                            <a href={`/book-detail/${slug}`} style={{textDecoration:'none'}}>
                                <Button>Mua ngay</Button>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NewBookPoster;