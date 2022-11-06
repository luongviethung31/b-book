import React, { useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import CartIcon from 'assets/icons/cart.svg'
import LoginIcon from 'assets/icons/login.svg'
import ListIcon from 'assets/icons/list.svg'
import FacebookIcon from 'assets/icons/facebook.svg'
import InstagramIcon from 'assets/icons/instagram.svg'
import LoginModal from 'components/modal/LoginModal';
import logo from 'assets/icons/bbook-logo.png'

const Header = () => {
    const [isShowLoginModal,setIsShowLoginModal] = useState(false)
    
    return (
        <div className='header-panel'>
            <Container fluid className='container-header'>
                <div className='logo-bbook'>
                    <a href='/'><img src={logo} alt='logo' height={50}/></a>
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
                        onClick={()=> setIsShowLoginModal(true)}
                    >
                        <img src={LoginIcon} alt='login icon' />
                    </div>
                    <div className='action-header cart-icon'>
                        <img src={CartIcon} alt='cart icon' />
                    </div>
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
            <LoginModal show={isShowLoginModal} handleClose={() => setIsShowLoginModal(false)}/>
        </div>
    );
};

export default Header;