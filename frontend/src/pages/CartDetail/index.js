import LargeCard from 'components/Card/LargeCard';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
const DataBook = [{
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: '12tháng trước cả Việt Nam căng mình đối phó với đại dịch COVID-19. TP.HCM và vùng phụ cận bị tổn thương nặng nề, cả xã hội căng thẳng trong trạng thái giãn cách ai ở đâu ngồi yên ở đó. Hệ thống y tế quá tải, các bệnh viện chật kín bệnh nhân. Lực lượng y tế tuyến đầu luôn làm việc trong trạng thái căng thẳng, kiệt sức. Các khu công nghiệp hoặc đóng cửa hoặc thực hiện sản xuất ba tại chỗ cầm chừng. Hoạt động giao thông, vận chuyển hàng hóa giữa các địa phương trên cả nước gần như phong tỏa hoàn toàn nhằm ngăn chặn nguy cơ bùng phát dịch bệnh.',
    discount: '20%',
    price: '98000',
    amount: 2,
    image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
},{
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    amount: 2,
    image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
},]

const CartDetail = () => {
    const handleDelete = () => {

    }
    return (
        <div className='cart-detail-wrapper'>
            <Container fluid="">
                <Row>
                    <Col sm={8} className="list-book-col">
                        {DataBook.map((item, index) => (
                            <LargeCard 
                                key={index} 
                                title={item.title} 
                                price={item.price} 
                                amount={item.amount}
                                image={item.image}
                                handleDelete={() => handleDelete()}
                            />
                        ))}
                    </Col>
                    <Col sm={4} className="payment-col">
                        <div className='payment-box'>
                            <div className='header-payment'>
                                TÓM TẮT ĐƠN HÀNG
                            </div>
                            <div className='payment-content'>
                                <div className='payment-info'>
                                    <span>Sản phẩm</span>
                                    <span>2</span>
                                </div>
                                <div className='payment-info'>
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className='payment-info'>
                                    <span>TẠM TÍNH</span>
                                    <span>98.000</span>
                                </div>
                            </div>
                            <div className='footer-payment'>
                                <Button style={{width: '100%', borderRadius:'0'}}>Thanh toán</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
};

export default CartDetail;