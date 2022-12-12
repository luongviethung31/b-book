import React from "react";
import { Table, Button, Dropdown } from "react-bootstrap";
import PaginationCustom from "components/PaginationCustom";
import { useEffect } from "react";
import paymentAPI from "api/paymentAPI";
import { useState } from "react";
import { Form } from "react-router-dom";

const OrderPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    paymentAPI
      .allOrder()
      .then((rs) => {
        if (rs.status === 200) {
          console.log(rs.data);
          setData(rs.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <div className="table-wrap">
        <Table
          striped
          bordered
          hover
          className="table-genre"
          style={{ fontSize: "12px" }}
        >
          <thead>
            <tr>
              <th>Ngày tạo</th>
              <th>Địa chỉ ship</th>
              <th>Tổng đơn giá</th>
              <th>Ghi chú</th>
              <th>Trạng thái thanh toán</th>
              <th>Trạng thái giao nhận</th>
              <th>Kênh thanh toán</th>
              <th>Khách hàng</th>
              <th className="table-genre__action">Quản lí</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{new Date(item.ship_date).toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
                  <td>{item.ship_place}</td>
                  <td>{item.total}</td>
                  <td>{item.note}</td>
                  <td>
                    <input type="checkbox" checked={item.is_paid} onChange={() => {
                      paymentAPI.updateOrder(item.id, {is_paid: !item.is_paid}).then((rs) => {
                        console.log(rs);
                      })
                      }}/>
                  </td>
                  <td>{item.is_paid ? "Đã nhận hàng" : "Chưa nhận hàng"}</td>
                  <td>{item.paid_at }</td>
                  <td>{item.user.email}</td>
                  <td
                    className="table-genre__action"
                    style={{ minWidth: "100px" }}
                  >
                    <Button size="sm" variant="danger">
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* <PaginationCustom className="table-genre-pagination"  /> */}
    </>
  );
};

export default OrderPage;
