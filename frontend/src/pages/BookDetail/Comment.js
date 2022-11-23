import React from 'react';
import UserIcon from 'assets/icons/user.svg'
import { Rating } from 'react-simple-star-rating';

const Comment = ({user, comment, date, rating}) => {
    return (
        <div className='comment-box'>
            <div className='image-user'>
                <img src={UserIcon} alt=''/>
            </div>
            <div className='comment-detail'>
                <div className='user-name'>{user}</div>
                <Rating
                    initialValue={rating}
                    readonly
                    size={20}
                />
                <div className='coment'>{comment}</div>
                <div className='date'>{date}</div>
            </div>
        </div>
    );
};

export default Comment;