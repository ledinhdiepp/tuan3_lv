import Cookie from "js-cookie";
import React, { Component, createRef } from "react";
import ShopcartItem from "./ShopcartItem";
import { Link } from "react-router-dom";
import axios from "axios";
export default class Shopcart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      total: 0,
      orders: [],
      newquanity : 0
    };
  }
  async componentDidMount() {
    if (Cookie.get("role") === "Public") {
      let response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/orders",
        {
          headers: {
            Authorization: "bearer " + Cookie.get("token"),
          },
        }
      );
      if (!response.ok) {
        return;
      }
      let orders = await response.json();

      this.setState({ loading: false, authenticate: true, orders: orders });
      return;
    }
    this.setState({ authenticate: false });
  }
  showtotal() {
    var { orders } = this.state;
    var total = 0;
    orders.map((order, index) => {
      const user = Object.values(order.buyer);
      if (user[2] === Cookie.get("id")) {
        total += order.productList[0].product.price * order.productList[0].quantity;
      }
      
    });

    return total;
  }
  hanleQuantity = (e) =>{
    var {orders} = this.state;
   
    this.setState({})
      

    
  }
  render() {
    const clickdestroy = (id) => {
      axios
        .delete(process.env.REACT_APP_BACKEND_URL + "/orders/" + id, {
          headers: {
            Authorization: "bearer " + Cookie.get("token"),
          },
        })
        .then((response) => {
          alert("Destroy success.");
          window.location.href = "/shoppingcart";
        })
        .catch((error) => {
          alert("Update failed !!!");
          console.log("An error occurred:", error.response);
        });
    };
    return (
      <div>
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text product-more">
                  <a href="./home.html">
                    <i className="fa fa-home" /> Home
                  </a>
                  <a href="./shop.html">Shop</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb Section Begin */}
        {/* Shopping Cart Section Begin */}
        <section className="shopping-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th className="p-name">Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>
                          <i className="ti-close" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.orders.map((order, index) => {
                        const user = Object.values(order.buyer);
                        if (user[2] === Cookie.get("id")) {
                          return (
                            <tr>
                              <td className="cart-pic">
                                <img
                                  src={
                                    process.env.REACT_APP_BACKEND_URL +
                                    order.productList[0].product.image
                                  }
                                  alt=""
                                />
                              </td>
                              <td className="cart-title">
                                <h5>{order.productList[0].product.name}</h5>
                              </td>
                              <td className="p-price">
                                {order.productList[0].product.price}
                              </td>
                              <td className="qua-col">
                                <div className="quantity">
                                  <div className="pro-qty">
                                    <input
                                      type="text"
                                      defaultValue={
                                        order.productList[0].quantity
                                      }
                                      onChange = {(e) =>this.hanleQuantity(e)}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="total-price">
                                {order.productList[0].product.price *
                                  order.productList[0].quantity}
                              </td>
                              <td className="close-td">
                                <i
                                  className="ti-close"
                                  onClick={() => clickdestroy(order.id)}
                                />
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="cart-buttons">
                      <Link to="/shops" className="primary-btn continue-shop">
                        Continue shopping
                      </Link>
                      <a href="#" className="primary-btn up-cart">
                        Update cart
                      </a>
                    </div>
                    <div className="discount-coupon">
                      <h6>Discount Codes</h6>
                      <form action="#" className="coupon-form">
                        <input type="text" placeholder="Enter your codes" />
                        <button type="submit" className="site-btn coupon-btn">
                          Apply
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-4 offset-lg-4">
                    <div className="proceed-checkout">
                      <ul>
                        <li className="subtotal">
                          Subtotal <span>{this.showtotal()}</span>
                        </li>
                        <li className="cart-total">
                          Total <span>{this.showtotal()}</span>
                        </li>
                      </ul>
                      <a href="#" className="proceed-btn">
                        PROCEED TO CHECK OUT
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
