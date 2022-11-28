import React, { useState } from 'react';
import { Button, Container, Form, InputGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import CartIcon from 'assets/icons/cart.svg'
import LoginIcon from 'assets/icons/login.svg'
import ListIcon from 'assets/icons/list.svg'
import FacebookIcon from 'assets/icons/facebook.svg'
import InstagramIcon from 'assets/icons/instagram.svg'
import LoginModal from 'components/modal/LoginModal';
import logo from 'assets/icons/bbook-logo.png'
// import BookCart from 'containers/BookCart';
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

const Header = () => {
    const [isShowLoginModal, setIsShowLoginModal] = useState(false)
    // const [isShowBookCart, setIsShowBookCart] = useState(false)

    return (
        <div className='header-panel'>
            <Container fluid className='container-header'>
                <div className='logo-bbook'>
                    <a href='/'><img src={logo} alt='logo' height={50} /></a>
                </div>
                <InputGroup className="search-field">
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        placeholder='Tìm kiếm sách...'
                    />
                    <Button variant="outline-primary" id="button-addon1">
                        Search
                    </Button>
                </InputGroup>
                <div className='right-cols'>
                    <div
                        className='action-header login-icon'
                        onClick={() => setIsShowLoginModal(true)}
                    >
                        <img src={LoginIcon} alt='login icon' />
                    </div>
                    <OverlayTrigger trigger="focus" placement="bottom" overlay={
                        <Popover id="popover-basic" style={{maxWidth: '400px', width:'400px'}}>
                            <Popover.Body style={{ maxHeight: '309px !important', overflow: 'auto'}}>
                                {
                                    DataBook.map((item, idx) => (
                                        <div className='book-card' key={idx}>
                                            <div className='image-book'>
                                                <img src={item?.image} alt=''/>
                                            </div>
                                            <div className='book-info'>
                                                <div className='book-title'>
                                                    {item.title}
                                                </div>
                                                <div className='book-price'>
                                                    {`${item.amount} x ${item.price}`}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Popover.Body>
                            <Popover.Header as="div" style={{background:'#fff'}}>
                                <div className='cart-footer'>
                                    <h5>{`Tổng cộng: 285.000đ`}</h5>
                                    <Button onClick={() => {window.open("/cart-page","_self")}}>Xem giỏ hàng</Button>
                                </div>
                            </Popover.Header>
                        </Popover>
                    }>
                        <button
                            className='action-header cart-icon'
                        >
                            <img src={CartIcon} alt='cart icon' />
                        </button>
                    </OverlayTrigger>
                </div>
            </Container>
            <div className='header-contact'>
                <div className='icon-more'>
                    <img src={ListIcon} alt='more-icon' />
                </div>
                <div className='contact-info'>
                    <div className='phone-number-contact'>Hotline: 0964465300</div>
                    <div className='icon-contact facebook-contact'>
                        <img src={FacebookIcon} alt="facebook" />
                    </div>
                    <div className='icon-contact instagram-contact'>
                        <img src={InstagramIcon} alt="instagram" />
                    </div>
                </div>
            </div>
            <LoginModal show={isShowLoginModal} handleClose={() => setIsShowLoginModal(false)} />
        </div>
    );
};

export default Header;