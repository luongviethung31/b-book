import React from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import CartIcon from 'assets/icons/cart.svg'
import LoginIcon from 'assets/icons/login.svg'
import ListIcon from 'assets/icons/list.svg'
import FacebookIcon from 'assets/icons/facebook.svg'
import InstagramIcon from 'assets/icons/instagram.svg'

const Header = () => {
    return (
        <div className='header-panel'>
            <Container fluid className='container-header'>
                <div className='logo-bbook'>
                    <img src='https://www.vinabook.com/images/thumbnails/img/252/33/vnb_logo_2x.png' alt='logo' height={50} />
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
                    <div className='action-header login-icon'>
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
        </div>
    );
};

export default Header;