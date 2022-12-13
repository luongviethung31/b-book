import genreAPI from "api/genreAPI";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Dropdown, Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenre } from "redux/reducers/product/action";
const ProductBookModal = ({
  show,
  handleClose = () => {},
  handleActionProductBook = () => {},
  data = {},
  header = "",
}) => {
  const [allData, setAllData] = useState({
    title: "",
    genre: 1,
    thumbnail: "",
    count: 0,
    price: "",
    author: 1,
    discount: 0,
    release: "",
    description: "",
  });
  const [allAuthors, setAllAuthors] = useState([]);
  const { listGenre, loading } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  useEffect(() => {
    setAllData({ ...data, genre: data?.genre?.id, author: data?.author?.id });
  }, [data.id]);

  useEffect(() => {
    if (!listGenre.length) dispatch(getAllGenre());
  }, []);

  useEffect(() => {
    genreAPI
      .getAllAuthors()
      .then((rs) => {
        if (rs.status === 200) {
          setAllAuthors(rs.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (e) => {
    setAllData({
      ...allData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal className="edit-genre" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Tiêu đề:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                required
                value={allData?.title}
                name="title"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Bìa Sách
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                required
                value={allData?.thumbnail}
                name="thumbnail"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Số lượng:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                required
                value={allData?.count}
                name="count"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Giá:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                required
                value={allData?.price}
                name="price"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Tác giả:
            </Form.Label>
            <Col sm={10}>
              <Form.Select size="sm" name="author" onChange={handleChange}>
                {allAuthors.map((item, index) => (
                  <option
                    value={item.id}
                    key={index}
                    selected={item.id === allData.author}
                  >
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Thể loại:
            </Form.Label>
            <Col sm={10}>
              <Form.Select size="sm" name="genre" onChange={handleChange}>
                {listGenre?.map((item, index) => (
                  <option
                    value={item.id}
                    key={index}
                    selected={item.id === allData.genre}
                  >
                    {item.title}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Giảm giá:
            </Form.Label>
            <Col sm={10}>
              <Form.Select size="sm" name="discount" onChange={handleChange}>
                {[0, 10, 20, 30, 40].map((item, index) => (
                  <option
                    value={item.id}
                    key={index}
                    selected={item === allData.discount}
                  >
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Ngày xuất bản:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                required
                value={allData?.release}
                name="release"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Mô tả:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                as="textarea"
                required
                value={allData?.description}
                name="description"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 edit-genre__save-wrap">
            <Col sm={4} className="edit-genre__save-wrap--button">
              <Button onClick={() => {handleActionProductBook(allData)}} variant="primary">
                Lưu
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductBookModal;
