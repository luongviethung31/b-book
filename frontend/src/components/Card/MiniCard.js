import FormatPrice from 'components/FormatPrice';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const MiniCard = ({image, title, author, price, discount}) => {
    return (
        <div className='mini-book-card'>
            <Row>
                <Col sm={3} className='book-image'>
                    <img src={image} alt={title}/>
                </Col>
                <Col sm={9} className='book-info'>
                    <div className='book-title'>
                        {title}
                    </div>
                    <div className='book-author'>
                        {author}
                    </div>
                    <div className='price-box'>
                    <FormatPrice discount={discount} price={price} />
                        {/* <span className='old-price'>{price}</span>
                        <span className='new-price'>{price}</span> */}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default MiniCard;