import paymentAPI from 'api/paymentAPI';
import BookCardOrder from 'components/Card/BookCardOrder';
import LargeCard from 'components/Card/LargeCard';
import PaymentInfoModal from 'components/modal/PaymentInfoModal';
import useNotification from 'hooks/notification';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

const UserOrder = () => {
    const [listBookPaid, setListBookPaid] = useState([])
    const [listBookNotPaid, setListBookNotPaid] = useState([])
    const [key, setKey] = useState('paid');

    useEffect(() => {
        paymentAPI.getAllUserOrder()
            .then(rs => {
                if (rs.status === 200) {
                    console.log(rs);
                    setListBookNotPaid(rs.data.filter((item) => !item.is_paid))
                    setListBookPaid(rs.data.filter((item) => item.is_paid))
                }
            })
            .catch(e => {
                console.log(e);
            })
    }, [])
    return (
        <div className='cart-detail-wrapper'>
            <Container fluid="">
                <Row className='mt-4'>
                    <Col sm={8} className="list-book-col">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab className='title-tab' eventKey="paid" title="Đã thanh toán">
                            {
                                   listBookPaid.length ? listBookNotPaid.map((order, index) => (
                                        <div key={index} style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', padding:'10px', marginBottom:'20px'}}>
                                            <div className='order-date' style={{
                                                fontSize:'12px', textAlign:'left', padding:'10px'
                                            }}>Thời gian:&nbsp; {new Date(order.ship_date).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
                                            {
                                                order.order_detail.map((item, _index) => (
                                                    <BookCardOrder
                                                        key={_index}
                                                        id={item.id}
                                                        title={item.book.title}
                                                        price={item.book.price}
                                                        amount={item.quantity}
                                                        author={item.book.author}
                                                        // image={item.book.thumbnail}
                                                        slug={item.book.slug}
                                                    />
                                                ))
                                            }
                                            <div className='order-date' style={{
                                                fontSize:'16px', textAlign:'right', padding:'10px',
                                            }}>Đã thanh toán:&nbsp; <span style={{color:'orange'}}>₫{numeral(parseFloat(order.total)).format("0,0")}</span></div>
                                        </div>
                                    )): <h2>Không có sản phẩm nào</h2>
                                }
                            </Tab>
                            <Tab className='title-tab' eventKey="not-paid" title="Chưa thanh toán">
                            {
                                   listBookNotPaid.length ? listBookNotPaid.map((order, index) => (
                                        <div key={index} style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', padding:'10px', marginBottom:'20px'}}>
                                            <div className='order-date' style={{
                                                fontSize:'12px', textAlign:'left', padding:'10px'
                                            }}>Thời gian:&nbsp; {new Date(order.ship_date).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
                                            {
                                                order.order_detail.map((item, _index) => (
                                                    <BookCardOrder
                                                        key={_index}
                                                        id={item.id}
                                                        title={item.book.title}
                                                        price={item.book.price}
                                                        amount={item.quantity}
                                                        author={item.book.author}
                                                        image={item.book.thumbnail}
                                                        slug={item.book.slug}
                                                    />
                                                ))
                                            }
                                            <div className='order-date' style={{
                                                fontSize:'16px', textAlign:'right', padding:'10px',
                                            }}>Chưa thanh toán:&nbsp; <span style={{color:'orange'}}>₫{numeral(parseFloat(order.total)).format("0,0")}</span></div>
                                        </div> 
                                    )):<h2>Không có sản phẩm nào</h2>
                                }
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserOrder;