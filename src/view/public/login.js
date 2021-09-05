import React, { Component } from "react"
import "./style/login.scss"
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router'
import Cookie from 'js-cookie'
import axios from 'axios'
import { connect } from 'react-redux'

class Login extends Component {
    constructor(props) {
        super(props);
            this.state = {
            email: "",
            password: "",
           
            isLogined: false
        };
    } 
    async componentDidMount(){
        if(Cookie.get('username')){
            this.state.isLogined = true
        }
    }

    handleEmail = (e) => {
            this.setState({
            email: e.target.value,
        });
    };

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    handleLogin = async (e) => {
        e.preventDefault()
        await axios
        .post(process.env.REACT_APP_BACKEND_URL + '/auth/local', {
            identifier: this.state.email,
            password: this.state.password
        })
        .then(response => {
            let data = response.data
            this.props.loginHandle(data)
            if(data.user.role.name === 'Admin'){
                this.props.history.push('/admin')
            }
            else{
                this.props.history.push('/')
            }
        })
        .catch(error => {
            alert('Email hoặc mật khẩu không chính xác, xin hẫy nhập lại!')
            console.log('An error occurred:', error.response)
        })
    };

    
    render() {
        if(this.state.isLogined){
            return(
                <Redirect to='/admin'/>
            )
        }
        return (
            // <div className="Login">
            //     <form
            //     method="POST"
            //     className="form"
            //     id="form-1"
            //     >
            //         <h3 className="heading">Đăng nhập</h3>
            //         <p className="desc">❤️</p>
            //         <div className="spacer" />

            //         <div className="form-group">
            //             <label htmlFor="email" className="form-label">
            //                 Email
            //             </label>
            //             <input
            //                 id="email"
            //                 name="email"
            //                 type="text"
            //                 placeholder="VD: ABC@gmail.com"
            //                 className="form-control"
            //                 onChange={(e) => this.handleEmail(e)}
            //             />
            //             <span className="form-message" />
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="password" className="form-label">
            //                 Mật khẩu
            //             </label>
            //             <input
            //                 id="password"
            //                 name="password"
            //                 type={this.state.isshowpassword ? "text" : "password"}
            //                 placeholder="Nhập mật khẩu"
            //                 className="form-control"
            //                 onChange={(e) => this.handlePassword(e)}
            //             />
            //             <span
            //                 className="showpassword"
            //                 onClick={() => this.handleisshowpassword()}
            //             >
            //                 <i className={this.state.isshowpassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
            //             </span>

            //             <span className="form-message" />
            //         </div>

            //         <div className="porgotpassword">
            //             <p>Quên mật khẩu?</p>
            //         </div>

            //         <button
            //             className="form-submit"
            //             onClick={this.handleLogin}
            //         >Đăng Nhập</button>

            //         <div className="dk">
            //             <p className="textdk">Bạn chưa có tài khoản?</p>
            //             <Link to="/register">
            //                 <p className="linkdk">Đăng ký ngay</p>
            //             </Link>
            //         </div>

            //     </form>
            // </div>
            <div>
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text">
                  <a href="#"><i className="fa fa-home" /> Home</a>
                  <span>Login</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb Form Section Begin */}
        {/* Register Section Begin */}
        <div className="register-login-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="login-form">
                  <h2>Login</h2>
                  <form action="#">
                    <div className="group-input">
                      <label htmlFor="username">Username or email address *</label>
                      <input 
                        type="text" 
                        id="username"
                        onChange={(e) => this.handleEmail(e)}
                         />
                    </div>
                    <div className="group-input">
                      <label htmlFor="pass">Password *</label>
                      <input 
                        type="text"
                        id="pass" 
                        onChange={(e) => this.handlePassword(e)}
                        />
                    </div>
                    <div className="group-input gi-check">
                      <div className="gi-more">
                        <label htmlFor="save-pass">
                          Save Password
                          <input type="checkbox" id="save-pass" />
                          <span className="checkmark" />
                        </label>
                        <a href="#" className="forget-pass">Forget your Password</a>
                      </div>
                    </div>
                    <button 
                        type="submit" 
                        className="site-btn login-btn"
                        onClick={this.handleLogin}
                        >Sign In</button>
                  </form>
                  <div className="switch-login">
                    <Link to="/register" className="or-login">Or Create An Account</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        );
    }
}

function mapStateToProps(state) {
    return {
       auth: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return{
        loginHandle: (user) =>{
            dispatch({
                type: 'LOGIN',
                payload: user
            })
        },
        logoutHandle: () =>{
            dispatch({
                type: 'LOGOUT'
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);