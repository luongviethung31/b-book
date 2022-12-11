import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import logo from 'assets/icons/bbook-logo.png'
import { ROUTE_CONTROL_GENRE, ROUTE_PRODUCT_BOOK } from "route/Types";
import { removeAccessToken, removeUser } from "hooks/localAuth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const adminLayout = ({ Component }) => {

  return (
    <Container fluid className="admin-layout">
      <Row>
        <Col sm={2}>
          <ListGroup style={{ position: 'sticky', top: '0' }}>
            <div>
              <img src={logo} alt='' style={{ width: '100%' }} />
            </div>
            <a href={ROUTE_CONTROL_GENRE}>
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
              >
                Thể loại
              </ListGroup.Item>
            </a>
            <a href={ROUTE_PRODUCT_BOOK}>
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
              >
                Sản phẩm
              </ListGroup.Item>
            </a>
            <a href="/">
              <ListGroup.Item
                action
                variant="light"
                style={{ textAlign: "left" }}
              >
                Quản lý đơn hàng
              </ListGroup.Item>
            </a>
            <ListGroup.Item
              action
              onClick={() => {
                removeUser()
                removeAccessToken()
                window.open('/', '_self')
              }}
              variant="light"
              style={{ textAlign: "left" }}
            >
              Đăng xuất
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col sm={10} style={{ minHeight: '100vh', position: 'relative' }}>
          <Component />
        </Col>
      </Row>
    </Container>
  );
};

export default adminLayout;
