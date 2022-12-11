import React from 'react';
import BookCart from 'components/Card/BookCard'
import MiniCard from 'components/Card/MiniCard';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getListProduct } from 'redux/reducers/product/action';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import SpinnerLoading from 'components/SpinnerLoading';
import PaginationCustom from 'components/PaginationCustom';
import LoadingPage from 'components/SpinnerLoading/LoadingPage';
import { useRef } from 'react';

let genreTitle =''
let loadSuccess = false
function ListProductsPage() {
    const dispatch = useDispatch()
    let { slug, by } = useParams();
    const [page, setPage] = useState(1)
    const [countPage, setCountPage] = useState(0)
    const { listProduct, loading, loadingPage } = useSelector(store => store.product)
    
    const headerRef = useRef(null)
    useEffect(() => {
        dispatch(getListProduct(by, slug, page, (count) => {setCountPage(count); loadSuccess=true}))
    }, [slug, by, page])
    useEffect(() => {
        genreTitle = localStorage.getItem('genre_title')
        document.title =`BBook | ${genreTitle ? genreTitle : slug.replaceAll('-', ' ')}`
        localStorage.removeItem('genre_title')
    },[slug])
    return (
        <div className='list-item-session'>
            {
                ( !loadSuccess && loading) ? <SpinnerLoading /> :
                    <Container fluid className='container-p-4' style={{minHeight:'330px'}}>
                        <Row className='items-session' style={{ marginTop: '40px' }}>
                            <Col className='items--right-col' lg={3} style={{ borderRight: '1px solid gray' }}>
                                <h2 ref={headerRef}>LỌC THEO</h2>
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
                                        <h2 >{genreTitle ? genreTitle.toUpperCase() : slug.replaceAll('-', ' ').toUpperCase()}</h2>
                                    </Col>
                                    {
                                        listProduct?.length ?
                                        listProduct?.map((item, index) => (
                                            <Col className='book-card-col' lg={4} key={index}>
                                                <a href={`/book-detail/${item.slug}`}>
                                                    <BookCart
                                                        title={item.title}
                                                        discount={item.discount}
                                                        price={item.price}
                                                        description={item.description}
                                                        author={item.author.name}
                                                        image={item.thumbnail}
                                                    />
                                                </a>
                                            </Col>
                                        ))
                                        :
                                        <h4>Không có sản phẩm </h4>
                                    }
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <PaginationCustom 
                                            currentPage={page} 
                                            onChangePage={(page) => {
                                            setPage(page)
                                            headerRef.current?.scrollIntoView()
                                            }} 
                                            totalPage={countPage} 
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
            }
            {loadSuccess && loadingPage ? <LoadingPage/> :<></>}
        </div>
    );
}

export default ListProductsPage;