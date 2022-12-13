import React from "react";
import { Container, Row, Col, ListGroup, InputGroup, Form, Button } from "react-bootstrap";
import logo from "assets/icons/mini-logo.png";
import { ROUTE_CONTROL_GENRE, ROUTE_ORDER_PAGE, ROUTE_PRODUCT_BOOK, ROUTE_STATISTIC_PAGE } from "route/Types";
import { removeAccessToken, removeUser } from "hooks/localAuth";
import { Link } from "react-router-dom";
import { IconGenre, IconOrder, IconProduct, IconStatistic } from "assets/icons/icons";
const adminLayout = ({ Component, route = '' }) => {
  return (
    <Container fluid className="admin-layout">
      <Row>
        <Col sm={1} className="admin-layout__col1" style={{borderRight: '1px solid #006666'}}>
          <div className="admin-layout__logo">
            <img src={logo} alt="" style={{ height: '100%', width: "auto" }} />
          </div>
          <ListGroup
            className="admin-layout__list"
            style={{ position: "sticky", top: "0" }}
          >
            <Link to={ROUTE_PRODUCT_BOOK}>
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
                className="admin-layout__list--item"
              >
                <IconProduct />
                <div>Sản phẩm</div>
              </ListGroup.Item>
            </Link>
            <Link to={ROUTE_CONTROL_GENRE}>
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
                className="admin-layout__list--item"
              >
                <IconGenre />
                <div>Thể loại</div>
              </ListGroup.Item>
            </Link>
            <Link to={ROUTE_ORDER_PAGE}>
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
                className="admin-layout__list--item"
              >
                <IconOrder />
                <div>Đơn hàng</div>
              </ListGroup.Item>
            </Link>
            <Link to={ROUTE_STATISTIC_PAGE}>
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
                className="admin-layout__list--item"
              >
                <IconStatistic />
                <div>Thống kê</div>
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
              style={{ textAlign: "left", color: '#fff', fontSize:'11px' }}
            >
              Đăng xuất
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={11} style={{ minHeight: "100vh", position: "relative" }}>
          <Component />
        </Col>
      </Row>
    </Container>
  );
};

export default adminLayout;
