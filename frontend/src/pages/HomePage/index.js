import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import BookCart from 'components/Card/BookCard'
import NewBookPoster from 'components/NewBookPoster';
const dummyData = ['Category1', 'Category2', 'Category3', 'Category4', 'Category5', 'Category6']
const CustomSlide = ({ title }) => {
    return (
        <div>
            <h3>{title}</h3>
        </div>
    );
}
const DataBook = [{
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: '12tháng trước cả Việt Nam căng mình đối phó với đại dịch COVID-19. TP.HCM và vùng phụ cận bị tổn thương nặng nề, cả xã hội căng thẳng trong trạng thái giãn cách ai ở đâu ngồi yên ở đó. Hệ thống y tế quá tải, các bệnh viện chật kín bệnh nhân. Lực lượng y tế tuyến đầu luôn làm việc trong trạng thái căng thẳng, kiệt sức. Các khu công nghiệp hoặc đóng cửa hoặc thực hiện sản xuất ba tại chỗ cầm chừng. Hoạt động giao thông, vận chuyển hàng hóa giữa các địa phương trên cả nước gần như phong tỏa hoàn toàn nhằm ngăn chặn nguy cơ bùng phát dịch bệnh.',
    discount: '20%',
    price: '98000',
    image:'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image:'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image:'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image:'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image:'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
}, {
    title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
    author: 'Yuval Noah Harari',
    description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
    discount: '20%',
    price: '98000',
    image:'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg'
},]
const Homepage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className='home-page-container'>
            <Container fluid className='container-p-4'>
                <Row className='instoduce-session'>
                    <Col className='menu-col' lg={3} md={0}>
                        <ListGroup>
                            {
                                dummyData.map((item, index) => (
                                    <ListGroup.Item key={index} action variant="light">
                                        {item}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Col>
                    <Col className='main-contents-row' lg={9} md={12}>
                        <Slider {...settings}>
                            <CustomSlide title='Slide 1' />
                            <CustomSlide title='Slide 2' />
                            <CustomSlide title='Slide 3' />
                        </Slider>
                    </Col>
                </Row>
                <Row className='new-book-session'>
                    <NewBookPoster
                        title={DataBook[0].title} 
                        author={DataBook[0].author}
                        description={DataBook[0].description}
                        image={DataBook[0].image}
                        discount={DataBook[0].discount}
                        price={DataBook[0].price}
                    />
                </Row>
                <Row className='items-session'>
                    <Col className='items--left-col' lg={9}>
                        <Row className='new-book-wrapper'></Row>
                        <Row className='discount-book-wrapper'>
                            <Col lg={12}>
                                <h2>SÁCH BÁN CHẠY</h2>
                            </Col>
                            {
                                DataBook.map((item, index) => (
                                    <Col lg={4} key={index}>
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
                    </Col>
                    <Col className='items--right-col' lg={3}></Col>
                </Row>
            </Container>
        </div>
    );
};

export default Homepage;