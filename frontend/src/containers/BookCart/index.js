import React from 'react';
import { Popover } from 'react-bootstrap';

const BookCart = ({ isOpen, handleClose }) => {
    return (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Popover right</Popover.Header>
            <Popover.Body>
                And here's some <strong>amazing</strong> content. It's very engaging.
                right?
            </Popover.Body>
        </Popover>
    );
};

export default BookCart;