import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Cookie from "js-cookie";
class NavBar extends Component {
  logoutHandle = async (e) =>{
      e.preventDefault()
      this.props.logout()
      this.props.history.push('/login')
  }

  More = () =>{
      if(Cookie.get('username')){
        if(Cookie.get('role') === 'Admin'){
          return(
            <>
              {/* <li className="drop-down"><a href="profile">{Cookie.get('username')}</a>
                <ul>
                  <li><Link to='/admin'> ADMIN </Link></li>
                  <li><Link to='/profile'> PROFILE </Link></li>
                  <li><button onClick={(e)=>this.logoutHandle(e)} className="more-button"> LOG OUT</button></li>
                </ul>
              </li> */}
              <div className="btn-group hahaha">
                <button type="button" className="btn btn-danger name"><i class="fas fa-user font-icon"></i>{Cookie.get('username')}</button>
                <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile"className="dropdown-item" href="#"><i class="fas fa-id-badge font-icon"></i>Profile</Link>
                  <Link to="/profile" className="dropdown-item" href="#"><i class="fas fa-cog font-icon"></i>Setting</Link>
                  <Link to="/admin" className="dropdown-item" href="#"><i class="fas fa-user-cog"></i>Admin</Link>
                  <div className="dropdown-divider" />
                  <a onClick={(e)=>this.logoutHandle(e)}  className="dropdown-item" href="#"><i class="fas fa-power-off font-icon"></i>Logout</a>
              </div>
              </div>
            </>

          )
        }
        return(
          <>
            {/* <li className="drop-down"><span>{Cookie.get('username')}</span>
              <ul>
                <li><Link to='/profile'> PROFILE </Link></li>
                <li><button onClick={(e)=>this.logoutHandle(e)} className="more-button"> LOG OUT</button></li>
              </ul>
            </li> */}
            {/* <a   className="login-panel"><i className="fa fa-user" />{Cookie.get('username')}</a>
            <a   className="login-panel"><button onClick={(e)=>this.logoutHandle(e)} className="more-button"> LOG OUT</button></a> */}
            <div className="btn-group hahaha">
                <button type="button" className="btn btn-danger name"><i class="fas fa-user font-icon"></i>{Cookie.get('username')}</button>
                <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile"className="dropdown-item" href="#"><i class="fas fa-id-badge font-icon"></i>Profile</Link>
                  <Link to="/profile" className="dropdown-item" href="#"><i class="fas fa-cog font-icon"></i>Setting</Link>
                  
                  <div className="dropdown-divider" />
                  <Link onClick={(e)=>this.logoutHandle(e)}  className="dropdown-item" ><i class="fas fa-power-off font-icon"></i>Logout</Link>
              </div>
              </div>
          </>
        );
      }
      return(
        // <li><Link to='/login' className="login"><i className="icofont-login" /> lOGIN</Link></li>
        <Link  to="/login" className="login-panel"><i className="fa fa-user" />Login</Link>
      )
  }

  render() {
    // if(Cookie.get('role')==='Admin'){
    //     return (<></>)
    // }
    return (
      // <div className="Navbar d-flex">
      //     <div className="logo mr-auto">
      //         <h1 className="text-light"><Link to="/">TTD</Link></h1>
      //     </div>
      //     <nav className="nav-menu d-none d-lg-block">
      //     <ul>
      //         <li className="active"><Link to="/">TRANG CHỦ</Link></li>
      //         <li><Link to="/about">GIỚI THIỆU</Link></li>
      //         <li><Link to="/services">DỊCH VỤ</Link></li>
      //         <li><Link to="/products">SẢN PHẨM</Link></li>
      //         <li><Link to="/team">THÀNH VIÊN</Link></li>
      //         <li><Link to="/news">TIN TỨC</Link></li>
      //         <li> <Link to="/contact">LIÊN HỆ </Link></li>
      //         {this.More()}
      //     </ul>
      //     </nav>
      // </div>
      <div className="header-top">
        <div className="container">
          <div className="ht-left">
            <div className="mail-service">
              <i className=" fa fa-envelope" />
              hello.colorlib@gmail.com
            </div>
            <div className="phone-service">
              <i className=" fa fa-phone" />
              +65 11.188.888
            </div>
          </div>
          <div className="ht-right">
            {this.More()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogined: state.auth.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch({
        type: "LOGOUT",
      });
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
