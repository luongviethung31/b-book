import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";

import {
  addGenre,
  deleteGenre,
  getAllGenre,
} from "redux/reducers/product/action";
import SpinnerLoading from "components/SpinnerLoading";
import EditGenreModal from "components/modal/GenreModal/editGenre";
import genreAPI from "api/genreAPI";
import ConfirmModal from "components/modal/ConfirmModal";

const GenrePage = () => {
  const [isShowAddGenreModal, setIsShowAddGenreModal] = useState(false);
  const [isShowEditGenreModal, setIsShowEditGenreModal] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [data, setData] = useState({});
  const [dataDel, setDataDel] = useState({});

  const dispatch = useDispatch();
  const { listGenre, loading } = useSelector((store) => store.product);
  useEffect(() => {
    if (!listGenre.length) dispatch(getAllGenre());
  }, []);

  const handleDeleteGenre = (item) => {
    setIsShowConfirmModal(true)
    setDataDel(item)
  };
  const handleEditGenre = (data, slug) => {
    if (!data.title.trim() || !data.description.trim()) return;
    genreAPI
      .updateGenre(slug, data)
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleAddGenre = (data) => {
    if (!data.title.trim() || !data.description.trim()) return;
    dispatch(addGenre(data, () => setIsShowAddGenreModal(false)));
  };
  return (
    <div className="table-genre-wrap">
      {loading ? (
        <SpinnerLoading />
      ) : (
        <>
          <Button
            variant="primary"
            onClick={() => {
              setIsShowAddGenreModal(true);
            }}
          >
            Thêm thể loại
          </Button>

          <div className="table-wrap">
            <Table
              striped
              bordered
              hover
              className="table-genre"
              style={{ fontSize: "14px" }}
            >
              <thead>
                <tr>
                  <th className="table-genre__id">STT</th>
                  <th>Danh mục</th>
                  <th
                    style={{minWidth: '400px'}}
                  >
                    Mô tả
                  </th>
                  <th className="table-genre__action">Quản lí</th>
                </tr>
              </thead>
              <tbody>
                {listGenre.map((item, index) => {
                  console.log({ item });
                  return (
                    <tr key={index}>
                      <td className="table-genre__id">{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td className="table-genre__action">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => {
                            setIsShowEditGenreModal(true);
                            setData({
                              ...item,
                              action: "edit",
                            });
                          }}
                        >
                          Sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteGenre(item)}
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
        </>
      )}
      <EditGenreModal
        show={isShowEditGenreModal}
        handleClose={() => setIsShowEditGenreModal(false)}
        data={data}
        handleEditGenre={handleEditGenre}
        header="CẬP NHẬT THỂ LOẠI"
      />
      <EditGenreModal
        show={isShowAddGenreModal}
        handleClose={() => setIsShowAddGenreModal(false)}
        handleEditGenre={handleAddGenre}
        header="THÊM THỂ LOẠI"
      />

      <ConfirmModal handleClose={() => setIsShowConfirmModal(false)} show={isShowConfirmModal} title="Bạn có chắc chắn xóa?" handleConfirm={() => dispatch(deleteGenre(dataDel, () => setIsShowConfirmModal(false)))}/>
    </div>
  );
};

export default GenrePage;
