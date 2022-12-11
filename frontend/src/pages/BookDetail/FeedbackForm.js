import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

const styleForm = {
    display: 'flex',
    marginTop: '10px',
    flexDirection: 'column',
    alignItems: 'start'
}
function FeedbackForm({ handleSendFeedback = () => { } }) {
    const [rating, setRating] = useState(1);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();
    const onHandleSubmit = async (data) => {
        handleSendFeedback(data);
        setRating(0);
        reset();
    };
    return (
        <div className='feedback-form-wrapper'>
            <h2 style={{ fontWeight: 'bold', textAlign: 'left' }}>GỬI ĐÁNH GIÁ</h2>
            <div className='form-box'>
                <form action=" " onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className="form-group-fb mb-2" style={styleForm}>
                        <Controller
                            name="rating"
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                                <Rating
                                    initialValue={1}
                                    emptyColor='gray'
                                    ratingValue={rating}
                                    onClick={(newValue) => {
                                        field.onChange(newValue)
                                        setRating(newValue)
                                    }}
                                    size={20}
                                />
                            )}
                        />
                    </div>
                    <div className="form-group-fb mb-2" style={styleForm}>
                        <label style={{ margin: '5px 0', fontWeight: 'bold' }}>Đánh giá: </label>
                        <textarea
                            {...register("comment",
                                {
                                    required: '* Vui lòng nhập đánh giá',
                                })}
                            style={{ height: '100px', width: '100%' }}
                            placeholder='đánh giá...' />
                        {errors.comment && <div className="alert">{errors.comment.message}</div>}
                    </div>
                    <div className="form-group-fb mb-2" style={{ textAlign: 'left', marginTop: '10px' }}>
                        <Button type='submit'>
                            Gửi đánh giá
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FeedbackForm;