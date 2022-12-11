import React, { useState } from 'react';
import { Button, Container, Dropdown, Form, InputGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import CartIcon from 'assets/icons/cart.svg'
import LoginIcon from 'assets/icons/login.svg'
import ListIcon from 'assets/icons/list.svg'
import FacebookIcon from 'assets/icons/facebook.svg'
import InstagramIcon from 'assets/icons/instagram.svg'
import LoginModal from 'components/modal/LoginModal';
import logo from 'assets/icons/bbook-logo.png'
import userAPI from 'api/userAPI';
import useNotification from 'hooks/notification';
import { getAccessToken, removeAccessToken, removeUser, setAccessToken, setUser } from 'hooks/localAuth';
import { handleShowLoginModal, setAccountInfo, setLoading } from 'redux/reducers/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import LoadingLogin from 'components/SpinnerLoading/LoadingLogin';
import { ROUTE_USER_ORDER } from 'route/Types';
import numeral from 'numeral';
// import BookCart from 'containers/BookCart';

const Header = () => {
    // const [isShowBookCart, setIsShowBookCart] = useState(false)
    const { userInfo, loading } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const [itemCart, setItemCart] = useState([])

    const handleLogin = (data) => {
        dispatch(setLoading(true))
        userAPI.login(data)
            .then(rs => {
                if (rs.status === 200) {
                    dispatch(setLoading(false))
                    setAccessToken(rs.data.token);
                    setUser(JSON.stringify({
                        last_name: rs.data.last_name,
                        first_name: rs.data.first_name,
                        is_admin: rs.data.is_admin
                    }))
                    dispatch(setAccountInfo({
                        last_name: rs.data.last_name,
                        first_name: rs.data.first_name,
                        is_admin: rs.data.is_admin
                    }))
                    // window.location.reload();
                }
            })
            .catch(e => {
                dispatch(setLoading(false))
                useNotification.Error({
                    title: "ĐĂNG NHẬP KHÔNG THÀNH CÔNG!",
                    message: "Email hoặc mật khẩu không đúng!"
                })
            })
    }

    const handleLogout = () => {
        userAPI.logout(getAccessToken()).then(rs => console.log(rs)).catch(e => console.log(e))
        removeUser()
        removeAccessToken()
        window.open('/', '_self')
    }
    return (
        <div className='header-panel'>
            {loading && <LoadingLogin />}
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
                    {userInfo.last_name ?
                        <Dropdown>
                            <Dropdown.Toggle className='account-avatar'>
                                {userInfo.last_name[0].toUpperCase()}
                            </Dropdown.Toggle>
                            <Dropdown.Menu align='end'>
                                <Dropdown.Item href={ROUTE_USER_ORDER}>Đơn hàng của bạn</Dropdown.Item>
                                <Dropdown.Item >Tài khoản của bạn</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        :
                        <div
                            className='action-header login-icon'
                            onClick={() => dispatch(handleShowLoginModal(true))}
                        >
                            <img src={LoginIcon} alt='login icon' />
                        </div>
                    }
                    <OverlayTrigger trigger="focus" placement="bottom" overlay={
                        <Popover id="popover-basic" style={{ maxWidth: '400px', width: '400px' }}>
                            <Popover.Body style={{ maxHeight: '309px !important', overflow: 'auto' }}>
                                {
                                    itemCart.length ?
                                        itemCart.map((item, idx) => (
                                            <div className='book-card' key={idx}>
                                                <div className='image-book'>
                                                    <img src={item?.thumbnail} alt='' />
                                                </div>
                                                <div className='book-info'>
                                                    <div className='book-title'>
                                                        {item.title}
                                                    </div>
                                                    <div className='book-price'>
                                                        {`${item.amount} x  ${numeral((item.price * (100 - item.discount)) / 100).format("0,0")}`}
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <h6>Giỏ hàng trống...</h6>
                                }
                            </Popover.Body>
                            <Popover.Header as="div" style={{ background: '#fff' }}>
                                <div className='cart-footer'>
                                    <h5>{`Tổng cộng:  ₫${numeral(itemCart.reduce((acc, curr) => acc + curr.price * (100 - curr.discount) / 100 * curr.amount, 0)).format("0,0")}`}</h5>
                                    <Button onClick={() => {
                                        window.open("/cart-page", "_self")
                                        localStorage.removeItem('item_payment')
                                    }}>Xem giỏ hàng</Button>
                                </div>
                            </Popover.Header>
                        </Popover>
                    }>
                        <button
                            className='action-header cart-icon'
                            onClick={() => {
                                let itemCart = localStorage.getItem('cart_items')
                                if (itemCart) {
                                    itemCart = JSON.parse(itemCart)
                                    setItemCart(itemCart)
                                }
                            }}
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
        </div>
    );
};

export default Header;