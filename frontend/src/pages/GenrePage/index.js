import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";

import { getAllGenre } from "redux/reducers/product/action";
import SpinnerLoading from "components/SpinnerLoading";
import AddGenreModal from "components/modal/GenreModal/addGenre";
import EditGenreModal from "components/modal/GenreModal/editGenre";

const GenrePage = () => {
  const dummyData = [
    {
      id: "1",
      title: "Sách thiếu nhi",
      slug: "sach-thieu-nhi",
      description: "Tổng hợp sách dành cho thiếu nhi",
    },
    {
      id: "2",
      title: "Sách thiếu nhi2",
      slug: "sach-thieu-nhi2",
      description: "Tổng hợp sách dành cho thiếu nhi",
    },
    {
      id: "3",
      title: "Sách thiếu nhi3",
      slug: "sach-thieu-nhi3",
      description: "Tổng hợp sách dành cho thiếu nhi",
    },
    {
      id: "4",
      title: "Sách thiếu nhi4",
      slug: "sach-thieu-nhi4",
      description: "Tổng hợp sách dành cho thiếu nhi",
    },
    {
      id: "5",
      title: "Sách thiếu nhi5",
      slug: "sach-thieu-nhi5",
      description: "Tổng hợp sách dành cho thiếu nhi",
    },
    {
      id: "6",
      title: "Sách thiếu nhi 6",
      slug: "sach-thieu-nhi6",
      description: "Tổng hợp sách dành cho thiếu nhi",
    },
    {
      id: "7",
      title: "Sách thiếu nhi 7",
      slug: "sach-thieu-nhi7",
      description: "Tổng hợp sách dành cho thiếu nhi",
    },
  ];
  const [isShowAddGenreModal, setIsShowAddGenreModal] = useState(false);
  const [isShowEditGenreModal, setIsShowEditGenreModal] = useState(false);
  const handleDeleteGenre = () => {
    alert('delete?');
  }

  const dispatch = useDispatch();
  const { listGenre, loading } = useSelector((store) => store.product);
  useEffect(() => {
    if (!listGenre.length) dispatch(getAllGenre());
  }, []);
  return (
    <div className="table-genre-wrap">
      {loading ? (
        <SpinnerLoading />
      ) : (
        <>
          <Button
            variant="primary"
            onClick={() => setIsShowAddGenreModal(true)}
          >
            Thêm Thể loại
          </Button>
          <AddGenreModal
            show={isShowAddGenreModal}
            handleClose={() => setIsShowAddGenreModal(false)}
          />
          <EditGenreModal
            show={isShowEditGenreModal}
            handleClose={() => setIsShowEditGenreModal(false)}
          />
          <Table striped bordered hover className="table-genre">
            <thead>
              <tr>
                <th className="table-genre__id">STT</th>
                <th>Danh mục</th>
                <th>Mô tả</th>
                <th className="table-genre__action">Quản lí</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="table-genre__id">{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td className="table-genre__action">
                      <Button
                        variant="warning"
                        onClick={() => setIsShowEditGenreModal(true)}
                      >
                        Sửa
                      </Button>{" "}
                      | <Button variant="danger" onClick={() => handleDeleteGenre()} >Xóa</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default GenrePage;
