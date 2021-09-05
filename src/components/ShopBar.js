import React, { Component } from "react";
class ShopBar extends Component {
  render() {
    return (
      <div className="container">
        <div className="inner-header">
          <div className="row">
            <div className="col-lg-2 col-md-2">
              <div className="logo">
                <a href="./index.html">
                  <img src="img/logo.png" alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <div className="advanced-search">
                <button type="button" className="category-btn">
                  All Categories
                </button>
                <div className="input-group">
                  <input type="text" placeholder="What do you need?" />
                  <button type="button">
                    <i className="ti-search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 text-right col-md-3">
              <ul className="nav-right">
                <li className="heart-icon">
                  <a>
                    <i className="icon_heart_alt" />
                    <span>1</span>
                  </a>
                </li>
                <li className="cart-icon">
                  <a >
                    <i className="icon_bag_alt" />
                    <span>3</span>
                  </a>
                  <div className="cart-hover">
                    <div className="select-items">
                      <table>
                        <tbody>
                          <tr>
                            <td className="si-pic">
                              <img src="img/select-product-1.jpg" alt="" />
                            </td>
                            <td className="si-text">
                              <div className="product-selected">
                                <p>$60.00 x 1</p>
                                <h6>Kabino Bedside Table</h6>
                              </div>
                            </td>
                            <td className="si-close">
                              <i className="ti-close" />
                            </td>
                          </tr>
                          <tr>
                            <td className="si-pic">
                              <img src="img/select-product-2.jpg" alt="" />
                            </td>
                            <td className="si-text">
                              <div className="product-selected">
                                <p>$60.00 x 1</p>
                                <h6>Kabino Bedside Table</h6>
                              </div>
                            </td>
                            <td className="si-close">
                              <i className="ti-close" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="select-total">
                      <span>total:</span>
                      <h5>$120.00</h5>
                    </div>
                    <div className="select-button">
                      <a  className="primary-btn view-card">
                        VIEW CARD
                      </a>
                      <a  className="primary-btn checkout-btn">
                        CHECK OUT
                      </a>
                    </div>
                  </div>
                </li>
                <li className="cart-price">$150.00</li>
               
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopBar;
