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

// const bookDetail = {
//   title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
//   author: 'Yuval Noah Harari',
//   description: '12tháng trước cả Việt Nam căng mình đối phó với đại dịch COVID-19. TP.HCM và vùng phụ cận bị tổn thương nặng nề, cả xã hội căng thẳng trong trạng thái giãn cách ai ở đâu ngồi yên ở đó. Hệ thống y tế quá tải, các bệnh viện chật kín bệnh nhân. Lực lượng y tế tuyến đầu luôn làm việc trong trạng thái căng thẳng, kiệt sức. Các khu công nghiệp hoặc đóng cửa hoặc thực hiện sản xuất ba tại chỗ cầm chừng. Hoạt động giao thông, vận chuyển hàng hóa giữa các địa phương trên cả nước gần như phong tỏa hoàn toàn nhằm ngăn chặn nguy cơ bùng phát dịch bệnh.',
//   discount: 20,
//   price: 98000,
//   image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg',
//   publisher: 'Kim Đồng',
//   year: '2022',
//   totalPage: 200
// }
const dataComment = [{
  user: 'Luong Mau Viet Hung',
  rating: 5,
  comment: 'Thực sự rất hay, từng câu chuyện về các kĩ năng mềm cho bạn trẻ đc tác giả dạy bảo qua lối kể chuyện hóm hỉnh, hài hước. Và phải công nhận là học được nhiều điều qua quyển sách này, giúp bạn đọc có thêm động lực để hoàn thiện bản thân hơn nữa Shipper cũng vui vẻ, tích cực. Nếu bạn nào yêu thích về tác giả Tony nên đọc quyển sách này, rất hay!',
  date: '20/11/2022'
}]

