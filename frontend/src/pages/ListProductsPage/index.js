import React from 'react';
import BookCart from 'components/Card/BookCard'
import MiniCard from 'components/Card/MiniCard';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import ListPagination from 'components/ListPagination';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getListProductGenre } from 'redux/reducers/product/action';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import SpinnerLoading from 'components/SpinnerLoading';

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
    const dispatch = useDispatch()
    let { slug } = useParams();
    const [listBooks, setListBooks] = useState([])
    const { listProduct, loading, genreTitle } = useSelector(store => store.product)

    useEffect(() => {
        dispatch(getListProductGenre(slug))
    }, [slug])
    console.log({ listProduct });
    return (
        <div className='list-item-session'>
            {
                loading ? <SpinnerLoading /> :
                    <Container fluid className='container-p-4' style={{minHeight:'330px'}}>
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
                                        <h2>{genreTitle.toUpperCase()}</h2>
                                    </Col>
                                    {
                                        listProduct?.length ?
                                        listProduct?.map((item, index) => (
                                            <Col className='book-card-col' lg={4} key={index}>
                                                {console.log(item)}
                                                <BookCart
                                                    title={item.title}
                                                    discount='10%'
                                                    price={item.price}
                                                    description='TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm'
                                                    author={item.author.name}
                                                    image={item.thumbnail}
                                                />
                                            </Col>
                                        ))
                                        :
                                        <h4>Không có sản phẩm </h4>
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
            }
        </div>
    );
}

export default ListProductsPage;