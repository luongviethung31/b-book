import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Button } from "react-bootstrap";
import SpinnerLoading from "components/SpinnerLoading";
import ProductBookModal from "components/modal/ProductBookModal/ProductBookModal";
import { useEffect } from "react";
import bookAPI from "api/bookAPI";
import PaginationCustom from "components/PaginationCustom";

const dummyData = [
  {
    id: 1,
    title: "Muôn Kiếp Nhân Sinh",
    slug: "muon-kiep-nhan-sinh",
    thumbnail:
      "https://www.vinabook.com/images/thumbnails/product/240x/372174_p93766m366182p93766mp93766e1muonkiepnhansinhphan201.jpg",
    count: 200,
    price: "99000.00",
    description: null,
    discount: 0,
    release: 0,
    created_date: "2022-10-11T10:35:24.542271Z",
    updated_date: "2022-10-11T10:35:24.542271Z",
    genre: {
      id: 1,
      title: "Sách thiếu nhi",
    },
    author: {
      id: 3,
      name: "James",
    },
  },
  {
    id: 9,
    title: "Angels & Demons  (Robert Langdon- #1)",
    slug: "product-8",
    thumbnail: "https://images.gr-assets.com/books/1303390735m/960.jpg",
    count: 311,
    price: "99000.00",
    description:
      "A famous painting of his daughters by a renowned artist is the thread that weaves through the stories of three people- each a century apart. The book begins in 1785 with diary entries from one of the daughters- Laura- and runs to an artist in the present day who begins to achieve fame in her 60s. \nSet in the New York ballet world (the author used to be a professional dancer)- this is all about betrayal- art and ambition. Carlisle hasn’t spoken to her father for 19 years- but now he’s on his deathbed and she is desperate to reconnect. \nSet in the 18th century- between the two great Frost Fairs- this is a fresh take on the Regency novel. Neva is a young woman with the ability to forecast the weather but who- because of the times- is forced to disguise herself. But what will happen when she falls in love for the first time?When Jess and her family swap London for a crumbling old house in Suffolk- they’re excited for a fresh start. But within days- Jess feels a growing sense of unease about the house – and the frosty locals won’t talk about its troubled history. The author does a great job of creating a creepy atmosphere.",
    discount: 10,
    release: 2000,
    created_date: "2022-10-11T10:35:24.542271Z",
    updated_date: "2022-10-11T10:35:24.542271Z",
    genre: {
      id: 1,
      title: "Sách thiếu nhi",
    },
    author: {
      id: 10,
      name: "Lee Dong Wook",
    },
  },
];

const ProductBookPage = () => {
  const [isShowAddProductBookModal, setIsShowAddProductBookModal] =
    useState(false);
  const [isShowEditProductBookModal, setIsShowEditProductBookModal] =
    useState(false);
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

  const handleDeleteProductBook = () => {
    alert("delete?");
  };
  const handleAddProductBook = () => {
    alert("Add?");
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
          <Button
            variant="primary"
            onClick={() => setIsShowAddProductBookModal(true)}
          >
            Thêm Sách
          </Button>

          <div className="table-wrap">
          <Table striped bordered hover className="table-genre" style={{fontSize:'12px'}}>
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
                    <td className="table-genre__action" style={{minWidth:'100px'}}>
                      <Button
                        size="sm"
                        onClick={() => {
                          setIsShowEditProductBookModal(true);
                          setDataDetail(item);
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteProductBook()}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          </div>

          <PaginationCustom className="table-genre-pagination" onChangePage={(page) => setPage(page)} currentPage={page} totalPage={totalPage/10} />
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
    </div>
  );
};

export default ProductBookPage;
