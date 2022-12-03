import React from 'react';
import { Button } from 'react-bootstrap';
import DeleteIcon from 'assets/icons/delete.svg'
import numeral from 'numeral';

const LargeCard = ({ id, title, price, amount, image, handleDelete, handleChangeAmount, total, slug }) => {
    console.log(id);
    return (
        <div className='large-card'>
            <div className='col-left'>
                <img src={image} alt='' />
                <div className='book-info'>
                    <a href={`/book-detail/${slug}`} style={{textDecoration:'none'}}><h5>{title}</h5></a>
                    <div className='amount'>
                        <Button disabled={amount === 1} onClick={() => handleChangeAmount(id, amount - 1)} variant="secondary" size='sm'>-</Button>
                        <span className='amount__title'>{amount}</span>
                        <Button disabled={amount === total} onClick={() => handleChangeAmount(id, amount + 1)} variant="secondary" size='sm'>+</Button>
                    </div>
                </div>
            </div>
            <div className='col-right'>
                <div className='total'>{`${amount}x${numeral(parseInt(price)).format('0,0')}`}</div>
                <div className='remote' onClick={() => handleDelete(id)} style={{ cursor: 'pointer' }}>
                    <img src={DeleteIcon} alt='' />
                </div>
            </div>
        </div>
    );
};

export default LargeCard;