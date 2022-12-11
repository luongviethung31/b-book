import paymentAPI from 'api/paymentAPI';
import LargeCard from 'components/Card/LargeCard';
import PaymentInfoModal from 'components/modal/PaymentInfoModal';
import useNotification from 'hooks/notification';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const CartDetail = () => {
    const [listBook, setListBook] = useState([])
    const [isShowPayment, setIsShowPayment] = useState(false)
    useEffect(() => {
        let listItem = localStorage.getItem('item_payment')
        let listItemCart = localStorage.getItem('cart_items')
        if (listItem) {
            listItem = JSON.parse(listItem)
            setListBook(listItem)
        } else {
            if (listItemCart) {
                listItemCart = JSON.parse(listItemCart)
                setListBook(listItemCart)
            }
        }
        // window.addEventListener('beforeunload', localStorage.removeItem('item_payment'))
    }, [])
    const handleDelete = (id) => {
        let listBookTemp = [...listBook]
        listBookTemp = listBookTemp.filter((item) => item.id !== id)
        setListBook(listBookTemp)
    }

    const handleChangeAmount = (id, amount) => {
        let listBookTemp = [...listBook]
        let book = listBookTemp.find(item => item.id === id)
        if (book) book.amount = amount
        setListBook(listBookTemp)
    }
    const handlePayment = (data) => {
        const product = listBook.map(item => {
            return {
                book: item.id,
                quantity: item.amount
            }
        })
        const dataPayment = {
            ...data,
            product
        }
        paymentAPI.createOrder(dataPayment)
        .then(rs => { 
            if(rs.status === 201){
                localStorage.removeItem('item_payment')
                useNotification.Success({
                    title: "Đặt hàng thành công!",
                    message:'Bạn đã đặt hàng thành công'
                })
                setListBook([])
            }
        })
        .catch(e => {
            useNotification.Error({
                title: "LỖI!",
                message:'Đặt hàng không thành công'
            })
        })
    }
    return (
        <div className='cart-detail-wrapper'>
            <Container fluid="">
                <Row>
                    <Col sm={8} className="list-book-col">
                        {listBook.length ? listBook.map((item, index) => (
                            <LargeCard
                                key={index}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                amount={item.amount}
                                total={item.count}
                                image={item.thumbnail}
                                slug={item.slug}
                                handleDelete={handleDelete}
                                handleChangeAmount={handleChangeAmount}
                                discount={item.discount}
                            />
                        )) :
                            <h2 style={{ marginTop: '200px' }}>Không có sản phẩm nào được chọn</h2>
                        }
                    </Col>
                    <Col sm={4} className="payment-col">
                        <div className='payment-box'>
                            <div className='header-payment'>
                                TÓM TẮT ĐƠN HÀNG
                            </div>
                            <div className='payment-content'>
                                <div className='payment-info'>
                                    <span>Sản phẩm</span>
                                    <span>{listBook.length ? listBook.reduce((acc, curr) => acc + curr.amount, 0) : 0}</span>
                                </div>
                                <div className='payment-info'>
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className='payment-info'>
                                    <span>TẠM TÍNH</span>
                                    <span>₫{listBook.length ? numeral(listBook.reduce((acc, curr) => acc + parseFloat(curr.price) * (100 - parseFloat(curr.discount)) / 100 * parseFloat(curr.amount), 0)).format(0, 0) : 0}</span>
                                </div>
                            </div>
                            <div className='footer-payment'>
                                <Button 
                                    style={{ width: '100%', borderRadius: '0' }}
                                    onClick={() => {
                                        setIsShowPayment(true)
                                    }}
                                    disabled={!listBook.length}
                                >Thanh toán</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <PaymentInfoModal show={isShowPayment} handleClose={() => setIsShowPayment(false)} handlePayment={handlePayment}/>
        </div>
    );
};

export default CartDetail;