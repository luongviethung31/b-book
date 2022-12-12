import React, { useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import BookCart from 'components/Card/BookCard'
import NewBookPoster from 'components/NewBookPoster';
import CustomSlide from 'components/CustomSlider/CustomSlide';

import Policy from 'components/Policy';
import MiniCard from 'components/Card/MiniCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookId, getAllGenre, getBooksFromListId, setLoadingAI } from 'redux/reducers/product/action';
import SpinnerLoading from 'components/SpinnerLoading';
import FormatPrice from 'components/FormatPrice';
import bookAPI from 'api/bookAPI';
import genreAPI from 'api/genreAPI';

const Homepage = () => {
    const dispatch = useDispatch()
    const { listGenre, loading, loadingAI, ratingStatistics, listBookId, listBookReccomend } = useSelector(store => store.product)
    const [listBookBackup, setListBookBackup] = useState([])
    const [listRecommend, setListRecommend] = useState([])
    const { userInfo } = useSelector(store => store.auth)
    const [listAllAuthors, setListAllAuthors] = useState([])
    const [loadingAllBook, setLoadingAllBook] = useState(false)
    useEffect(() => {
        if (!listGenre.length) dispatch(getAllGenre())
    }, [])
    useEffect(() => {
        document.title =`BBook | Trang chủ`
    },[])
    useEffect(() => {
        genreAPI.getAllAuthors().then(rs => {
            if (rs.status === 200) {
                setListAllAuthors(rs.data)
            }
        }).catch(e => {
            console.log(e);
        })
    }, [])
    useEffect(() => {
        setLoadingAllBook(true)
        bookAPI.getAllBooks(1).then((rs) => {
            setLoadingAllBook(false)
            if (rs.status === 200) {
                setListBookBackup(rs.data.results)
            }
        }).catch(e => {
            setLoadingAllBook(false)
            console.log(e)
        })
    }, [])

    useEffect(() => {
        if (listBookReccomend.length) {
            setListRecommend([...listBookReccomend])
        }
        else {
            setListRecommend(listBookBackup.slice(7, 14))
        }
    }, [listBookReccomend, listBookBackup])
    console.log({ listBookReccomend });
    useEffect(() => {
        if (userInfo.last_name) {
            dispatch(getAllBookId((listId) => {
                    dispatch(setLoadingAI(true))
                    bookAPI.getRecommendedBook({
                        bookIds: listId.map(item => item?.id),
                        userId: userInfo.user_id
                    })
                        .then(rs => {
                            console.log(rs);
                            dispatch(setLoadingAI(false))
                            if (rs.status === 201) {
                                dispatch(getBooksFromListId({ list_recommend_book: rs.data }))
                            }
                        })
                        .catch(e => {
                            console.log(e)
                            dispatch(setLoadingAI(false))
                        })
            }))

        }
    }, [userInfo])
    return (
        <div className='home-page-container'>
            {loadingAllBook || loading || loadingAI ? <SpinnerLoading /> :
                <>
                    <Container fluid className='container-p-4'>
                        <Row className='instoduce-session'>
                            <Col className='menu-col' lg={3} md={0}>
                                <ListGroup>
                                    {
                                        listGenre.map((item, index) => (
                                            <a href={`/list-products/genres/${item.slug}`} key={index}>
                                                <ListGroup.Item key={index} action variant="light" style={{ textAlign: 'left' }} onClick={() => localStorage.setItem('genre_title', item.title)}>
                                                    {item.title}
                                                </ListGroup.Item>
                                            </a>
                                        ))
                                    }
                                </ListGroup>
                            </Col>
                            <Col className='main-contents-row' lg={9} md={12}>
                                <CustomSlide />
                            </Col>
                        </Row>
                        <Row className='new-book-session'>
                            {
                                listBookBackup.length ?
                                    <NewBookPoster
                                        title={listBookBackup[0].title}
                                        author={listBookBackup[0].author.name}
                                        description={listBookBackup[0].description}
                                        image={listBookBackup[0].thumbnail}
                                        discount={listBookBackup[0].discount}
                                        price={listBookBackup[0].price}
                                        slug={listBookBackup[0].slug}
                                    /> :
                                    <></>
                            }
                        </Row>
                        <Row className='items-session' style={{ marginTop: '40px' }}>
                            <Col className='items--left-col' lg={9}>
                                <Row className='discount-book-wrapper'>
                                    <Col lg={12}>
                                        <h2>SÁCH MỚI HAY</h2>
                                    </Col>
                                    {
                                        listBookBackup && listBookBackup.slice(1, 7).map((item, index) => (
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
                                    }
                                </Row>

                            </Col>
                            <Col className='items--right-col' lg={3}>
                                {listRecommend.length ?
                                    <a href={`/book-detail/${listRecommend[0].slug}`} style={{ textDecoration: 'none' }}>
                                        <h2>SÁCH DÀNH CHO BẠN</h2>
                                        <div className='best-recommend'>
                                            {
                                                listRecommend[0].discount ?
                                                    <div className='discount-flag'>{listRecommend[0].discount}%</div>
                                                    : <></>
                                            }
                                            <div className='image-row'>
                                                <img src={listRecommend[0].thumbnail} />
                                            </div>
                                            <div className='best-book-info'>
                                                <div className='best-title'>
                                                    <div className='title-1'>{listRecommend[0].title}</div>
                                                    <div className='title-2'>Tác giả:&nbsp;{listRecommend[0].author.name}</div>
                                                </div>
                                                <div className='best-description'>
                                                    {listRecommend[0].description}
                                                </div>
                                                <FormatPrice discount={listRecommend[0].discount} price={listRecommend[0].price} />
                                            </div>
                                        </div>
                                    </a>
                                    : (
                                        listBookBackup.length ?
                                            <a href={`/book-detail/${listBookBackup[0].slug}`} style={{ textDecoration: 'none' }}>
                                                <h2>SÁCH DÀNH CHO BẠN</h2>
                                                <div className='best-recommend'>
                                                    {
                                                        listBookBackup[0].discount ?
                                                            <div className='discount-flag'>{listBookBackup[0].discount}%</div>
                                                            : <></>
                                                    }
                                                    <div className='image-row'>
                                                        <img src={listBookBackup[0].thumbnail} />
                                                    </div>
                                                    <div className='best-book-info'>
                                                        <div className='best-title'>
                                                            <div className='title-1'>{listBookBackup[0].title}</div>
                                                            <div className='title-2'>Tác giả:&nbsp;{listBookBackup[0].author.name}</div>
                                                        </div>
                                                        <div className='best-description'>
                                                            {listBookBackup[0].description}
                                                        </div>
                                                        <FormatPrice discount={listBookBackup[0].discount} price={listBookBackup[0].price} />
                                                    </div>
                                                </div>
                                            </a> : <></>
                                    )
                                }

                            </Col>
                        </Row>
                        <Row className='items-session' style={{ marginTop: '40px' }}>
                            <Col className='items--left-col' lg={9}>
                                <Row className='discount-book-wrapper'>
                                    <Col lg={12}>
                                        <h2>CÓ THỂ BẠN CŨNG THÍCH</h2>
                                    </Col>
                                    {
                                        listRecommend?.slice(1)?.map((item, index) => (
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
                                    }
                                </Row>
                            </Col>
                            <Col className='items--right-col' lg={3}>
                                <h2>TÁC GIẢ - NHÀ VĂN</h2>
                                <ListGroup style={{ marginTop: '20px' }}>
                                    {
                                        listAllAuthors.map((item, index) => (
                                            <a href={`/list-products/authors/${item.slug}`} key={index} style={{ textDecoration: 'none' }}>
                                                <ListGroup.Item key={index} action variant="light" style={{ textAlign: 'left' }} onClick={() => localStorage.setItem('genre_title', item.name)}>
                                                    {item.name}
                                                </ListGroup.Item>
                                            </a>
                                        ))
                                    }
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                    <Policy />
                </>
            }
        </div>
    );
};

export default Homepage;