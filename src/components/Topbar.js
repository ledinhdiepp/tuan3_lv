import React, { Component } from "react";
import { Link } from "react-router-dom";
class Topbar extends Component {
  render() {
    return (
      <div className="nav-item">
        <div className="container">
          <div className="nav-depart">
            <div className="depart-btn">
              <i className="ti-menu" />
              <span>All departments</span>
              <ul className="depart-hover">
                <li className="active"><a>Women’s Clothing</a></li>
                <li><a >Men’s Clothing</a></li>
                <li><a >Underwear</a></li>
                <li><a >Kid's Clothing</a></li>
                <li><a >Brand Fashion</a></li>
                <li><a >Accessories/Shoes</a></li>
                <li><a >Luxury Brands</a></li>
                <li><a >Brand Outdoor Apparel</a></li>
              </ul>
            </div>
          </div>
          <nav className="nav-menu mobile-menu">
            <ul>
              <li className="active"><Link to="/">Home</Link></li>
              <li><Link to="/shops">Shop</Link></li>
              <li><a>Collection</a>
                <ul className="dropdown">
                  <li><a >Kaki</a></li>
                  <li><a >Cotton</a></li>
                 
                </ul>
              </li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a>Pages</a>
                <ul className="dropdown">
                  <li><a href="./blog-details.html">Blog Details</a></li>
                  <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                  <li><a href="./check-out.html">Checkout</a></li>
                  <li><a href="./faq.html">Faq</a></li>
                  <li><a href="./register.html">Register</a></li>
                  <li><a href="./login.html">Login</a></li>
                </ul>
              </li>
            </ul>
          </nav>
          <div id="mobile-menu-wrap" />
        </div>
      </div>
    );
  }
}

export default Topbar;
