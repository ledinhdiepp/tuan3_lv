import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import ShopBar from './components/ShopBar'
import NavBar from './components/Navbar'
import Topbar from './components/Topbar'
import {Home,Login,Register,About,Products} from './view/public/export'
import Server from './view/server/'
import {Services,News,Team} from './view/public/components/export'


import Footer from './components/Footer'
// import Shops from './view/public/Shops'
import ProductDetail from './view/public/ProductDetails/ProductDetail'
import Shopcart from './view/public/Shopcart'
import Checkout from './view/public/Checkout'
import Blogs from './view/public/Blogs'
import Contact from './view/public/Contact'
import ProductList from './view/public/Shops/ProductList'
class App extends Component {
	render() {
		return (
			<div className='App'>
				<Router>
				<header className="header-section">
					<NavBar />
					<ShopBar />
					<Topbar />

					
				</header>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/about' component={About} />
						<Route path='/contact' component={Contact} />
						<Route path='/services' component={Services} />
						<Route path='/team' component={Team} />
						<Route path='/news' component={News} />
						<Route path='/products' component={Products} />
						<Route path='/admin' component={Server} />
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
						<Route path='/shops' component={ProductList} />
						<Route path='/product/:productId' component={ProductDetail} />
						<Route path='/shopping-cart' component={Shopcart} />
						<Route path='/checkout' component={Checkout} />
						<Route path='/blogs' component={Blogs} />
						<Route>404 Not Found!</Route>
					</Switch>
				</Router>
				<Footer />
			</div>
		)
	}
}

export default App;