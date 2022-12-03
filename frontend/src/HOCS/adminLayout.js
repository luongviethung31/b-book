import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const adminLayout = ({ Component }) => {
  return (
    <Container className="admin-layout">
      <Row>
        <Col sm={3}>
          <ListGroup>
            
              <a href="/control-genre">
                <ListGroup.Item
                  action
                  variant="light"
                  style={{ textAlign: "left" }}
                >
                  Thể loại
                </ListGroup.Item>
              </a>
              <a href="/product-book">
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
            
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Component />
        </Col>
      </Row>
    </Container>
  );
};

export default adminLayout;
