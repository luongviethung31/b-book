import React, { useState } from "react";
import { Col, Row, Container, Button, ButtonGroup } from "react-bootstrap";
import FormatPrice from "components/FormatPrice";
const bookDetail = {
  title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
  author: 'Yuval Noah Harari',
  description: '12tháng trước cả Việt Nam căng mình đối phó với đại dịch COVID-19. TP.HCM và vùng phụ cận bị tổn thương nặng nề, cả xã hội căng thẳng trong trạng thái giãn cách ai ở đâu ngồi yên ở đó. Hệ thống y tế quá tải, các bệnh viện chật kín bệnh nhân. Lực lượng y tế tuyến đầu luôn làm việc trong trạng thái căng thẳng, kiệt sức. Các khu công nghiệp hoặc đóng cửa hoặc thực hiện sản xuất ba tại chỗ cầm chừng. Hoạt động giao thông, vận chuyển hàng hóa giữa các địa phương trên cả nước gần như phong tỏa hoàn toàn nhằm ngăn chặn nguy cơ bùng phát dịch bệnh.',
  discount: 20,
  price: 98000,
  image: 'https://www.vinabook.com/images/thumbnails/product/115x/372171_sapiens-luoc-su-loai-nguoi-bang-tranh-tap-2-nhung-tru-cot-cua-nen-van-minh.jpg',
  publisher: 'Kim Đồng',
  year: '2022',
  totalPage: 200
}

const BookDetail = ({
  title,
  image,
  price,
  discount,
  description,
  author,
  publisher,
  year,
  totalPage
} = bookDetail) => {
  const [tab, setTab] = useState(1)
  return (
    <div className="book-details-session">
      <Container fluid="">
        <Row>
          <Col sm={9}>
            <Row>
              <Col sm={4}>
                <img src={bookDetail.image} alt={bookDetail.title} width="100%" height="auto" />
              </Col>
              <Col sm={8}>
                <h4 className="title">{bookDetail.title}</h4>
                <div className="author">
                  Tác giả: <span>{bookDetail.author}</span>
                </div>
                <div className="publisher">
                  Nhà xuất bản: <span>{bookDetail.publisher}</span>
                </div>
                <div className="year">
                  Năm phát hành: <span>{bookDetail.year}</span>
                </div>
                <div className="total-page">
                  Số trang: <span>{bookDetail.totalPage}</span>
                </div>
                <div className="description">{bookDetail.description}</div>
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
                  Giá bìa: <span>{bookDetail.price}</span>
                </div>
                <div className="new-price  mt-2">
                  Giá bán: <span>{bookDetail.price}</span>
                </div>
                <div className="discount-price mt-2">
                  Tiết kiệm: <span>{bookDetail.discount}</span>
                </div>
                <div className="amount">
                  Số lượng:
                  <ButtonGroup
                    className="me-2 mt-2 ml-2"
                    aria-label="Second group"
                    size="sm"
                  >
                    <Button>-</Button>
                    <Button>1</Button> <Button>+</Button>
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
            onClick={() => {setTab(1)}}
          >
            Giới thiệu sách
          </span>
          <span 
            className={`list-menu-detail ${tab === 2 ? 'active-tab' : ''}`} 
            sm={2}
            onClick={() => {setTab(2)}}
          >
            Thông tin chi tiết
          </span>
          <span 
            className={`list-menu-detail ${tab === 3 ? 'active-tab' : ''}`} 
            sm={2}
            onClick={() => {setTab(3)}}
          >
            Đánh giá
          </span>
        </div>
        <div className="book-introduce-wrapper">
          <div className="book-title">{bookDetail.title}</div>
          {bookDetail.description}
        </div>
        <Row className="book-detail-wrapper">
          <div className="book-detail-wrapper__title">Thông tin chi tiết</div>
          <Col sm={2}>
            <div className="item-detail">&#x2022; Tác giả:</div>
            <div className="item-detail">&#x2022; Nhà xuất bản:</div>
            <div className="item-detail">&#x2022; Số trang:</div>
            <div className="item-detail">&#x2022; Năm phát hành:</div>
          </Col>
          <Col sm={3}>
            <div className="item-detail">{bookDetail.author}</div>
            <div className="item-detail">{bookDetail.publisher}</div>
            <div className="item-detail">{bookDetail.totalPage}</div>
            <div className="item-detail">{bookDetail.year}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default BookDetail;