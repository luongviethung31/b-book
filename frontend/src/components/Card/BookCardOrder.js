import { Button } from 'react-bootstrap';
import DeleteIcon from 'assets/icons/delete.svg'
import numeral from 'numeral';

const BookCardOrder = ({ author, title, price, amount, image = 'https://images.gr-assets.com/books/1484565687m/77203.jpg', slug }) => {
    return (
        <div className='large-card mt-0' style={{background:'#e6eff2', padding:'5px'}}>
            <div className='col-left'>
                <img src={image} alt='' />
                <div className='book-info' style={{padding:'0 10px', fontSize:'20px'}}>
                    <a href={`/book-detail/${slug}`} style={{textDecoration:'none'}}><h5 style={{fontSize:'18px'}}>{title}</h5></a>
                    <div className='author'>
                        {author}
                    </div>
                </div>
            </div>
            <div className='col-right'>
                <div className='total' style={{fontSize:'14px'}}>{`${amount}x${numeral(parseInt(parseFloat(price))).format('0,0')}`}</div>
            </div>
        </div>
    );
};

export default BookCardOrder;