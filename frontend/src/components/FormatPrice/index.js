import React from "react";
import numeral from "numeral";

const FormatPrice = ({ price, discount }) => {
  return (
    <div className="price-wrapper">
      {
        discount ?
      <span
        className="old-price"
        style={{ color: "gray", textDecoration: "line-through" }}
      >
        ₫{numeral(price).format("0,0")}
      </span> : <></>
      }
      <span className="new-price" style={{ marginLeft: "20px", color: "red" }}>
        ₫{numeral((price * (100 - discount)) / 100).format("0,0")}
      </span>
    </div>
  );
};
export default FormatPrice;