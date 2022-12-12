import React from "react";
import { Container, Row, Col, ListGroup, InputGroup, Form, Button } from "react-bootstrap";
import logo from "assets/icons/bbook-logo.png";
import { ROUTE_CONTROL_GENRE, ROUTE_ORDER_PAGE, ROUTE_PRODUCT_BOOK } from "route/Types";
import { removeAccessToken, removeUser } from "hooks/localAuth";
import { Link } from "react-router-dom";
const adminLayout = ({ Component, route='' }) => {
  return (
    <Container fluid className="admin-layout">
      <Row>
        <Col sm={2} className="admin-layout__col1">
          <div className="admin-layout__logo">
            <img src={logo} alt="" style={{ width: "100%" }} />
          </div>
          <ListGroup
            className="admin-layout__list"
            style={{ position: "sticky", top: "0" }}
          >
            <Link to={ROUTE_CONTROL_GENRE}>
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
                className="admin-layout__list--item"
              >
                Thể loại
              </ListGroup.Item>
            </Link>
            <Link to={ROUTE_PRODUCT_BOOK}>
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
                className="admin-layout__list--item"
              >
                Sản phẩm
              </ListGroup.Item>
            </Link>
            <Link to={ROUTE_ORDER_PAGE}>
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
                className="admin-layout__list--item"
              >
                Quản lý đơn hàng
              </ListGroup.Item>
            </Link>
            <ListGroup.Item
            className="admin-layout__list--item"
              action
              onClick={() => {
                removeUser();
                removeAccessToken();
                window.open("/", "_self");
              }}
              variant="light"
              style={{ textAlign: "left" }}
            >
              Đăng xuất
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={10} style={{ minHeight: "100vh", position: "relative" }}>
        {route === ROUTE_PRODUCT_BOOK ?
          <InputGroup className="search-field-admin">
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        placeholder='Tìm kiếm sách...'
                    />
                    <Button variant="outline-primary" id="button-addon1">
                        Search
                    </Button>
                </InputGroup> :<></>
                }
          <Component />
        </Col>
      </Row>
    </Container>
  );
};

export default adminLayout;
