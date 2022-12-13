import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Button, InputGroup, Form } from "react-bootstrap";
import SpinnerLoading from "components/SpinnerLoading";
import ProductBookModal from "components/modal/ProductBookModal/ProductBookModal";
import { useEffect } from "react";
import bookAPI from "api/bookAPI";
import PaginationCustom from "components/PaginationCustom";
import { IconAdd, IconDelete, IconView } from "assets/icons/icons";
import ConfirmModal from "components/modal/ConfirmModal";
import useNotification from "hooks/notification";

const ProductBookPage = () => {
  const [isShowAddProductBookModal, setIsShowAddProductBookModal] =
    useState(false);
  const [isShowEditProductBookModal, setIsShowEditProductBookModal] =
    useState(false);
  const [isShowConfirm, setIsShowConfirm] =useState(false)
  // const { listProduct, loading } = useSelector((store) => store.product);
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    bookAPI
      .getAllBooks(page, 100)
      .then((rs) => {
        if (rs.status === 200) {
          setData(rs.data.results);
          setTotalPage(rs.data.count)
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [page]);

  const handleDelete = (item) => {
    bookAPI.deleteBook(item.slug).then((rs) => {
      if(rs.status = 204) {
        setData(data => data.filter(book => book.id !== item.id))
        setTotalPage(tt => tt-1)
        useNotification.Success({
          title: "Thành công!",
          message: `Đã xóa thành công sách ${item.title}`
        })
      }
    }).catch(e => {
      useNotification.Error({
        title:"Lỗi",
        message:'Xóa không thành công!'
      })
    })
  };
  const handleAddProductBook = (book) => {
    bookAPI.createBook(book).then((rs) => {
      console.log(rs);
      if(rs.status === 201) {
        // let tem = [...data]
        // tem.push
        // setData()
      }
    })
  };
  const handleEditProductBook = () => {
    alert("Add?");
  };

  return (
    <div className="table-genre-wrap">
      {loading ? (
        <SpinnerLoading />
      ) : (
        <>
          <div className="header-book-manage">
            <div className="title-page-manage" style={{ textDecoration: 'underline', fontSize: '25px' }}>QUẢN LÝ SÁCH</div>
            <InputGroup className="search-field-admin">
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder='Tìm kiếm sách...'
              />
              <Button variant="outline-primary" id="button-addon1">
                Search
              </Button>
            </InputGroup>
          </div>
          <div style={{textAlign: 'left', width:'100%'}}>
          <Button
            variant="primary"
            onClick={() => setIsShowAddProductBookModal(true)}
            size='sm'
          >
            <IconAdd/> Thêm Sách
          </Button>
          </div>
          <div className="table-book-wrap">
            <Table striped bordered hover className="table-genre" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th className="table-genre__id">STT</th>
                  <th>Danh mục</th>
                  {/* <th>Bìa</th> */}
                  <th>Số lượng</th>
                  <th>Giá</th>
                  {/* <th>Mô tả</th> */}
                  <th>Tác giả</th>
                  <th>Thể loại</th>
                  <th>Giảm giá</th>
                  <th className="table-genre__action">Quản lí</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="table-genre__id">{index + 1}</td>
                      <td>{item.title}</td>
                      {/* <td> <img src={item.thumbnail} /></td> */}
                      <td>{item.count}</td>
                      <td>{item.price}</td>
                      {/* <td>{item.description}</td> */}
                      <td>{item.author.name}</td>
                      <td>{item.genre.title}</td>
                      <td>{item.discount}</td>
                      <td className="table-genre__action" style={{ minWidth: '100px' }}>
                        <Button
                          size="sm"
                          onClick={() => {
                            setIsShowEditProductBookModal(true);
                            setDataDetail(item);
                          }}
                        >
                          <IconView/>
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            setDataDetail(item)
                          }}
                        >
                          <IconDelete/>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

          </div>

          <PaginationCustom className="table-genre-pagination" onChangePage={(page) => setPage(page)} currentPage={page} totalPage={totalPage / 10} />
        </>
      )}
      <ProductBookModal
        show={isShowAddProductBookModal}
        handleClose={() => setIsShowAddProductBookModal(false)}
        handleActionProductBook={handleAddProductBook}
        header="THÊM SÁCH"
      />
      <ProductBookModal
        show={isShowEditProductBookModal}
        handleClose={() => setIsShowEditProductBookModal(false)}
        data={dataDetail}
        handleActionProductBook={handleEditProductBook}
        header="CẬP NHẬT SÁCH"
      />
      <ConfirmModal show={isShowConfirm} handleClose={() => setIsShowConfirm(false)} handleConfirm={() => {handleDelete(dataDetail)}}/>
    </div>
  );
};

export default ProductBookPage;
