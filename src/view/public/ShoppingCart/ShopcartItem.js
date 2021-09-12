import React, { Component } from "react";

export default class ShopcartItem extends Component {
  render() {
    var { order } = this.props;
    console.log(order.productList[0].product.image)
    return (
      <tr>
        <td className="cart-pic">
          <img src={process.env.REACT_APP_BACKEND_URL + order.productList[0].product.image} alt="" />
        </td>
        <td className="cart-title">
          <h5>{order.productList[0].product.name}</h5>
        </td>
        <td className="p-price">{order.productList[0].product.price}</td>
        <td className="qua-col">
          <div className="quantity">
            <div className="pro-qty">
              <input type="text" defaultValue={order.productList[0].quantity} />
            </div>
          </div>
        </td>
        <td className="total-price">{order.productList[0].product.price * order.productList[0].quantity}</td>
        <td className="close-td">
          <i className="ti-close" />
        </td>
      </tr>
    );
  }
}
