import React from 'react';

const RatingBook = ({ numberRating, avarageRating=0}) => {
    return (
        <div className='book-comment'>
            <div className='rating-result-box'>
                <div className='col-left'>
                    <h3>Đánh giá trung bình</h3>
                    <h4>{`(${numberRating} người đã đánh giá)`}</h4>
                    <h2>{avarageRating}</h2>
                </div>
                <div className='col-right'>
                    <ul>
                        {[5, 4, 3, 2, 1].map((item, index) => (
                            <li key={index}>
                                <span class="number-start">
                                    <span>{item}</span>
                                    <span class="list-star">★</span>
                                </span>
                                <div class="progress progress-warning">
                                    <div class="bar" style={{width:'100%'}}>
                                    </div>
                                </div>
                                &nbsp;5
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RatingBook;