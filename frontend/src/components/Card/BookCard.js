import FormatPrice from 'components/FormatPrice';
import React from 'react';

const BookCard = ({ title, image, description, price, discount, author }) => {
    return (
        <div className='book-card-wrapper'>
            <div className='pic-book'>
                <img src={image} alt={title} />
            </div>
            <div className='text-info'>
                <div className='book-title'>
                    <div className='title-wrapper'>
                        <div className='title' title={title}>
                            {title}
                        </div>
                    </div>
                    <span className='author'>{author}</span>
                </div>
                <div className='book-description'>
                    <div className='description'>{description}</div>
                </div>
            </div>
            <div className='price-box'>
                {discount ? <div className='discount-num'>{discount}%</div> : <span style={{width:'30px', height:'32px'}}></span>}
                <FormatPrice discount={discount} price={price} />
                {/* <div className='new-price'>{price}</div>
                <div className='old-price'>{price}</div> */}
            </div>
        </div>
    );
};

export default BookCard;