const BookDetail = () => {
  let { slug } = useParams();
  const [tab, setTab] = useState(1)
  const [isShowLoginModal, setIsShowLoginModal] = useState(false)
  const [bookDetail, setBookDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const [countBuy, setCountBuy] = useState(1)

  useEffect(() => {
    setLoading(true)
    bookAPI.getBookDetail(slug)
      .then(rs => {
        if (rs.status === 200) {
          console.log(rs);
          setBookDetail(rs.data)
          setLoading(false)
        }
      })
      .catch(e => {
        console.log(e);
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    console.log(bookDetail);
  }, [bookDetail])

  const handleSendFeedback = (data) => {
    console.log(data);
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
  return (
    <>
      {loading ? <SpinnerLoading /> : Object.keys(bookDetail).length &&
        <div className="book-details-session">
          <Container fluid="">
            <Row>
              <Col sm={9}>
                <Row>
                  <Col sm={4}>
                    <img src={bookDetail.thumbnail} alt={bookDetail.title} width="100%" height="auto" style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}/>
                  </Col>
                  <Col sm={8}>
                    <h4 className="title">{bookDetail.title}</h4>
                    <div className="author">
                      Tác giả: <span>{bookDetail.author.name}</span>
                    </div>
                    <div className="publisher">
                      Nhà xuất bản: <span>{bookDetail.author.name}</span>
                    </div>
                    <div className="year">
                      Năm phát hành: <span>{bookDetail.release}</span>
                    </div>
                    <div className="total-page">
                      Số lượng: <span>{bookDetail.count}</span>
                    </div>
                    <div className="description-content">{bookDetail.description}</div>
                    <a href="#">Xem thêm</a>
                    <div className="devider" />
                    <div className="price-row">
                      <FormatPrice discount={bookDetail.discount} price={bookDetail.price} />
                      <Button>Thêm vào giỏ hàng</Button>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm={3} className="payment-col">
                <div className="payment-info">
                  <div className="payment-box">
                    <div className="title">THÔNG TIN THANH TOÁN</div>
                    <div className="devider" />
                    <div className="old-price  mt-2">
                      Giá bìa: <span>₫{numeral(parseInt(bookDetail.price) * countBuy).format(0, 0)}</span>
                    </div>
                    <div className="new-price  mt-2">
                      Giá bán: <span>₫{numeral((bookDetail.price * (100 - bookDetail.discount) * countBuy) / 100).format("0,0")}</span>
                    </div>
                    <div className="discount-price mt-2">
                      Tiết kiệm: <span>₫{numeral(parseInt(bookDetail.price) * bookDetail.discount / 100 * countBuy).format("0,0")}</span>
                    </div>
                    <div className="amount">
                      Số lượng:
                      <ButtonGroup
                        className="me-2 mt-2 ml-2"
                        aria-label="Second group"
                        size="sm"
                      >
                        <Button disabled={countBuy === 1} onClick={() => { setCountBuy(countBuy => countBuy - 1) }}>-</Button>
                        <Button disabled>{countBuy}</Button>
                        <Button disabled={countBuy === bookDetail.count} onClick={() => { setCountBuy(countBuy => countBuy + 1) }}>+</Button>
                      </ButtonGroup>
                    </div>
                    <div className="devider" />
                    <div className="action-btn">
                      <Button className="mt-2" variant="primary" size="sm">
                        Thanh toán
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="list-menu-wrapper">
              <span
                className={`list-menu-detail ${tab === 1 ? 'active-tab' : ''}`}
                sm={2}
                onClick={() => { setTab(1) }}
              >
                Giới thiệu sách
              </span>
              <span
                className={`list-menu-detail ${tab === 2 ? 'active-tab' : ''}`}
                sm={2}
                onClick={() => { setTab(2) }}
              >
                Thông tin chi tiết
              </span>
              <span
                className={`list-menu-detail ${tab === 3 ? 'active-tab' : ''}`}
                sm={2}
                onClick={() => { setTab(3) }}
              >
                Đánh giá
              </span>
            </div>
            <div className="book-introduce-wrapper">
              <div className="book-title">{bookDetail.title}</div>
              {bookDetail.description}
            </div>
            <Row className="book-detail-wrapper">
              <h2 className="book-detail-wrapper__title">Thông tin chi tiết</h2>
              <Col sm={2}>
                <div className="item-detail">&#x2022; Tác giả:</div>
                <div className="item-detail">&#x2022; Nhà xuất bản:</div>
                <div className="item-detail">&#x2022; Thể loại:</div>
                <div className="item-detail">&#x2022; Năm phát hành:</div>
              </Col>
              <Col sm={3}>
                <div className="item-detail">{bookDetail.author.name}</div>
                <div className="item-detail">Fake</div>
                <div className="item-detail">{bookDetail.genre.title}</div>
                <div className="item-detail">{bookDetail.release}</div>
              </Col>
            </Row>
            <Row className="comment-wrapper">
              <h2>Nhận xét từ khách hàng</h2>
              {
                dataComment.map((item, index) => (
                  <Comment key={index} user={item.user} rating={item.rating} comment={item.comment} date={item.date} />
                ))
              }
            </Row>
            <Row className="book-rating-wrapper">
              <Col sm={8}>
                <RatingBook numberRating={5} avarageRating={'5.0'} />
              </Col>
              <Col sm={4}>
                <div className="btn-login">
                  <div>Đăng nhập để gửi nhận xét của bạn!</div>
                  <Button className="btn btn-login" onClick={() => setIsShowLoginModal(true)}>
                    Đăng nhập
                  </Button>
                  <div>Bạn chưa có tài khoản?<a href="/register">Đăng ký </a></div>
                </div>
              </Col>
            </Row>
            <Row>
              <FeedbackForm handleSendFeedback={handleSendFeedback} />
            </Row>
            <Row className="recommend-books">
              <div>
                <h2 style={{ margin: '20px 0', textAlign: 'center', fontFamily: 'monospace', color: 'darkblue' }}>CÓ THỂ BẠN ĐANG TÌM KIẾM</h2>

                <Slider {...settings} style={{ padding: '20px' }}>
                  {
                    bookDetail.related_books.slice(0, 10)
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
          <LoginModal show={isShowLoginModal} handleClose={() => setIsShowLoginModal(false)} />
        </div>}
    </>
  );
};
export default BookDetail;