import React from 'react';

const RatingBook = ({listRating=[], numberRating, avarageRating=0}) => {

    const calcAvarageRating = (list) => {
        if(!numberRating) return {
            avarage_rating: 0,
            count: 0,
        }
        let count = list.reduce((acc,curr) => acc + curr.quantity,0)
        return {
            avarage_rating: list.reduce((acc, curr) => acc + curr.quantity*curr.rating,0)/count,
            count: count,
        }
    }
    return (
        <div className='book-comment'>
            <div className='rating-result-box'>
                <div className='col-left'>
                    <h3>Đánh giá trung bình</h3>
                    <h4>{`(${calcAvarageRating(listRating).count} người đã đánh giá)`}</h4>
                    {numberRating ? <h2>{parseFloat(calcAvarageRating(listRating).avarage_rating).toFixed(2)}</h2>: <></>}
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
                                    <div class="bar" style={{width:`${numberRating ? (listRating.find(rt=> item === rt.rating)?.quantity/calcAvarageRating(listRating).count)*100 : 0}%`}}>
                                    </div>
                                </div>
                                &nbsp;<div style={{width:'20px', textAlign:'right', display:'inline-block'}}>{listRating.find(rt=> item === rt.rating)?.quantity}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RatingBook;