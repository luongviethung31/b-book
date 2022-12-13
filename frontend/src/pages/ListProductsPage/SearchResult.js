import React from 'react';
import BookCart from 'components/Card/BookCard'
import MiniCard from 'components/Card/MiniCard';
import { Col, Container, Dropdown, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllAuthors, getAllGenre, getListProduct, getListProductSearch } from 'redux/reducers/product/action';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import SpinnerLoading from 'components/SpinnerLoading';
import PaginationCustom from 'components/PaginationCustom';
import LoadingPage from 'components/SpinnerLoading/LoadingPage';
import { useRef } from 'react';

const SEARCH_OPTION = [{
    title: 'Tiêu đề A - Z',
    value: 'asc_alphabet'
}, {
    title: 'Tiêu đề Z - A',
    value: 'desc_alphabet'
}, {
    title: 'Giá giảm',
    value: 'max_price'
}, {
    title: 'Giá tăng',
    value: 'min_price'
}]
let genreTitle = ''
let loadSuccess = false
function SearchResult() {
    const dispatch = useDispatch()
    let { by } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    let title = searchParams.get("title")
    const [page, setPage] = useState(1)
    const [countPage, setCountPage] = useState(0)
    const [sort, setSort] = useState(SEARCH_OPTION[0])
    const { listProduct, loading, loadingPage, listAuthors } = useSelector(store => store.product)

    const headerRef = useRef(null)
    useEffect(() => {
        dispatch(getListProductSearch(title, page, sort.value, (count) => { setCountPage(count); loadSuccess = true }))
    }, [page, sort])

    useEffect(() => {
        genreTitle = localStorage.getItem('genre_title')
        document.title = `BBook | Kết quả tìm kiếm`
        localStorage.removeItem('genre_title')
    }, [])

    useEffect(() => {
        if (!listAuthors.length) {
            dispatch(getAllAuthors())
        }
    }, [])
    return (
        <div className='list-item-session'>
            {
                (!loadSuccess && loading) ? <SpinnerLoading /> :
                    <Container fluid className='container-p-4' style={{ minHeight: '330px' }}>
                        <Row className='items-session' style={{ marginTop: '40px' }}>
                            <Col className='items--right-col' lg={3} style={{ borderRight: '1px solid gray' }}>
                                <h2 ref={headerRef}>LỌC THEO</h2>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className='filter-option' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Khuyến mãi</span><span>&#8250;</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='filter-option'>Tác giả</ListGroup.Item>
                                    <ListGroup style={{ paddingLeft: '20px' }}>
                                        {
                                            listAuthors.map((item, index) => (
                                                <a href={`/list-products/authors/${item.slug}`} key={index} style={{ textDecoration: 'none' }}>
                                                    <ListGroup.Item key={index} action variant="light" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => localStorage.setItem('genre_title', item.name)}>
                                                        <span>{item.name}</span><span>&#8250;</span>
                                                    </ListGroup.Item>
                                                </a>
                                            ))
                                        }
                                    </ListGroup>
                                    <ListGroup.Item className='filter-option' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Sách bán chạy</span><span>&#8250;</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='filter-option' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Sách mới</span><span>&#8250;</span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col className='items--left-col' lg={9}>
                                <Row className='new-book-wrapper'></Row>
                                <Row className='discount-book-wrapper'>
                                    <Col lg={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h2 >{`Kết quả tìm kiếm: `}<span style={{color:'gray'}}>{title}</span></h2>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                {`Sắp xếp: ${sort.title}`}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu variant='primary'>
                                                {
                                                    SEARCH_OPTION.map((opt, index) => (
                                                        <Dropdown.Item className='item-sort' style={{ color: 'gray !important' }} as='button' key={index} onClick={() => {
                                                            setSort(opt)
                                                            setPage(1)
                                                        }}>{opt.title}</Dropdown.Item>
                                                    ))
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
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
            {loadSuccess && loadingPage ? <LoadingPage /> : <></>}
        </div>
    );
}

export default SearchResult;