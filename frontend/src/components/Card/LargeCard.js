import React from 'react';
import { Button } from 'react-bootstrap';
import DeleteIcon from 'assets/icons/delete.svg'

const LargeCard = ({title, price, amount, image, handleDelete}) => {
    return (
        <div className='large-card'>
            <div className='col-left'>
                <img src={image} alt=''/>
                <div className='book-info'>
                    <h6>{title}</h6>
                    <div className='amount'>
                        <Button  variant="secondary" size='sm'>-</Button>
                        <span className='amount__title'>{amount}</span>
                        <Button  variant="secondary" size='sm'>+</Button>
                    </div>
                </div>
            </div>
            <div className='col-right'>
                <div className='total'>{`${amount}x${price}`}</div>
                <div className='remote' onClick={handleDelete}>
                    <img src={DeleteIcon} alt=''/>
                </div>
            </div>
        </div>
    );
};

export default LargeCard;