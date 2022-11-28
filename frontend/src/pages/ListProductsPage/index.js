import React from 'react';
import BookCart from 'components/Card/BookCard'
import MiniCard from 'components/Card/MiniCard';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import ListPagination from 'components/ListPagination';

const DataBook = [{
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: '12tháng trước cả Việt Nam căng mình đối phó với đại dịch COVID-19. TP.HCM và vùng phụ cận bị tổn thương nặng nề, cả xã hội căng thẳng trong trạng thái giãn cách ai ở đâu ngồi yên ở đó. Hệ thống y tế quá tải, các bệnh viện chật kín bệnh nhân. Lực lượng y tế tuyến đầu luôn làm việc trong trạng thái căng thẳng, kiệt sức. Các khu công nghiệp hoặc đóng cửa hoặc thực hiện sản xuất ba tại chỗ cầm chừng. Hoạt động giao thông, vận chuyển hàng hóa giữa các địa phương trên cả nước gần như phong tỏa hoàn toàn nhằm ngăn chặn nguy cơ bùng phát dịch bệnh.',
    discount: '20%',
    price: '98000',
    image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
},]

function ListProductsPage() {
    return (
        <div className='list-item-session'>
            <Container fluid className='container-p-4'>
                <Row className='items-session' style={{ marginTop: '40px' }}>
                    <Col className='items--right-col' lg={3} style={{ borderRight: '1px solid gray' }}>
                        <h2>LỌC THEO</h2>
                        <ListGroup variant="flush">
                            <ListGroup.Item className='filter-option'>Khuyến mãi</ListGroup.Item>
                            <ListGroup.Item className='filter-option'>Tác giả</ListGroup.Item>
                            <ListGroup.Item className='filter-option'>Sách bán chạy</ListGroup.Item>
                            <ListGroup.Item className='filter-option'>Sách mới</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col className='items--left-col' lg={9}>
                        <Row className='new-book-wrapper'></Row>
                        <Row className='discount-book-wrapper'>
                            <Col lg={12}>
                                <h2>SÁCH KHOA HỌC</h2>
                            </Col>
                            {
                                DataBook.map((item, index) => (
                                    <Col className='book-card-col' lg={4} key={index}>
                                        <BookCart
                                            title={item.title}
                                            discount={item.discount}
                                            price={item.price}
                                            description={item.description}
                                            author={item.author}
                                            image={item.image}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <ListPagination />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ListProductsPage;