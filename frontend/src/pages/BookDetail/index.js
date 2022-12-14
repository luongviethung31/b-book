import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button, ButtonGroup } from "react-bootstrap";
import FormatPrice from "components/FormatPrice";
import RatingBook from "./RatingBook";
import Comment from "./Comment";
import FeedbackForm from "./FeedbackForm";
import LoginModal from "components/modal/LoginModal";
import bookAPI from "api/bookAPI";
import { useParams } from "react-router-dom";
import SpinnerLoading from "components/SpinnerLoading";
import BookCart from 'components/Card/BookCard'
import Slider from 'react-slick';
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import { handleShowLoginModal } from "redux/reducers/auth/action";
import { createRating, getAllBookId, getAllComment, getBooksFromListId, getRatingStatistics } from "redux/reducers/product/action";
import PaginationCustom from "components/PaginationCustom";
import { useRef } from "react";
import LoadingPage from "components/SpinnerLoading/LoadingPage";
import CartIcon from 'assets/icons/cart-icon.svg'
import genreAPI from "api/genreAPI";
import useNotification from "hooks/notification";

const BookDetail = () => {
  let { slug } = useParams();
  const dispatch = useDispatch()
  const [tab, setTab] = useState(1)
  const [bookDetail, setBookDetail] = useState({})
  const [listRecommendedBook, setListRecommendedBook] = useState([])
  const [page, setPage] = useState(1)
  const [countBuy, setCountBuy] = useState(1)
  const [loading, setLoading] = useState(false)
  const { userInfo } = useSelector(store => store.auth)
  const { listComment, ratingStatistics, listBookId, listBookReccomend, loadingPage} = useSelector(store => store.product)
  const commentRef = useRef(null)
  useEffect(() => {
    dispatch(getRatingStatistics(slug))
    if(listBookId.length) dispatch(getAllBookId())
    setLoading(true)
    bookAPI.getBookDetail(slug, page)
      .then(rs => {
        if (rs.status === 200) {
          setBookDetail(rs.data)
          setLoading(false)
          if(!listRecommendedBook.length) setListRecommendedBook(rs.data?.related_books)
        } else {
          setLoading(false)
        }
      })
      .catch(e => {
        setLoading(false)
        console.log(e);
      })
  }, [])
  useEffect(() => {
    // document.title =`BBook | ${bookDetail?.title}`

  }, [bookDetail])
  useEffect(() => {
    if(listBookId?.length && userInfo.last_name) 
      bookAPI.getRecommendedBook({
        bookIds: listBookId,
        userId: userInfo.user_id
      })
      .then(rs => {
        if(rs.status === 201) {
          dispatch(getBooksFromListId({list_recommend_book: rs.data}, (data) => {setListRecommendedBook(data)}))
        }
      })
      .catch(e => {
        console.log(e)
        setListRecommendedBook(Object.keys(bookDetail).length ? bookDetail.related_books : [])
      })
  }, [listBookId])

  useEffect(() => {
   dispatch(getAllComment({slug, page}))
  }, [page])

  const handleSendFeedback = (data) => {
    dispatch(createRating(slug,{
      ...data,
      user: userInfo.email
    }))
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    // prevArrow: <PreArrow />,
    // nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
    ]
  };
  const handleClickPayment = () => {
    let product = [{ ...bookDetail, amount: countBuy }]
    localStorage.setItem('item_payment', JSON.stringify(product))
    window.open('/cart-page', '_self')
  }

  const handleClickAddToCart = () => {
    let listBookCart = localStorage.getItem('cart_items')
    if(listBookCart) {
      listBookCart = JSON.parse(listBookCart)
    } else {
      listBookCart = []
    }
    let index = listBookCart.findIndex(item => item.id === bookDetail.id)
    if(index !== -1) {
      listBookCart[index].amount += 1
    } else {
      listBookCart.unshift({ ...bookDetail, amount: 1 })
    }
      useNotification.Success({
        title:'TH??NH C??NG!',
        message:'B???n ???? th??m m???t s???n ph???m v??o gi??? h??ng'
      })
    localStorage.setItem('cart_items', JSON.stringify(listBookCart))
  }
  return (
    <>
      {loading ? <SpinnerLoading/> :
        Object.keys(bookDetail).length ?
        <div className="book-details-session">
          <Container className="container-p-4" fluid>
            <Row>
              <Col sm={9}>
                <Row>
                  <Col sm={4}>
                    <img src={bookDetail.thumbnail} alt={bookDetail.title} width="100%" height="auto" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} />
                  </Col>
                  <Col sm={8}>
                    <h4 className="title">{bookDetail.title}</h4>
                    <div className="author">
                      T??c gi???: <span>{bookDetail?.author?.name}</span>
                    </div>
                    <div className="publisher">
                      Nh?? xu???t b???n: <span>{bookDetail?.author?.name}</span>
                    </div>
                    <div className="year">
                      N??m ph??t h??nh: <span>{bookDetail?.release}</span>
                    </div>
                    <div className="total-page">
                      S??? l?????ng: <span>{bookDetail.count}</span>
                    </div>
                    <div className="description-content">{bookDetail.description}</div>
                    <a href="#des">Xem th??m</a>
                    <div className="devider" />
                    <div className="price-row">
                      <FormatPrice discount={bookDetail.discount} price={bookDetail.price} />
                      <Button onClick={handleClickAddToCart}>Th??m v??o gi??? h??ng</Button>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm={3} className="payment-col">
                <div className="payment-info">
                  <div className="payment-box">
                    <div className="title">TH??NG TIN THANH TO??N</div>
                    <div className="devider" />
                    <div className="old-price  mt-2 d-flex justify-content-between">
                      <span>Gi?? b??a:</span><span>???{numeral(parseInt(bookDetail.price) * countBuy).format(0, 0)}</span>
                    </div>
                    <div className="new-price  mt-2 d-flex justify-content-between">
                      <span>Gi?? b??n:</span><span style={{fontSize: '20px', color:'orange'}}>???{numeral((bookDetail.price * (100 - bookDetail.discount) * countBuy) / 100).format("0,0")}</span>
                    </div>
                    <div className="discount-price mt-2 d-flex justify-content-between">
                      <span>Ti???t ki???m:</span><span style={{color:'#52ab98'}}>???{numeral(parseInt(bookDetail.price) * bookDetail.discount / 100 * countBuy).format("0,0")}</span>
                    </div>
                    <div className="amount justify-content-between mt-2">
                      <span>S??? l?????ng:</span>
                      <ButtonGroup
                        aria-label="Second group"
                        size="sm"
                      >
                        <Button variant="secondary" disabled={countBuy === 1} onClick={() => { setCountBuy(countBuy => countBuy - 1) }}>-</Button>
                        <Button variant="secondary" disabled>{countBuy}</Button>
                        <Button variant="secondary" disabled={countBuy === bookDetail.count} onClick={() => { setCountBuy(countBuy => countBuy + 1) }}>+</Button>
                      </ButtonGroup>
                    </div>
                    <div className="devider" />
                    <div className="action-btn" style={{justifyContent:'center', display:'flex'}}>
                      <Button className="mt-2" variant="warning" size="md" onClick={handleClickPayment}>
                        <img src={CartIcon} style={{marginRight:'5px'}}/>THANH TO??N
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="list-menu-wrapper">
              <a
                href='#des'
                className={`list-menu-detail ${tab === 1 ? 'active-tab' : ''}`}
                sm={2}
                onClick={() => { setTab(1) }}
              >
                Gi???i thi???u s??ch
              </a>
              <a
                href="#info"
                className={`list-menu-detail ${tab === 2 ? 'active-tab' : ''}`}
                sm={2}
                onClick={() => { setTab(2) }}
              >
                Th??ng tin chi ti???t
              </a>
              <a
                href="#comment"
                className={`list-menu-detail ${tab === 3 ? 'active-tab' : ''}`}
                sm={2}
                onClick={() => { setTab(3) }}
              >
                ????nh gi??
              </a>
            </div>
            <div className="book-introduce-wrapper" id='des'>
              <div className="book-title">{bookDetail.title}</div>
              {bookDetail.description}
            </div>
            <Row className="book-detail-wrapper">
              <h2 className="book-detail-wrapper__title" id="info">Th??ng tin chi ti???t</h2>
              <Col sm={2}>
                <div className="item-detail">&#x2022; T??c gi???:</div>
                <div className="item-detail">&#x2022; Nh?? xu???t b???n:</div>
                <div className="item-detail">&#x2022; Th??? lo???i:</div>
                <div className="item-detail">&#x2022; N??m ph??t h??nh:</div>
              </Col>
              <Col sm={3}>
                <div className="item-detail">{bookDetail.author.name}</div>
                <div className="item-detail">NXB H?? N???i</div>
                <div className="item-detail">{bookDetail.genre.title}</div>
                <div className="item-detail">{bookDetail.release}</div>
              </Col>
            </Row>
            <Row className="comment-wrapper">
              <h2 ref={commentRef} id='comment'>Nh???n x??t t??? kh??ch h??ng</h2>
              {
                listComment?.results?.length ? 
                <Row>
                  <Col sm={12} md={8}>
                    {
                      listComment?.results?.map((item, index) => (
                        <Comment key={index} user={item.user.email} rating={item.rating} comment={item.comment} date={item.created_date} />
                      ))
                    }
                  </Col>
                </Row> :
                <h6 style={{fontSize: '16px !important', color:'#000'}}>Ch??a c?? ????nh gi??! H??y l?? ng?????i ?????u ti??n ????nh gi?? s??ch n??y...</h6>
              }
              <PaginationCustom 
                currentPage={page} 
                totalPage={listComment?.count} 
                onChangePage={(pageNum) => {
                  setPage(pageNum);
                  commentRef?.current?.scrollIntoView()
                }}
              />
            </Row>
            <Row className="book-rating-wrapper">
              <Col lg={6} md={12}>
                {!userInfo?.last_name && <div className="btn-login">
                  <div>????ng nh???p ????? g???i nh???n x??t c???a b???n!</div>
                  <Button className="btn btn-login" onClick={() => dispatch(handleShowLoginModal(true))}>
                    ????ng nh???p
                  </Button>
                  <div>B???n ch??a c?? t??i kho???n?<a href="/register">????ng k?? </a></div>
                </div>}
                {userInfo?.last_name && <FeedbackForm handleSendFeedback={handleSendFeedback} />}
              </Col>
              <Col lg={6} md={12}>
                <RatingBook 
                  numberRating={listComment.count}
                  avarageRating={parseFloat(bookDetail.avarage_rating)}
                  listRating={ratingStatistics}
                />
              </Col>
            </Row>
            <Row className="recommend-books mt-5">
              <div>
                <h2 style={{ textAlign: 'left', fontFamily: 'monospace', color: 'darkblue' }}>C?? TH??? B???N S??? TH??CH</h2>
                <Slider {...settings} style={{ padding: '20px' }}>
                  {
                    listRecommendedBook
                      .map((item, index) => (
                        <a href={`/book-detail/${item.slug}`} key={index}>
                          <BookCart
                            title={item.title}
                            discount={item.discount}
                            price={item.price}
                            description={item.description}
                            author={item.author.name}
                            image={item.thumbnail}
                          />
                        </a>
                      ))
                  }
                </Slider>
              </div>
            </Row>
          </Container>
        </div> : <></>}
          {!loading && loadingPage ? <LoadingPage/> : <></>}
    </>
  );
};
export default BookDetail;