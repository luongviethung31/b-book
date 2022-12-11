import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationCustom = ({ currentPage, totalPage, onChangePage=()=>{} }) => {
    const [listPage, setListPage] = useState([])
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    useEffect(() => {
        let arr = new Array(parseInt(totalPage / 10)).fill(0)
        setListPage(arr)
    }, [totalPage])
    useEffect(() => {
        setCurrentPageNumber(currentPage)
    }, [currentPage])
    return (
        <div>
            <Pagination size="sm" style={{justifyContent:'center'}}>
                {
                    listPage?.map((item, index) =>(
                        <Pagination.Item 
                            key={index}
                            onClick={() => { if (currentPageNumber !== index + 1)
                            onChangePage(index + 1) }} 
                            active={parseInt(currentPageNumber) === (index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>)
                    )
                }
            </Pagination>
        </div>
    );
};

export default PaginationCustom;