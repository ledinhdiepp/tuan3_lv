import React, { Component } from 'react'
import Cookie from "js-cookie"
import axios from "axios"
import { Link } from 'react-router-dom'
// import '../styles/components/style.scss';
import './style/products.scss'


class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      products: [],
      filterProducts: [],
      rollSize: '',
      color: '',
      filter:{
        name: '',
        category: '',
        show: 3,
        page: 1
      },
      buyingProduct: {},
      cart: {items:[], total:0},
      search :""
    }
    this.closeModal = React.createRef();
  }

  async componentDidMount() {
    const cart = Cookie.get('cart');
    let total = 0;
    if(typeof cart === "string" && cart !== "undefined"){
      JSON.parse(cart).forEach(item => {
        total = total + item.price1*item.quantity1 + item.price2*item.quantity2;
      });
      this.setState({
        cart: { items: JSON.parse(cart), total: total },
      });
    }
    if(true){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/products");
      if (!response.ok) {
        return
      }
      let products = await response.json();
      if(Cookie.get('username')){
        this.setState({ loading: false,authenticate: true, products: products });
        return;
      }
      this.setState({ loading: false,authenticate: false, products: products });
      return;
    }
  }

  render() {
    let loginDisplay = 'none';
    if(this.state.authenticate){
      loginDisplay = 'block';
    }

    const addItem = () => {
      let item ={
        id: this.state.buyingProduct.id,
        name: this.state.buyingProduct.name,
        price: this.state.buyingProduct.price,
        quantity1: 0,
        quantity2: 0,
      };
      let { items } = this.state.cart;
      let m2BuyValue = Number(document.getElementsByClassName("m2-buy")[0].value);
      let rollBuyValue = Number(document.getElementsByClassName("roll-buy")[0].value);
      if(m2BuyValue<0 && rollBuyValue<1){
        return;
      }
      const newItem = items.find((i) => i.id === this.state.buyingProduct.id);
      if (!newItem) {
        item.quantity1 = m2BuyValue;
        item.quantity2 = rollBuyValue;
        this.setState(
          {
            cart: {
              items: [...items, item],
              total: this.state.cart.total + item.price*m2BuyValue + item.price*this.state.buyingProduct.lengt*this.state.buyingProduct.width*rollBuyValue,
            },
          },
          () => Cookie.set("cart", this.state.cart.items)
        );
      } else {
        this.setState(
          {
            cart: {
              items: this.state.cart.items.map((item) =>
                item.id === newItem.id
                  ? Object.assign({}, item, { quantity1: item.quantity1 + m2BuyValue },{quantity2: item.quantity2 + rollBuyValue})
                  : item
              ),
              total: this.state.cart.total + item.price1*m2BuyValue + item.price2*rollBuyValue,
            },
          },
          () => Cookie.set("cart", this.state.cart.items)
        );
      }
    };

    const removeItem = (item) => {
      let { items } = this.state.cart;
      const removeItem = items.find((i) => i.id === item.id);

      const itemList = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === removeItem.id);

      itemList.splice(index, 1);
      this.setState(
        { cart: { items: itemList, total: this.state.cart.total - removeItem.price1*removeItem.quantity1 - removeItem.price2*removeItem.quantity2 } },
        () => Cookie.set("cart", itemList)
      );
    };

    const clickCheckout = () =>{
      if(true){
        axios
          .post(process.env.REACT_APP_BACKEND_URL + '/orders', {
            status: "Checking",
            productList: Cookie.get('cart'),
            creator: Cookie.get('username'),
          },{
            headers: {
              'Authorization':'bearer '+ Cookie.get('token'),
            },
          })
          .then(response => {
            alert("Checkout success!");
            Cookie.remove('cart');
            this.setState({cart: {items:[], total:0}});
          })
          .catch(error => {
            alert('An error occurred, please check again.');
            console.log('An error occurred:', error.response);
          });
        return;
      }
    }

    const clickCloseCartpanel = () =>{
      document.getElementsByClassName('cart-panel')[0].style.display = 'none';
      document.getElementsByClassName('cart-show')[0].style.display = 'block';
    }

    const clickCartShow = () =>{
      document.getElementsByClassName('cart-panel')[0].style.display = 'flex';
      document.getElementsByClassName('cart-show')[0].style.display = 'none';
    }

    const clickCartCancle = () =>{
      Cookie.remove('cart');
      this.setState({cart: {items:[],total:0}});
    }

    const clickAddToCart = (product) =>{
      this.setState({buyingProduct : product});
    }

    const handleSubmitBuyProduct = (e) =>{
      e.preventDefault();
      addItem();
      this.closeModal.current.click();
    }

    const clickPrevPage = () =>{
      if(this.state.filter.page > 1){
        this.setState({filter:{...this.state.filter,page:this.state.filter.page-1}});
        return;
      }
      return;
    }

    const clickNextPage = () =>{
      let maxPage = Math.ceil(this.state.products
        .filter(product => 
        product.category.name.includes(this.state.filter.category)
        && product.name.includes(this.state.filter.name)).length/this.state.filter.show);
      if(this.state.filter.page < maxPage){
        this.setState({filter:{...this.state.filter,page:this.state.filter.page+1}});
        return;
      }
      return;
    }

    const PagNav = ()=>{
      let numberPage = this.state.products
      .filter(product => 
      product.category.name.includes(this.state.filter.category)
      && product.name.includes(this.state.filter.name)).length/this.state.filter.show;
      let itemsList = [];
      var returnList =[];
      for(let i=1; i<=Math.ceil(numberPage);i++){
        itemsList.push(i);
      }
      itemsList.map((item,index)=>{
        if(item === this.state.filter.page ){  
          returnList.push(<button className="active" onClick={()=>this.setState({filter:{...this.state.filter,page:item}})} key={index}>{item}</button>);
        }
        else{
          returnList.push(<button onClick={()=>this.setState({filter:{...this.state.filter,page:item}})} key={index}>{item}</button>);
        }
      })
      return returnList;
    }

    // Search 
    const filterItem = this.state.products.filter(item => {
      if(item.description){
        return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || item.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || item.price.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    })
    const BuyProductModal = ()=>{
      for(var i in this.state.buyingProduct){
        return(
        <div className="modal fade" id="my_modal" tabIndex="-1" role="dialog" aria-labelledby="my_modalLabel">
          <div className="modal-dialog" role="dialog">
              <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel">BUY PRODUCT</h4>
                    <button type="button" className="close close-modal" data-dismiss="modal"
                    ref={this.closeModal} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={(e)=>handleSubmitBuyProduct(e)}>
                  <div className="modal-body">

                    <h6>Chọn số lượng</h6>
                    <div className="row">
                      <div className="col-lg-6">
                        <input type="number" className="m2-buy" placeholder="số mét vuông"/>
                      </div>
                      <div className="col-lg-6">
                        <input type="number" className="roll-buy" placeholder="số cuộn"/>
                      </div>
                    </div>

                    <h6>Chọn loại cuộn</h6>
                    <div className="row rollSize-select">
                      <ul>
                      {this.state.buyingProduct.rollSizes.map((rollSize,index)=>{
                        return(
                          <li key={index}>
                            <input type="radio" name="rollSize" id={rollSize.lengt + "x" + rollSize.width}
                             value={rollSize.lengt + "x" + rollSize.width}/>
                            <label htmlFor={rollSize.lengt + "x" + rollSize.width}><span> {rollSize.lengt + "x" + rollSize.width} </span></label>
                          </li>
                        );
                      })}
                      </ul>
                    </div>

                    <h6>Chọn màu</h6>
                    <div className="row color-select">
                        <ul>
                        {this.state.buyingProduct.colors.map((color,index)=>{
                          return(
                            <li key={index}>
                              <label htmlFor={color}>
                                <input type="radio" name="color" id={color} value={color} />
                                <span className="checkColor" style={{backgroundColor:color}}></span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                    <button type="button" className="btn btn-primary">Yes</button>
                  </div>
                </form>
              </div>
          </div>
        </div>);
      }

      return(
        <div className="modal fade" id="my_modal" tabIndex="-1" role="dialog" aria-labelledby="my_modalLabel">
          <div className="modal-dialog" role="dialog">
              <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel">ERROR</h4>
                    <button type="button" className="close close-modal" data-dismiss="modal"
                    ref={this.closeModal} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    There are some errors , try later!
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                    <button type="button" className="btn btn-primary">Yes</button>
                </div>
              </div>
          </div>
        </div>
      )
    }

    if (!this.state.loading) {
      return (
        <div>
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text">
                  <Link to="/">
                    <i className="fa fa-home" /> Home
                  </Link>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb Section Begin */}
        {/* Product Shop Section Begin */}
        <section className="product-shop spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
                <div className="filter-widget">
                  <h4 className="fw-title">Categories</h4>
                  <ul className="filter-catagories">
                    <li>
                      <a>Men</a>
                    </li>
                    <li>
                      <a>Women</a>
                    </li>
                    <li>
                      <a>Kids</a>
                    </li>
                  </ul>
                </div>
                <div className="filter-widget">
                  <h4 className="fw-title">Brand</h4>
                  <div className="fw-brand-check">
                    <div className="bc-item">
                      <label htmlFor="bc-calvin">
                        Calvin Klein
                        <input type="checkbox" id="bc-calvin" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="bc-item">
                      <label htmlFor="bc-diesel">
                        Diesel
                        <input type="checkbox" id="bc-diesel" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="bc-item">
                      <label htmlFor="bc-polo">
                        Polo
                        <input type="checkbox" id="bc-polo" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="bc-item">
                      <label htmlFor="bc-tommy">
                        Tommy Hilfiger
                        <input type="checkbox" id="bc-tommy" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                
                  
                <div className="filter-widget">
                  <h4 className="fw-title">Color</h4>
                  <div className="fw-color-choose">
                    <div className="cs-item">
                      <input type="radio" id="cs-black" />
                      <label className="cs-black" htmlFor="cs-black">
                        Black
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-violet" />
                      <label className="cs-violet" htmlFor="cs-violet">
                        Violet
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-blue" />
                      <label className="cs-blue" htmlFor="cs-blue">
                        Blue
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-yellow" />
                      <label className="cs-yellow" htmlFor="cs-yellow">
                        Yellow
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-red" />
                      <label className="cs-red" htmlFor="cs-red">
                        Red
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-green" />
                      <label className="cs-green" htmlFor="cs-green">
                        Green
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="filter-widget">
                  <h4 className="fw-title">Tags</h4>
                  <div className="fw-tags">
                    <a>Towel</a>
                    <a>Shoes</a>
                    <a>Coat</a>
                    <a>Dresses</a>
                    <a>Trousers</a>
                    <a>Men's hats</a>
                    <a>Backpack</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                <div className="product-show-option">
                <div class="blog-sidebar">
                        <div class="search-form">
                            <h4>Search</h4>
                            <form >
                                <input 
                                type="text" 
                                placeholder="Search . . .  "
                                onChange={e => this.setState({search:e.target.value})}
                                />
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                    </div>
                  <div className="row">
                    <div className="col-lg-7 col-md-7">
                      <div className="select-option">
                        
                        <select className="sorting">
                          <option value>Default Sorting</option>
                        </select>
                        <select className="p-show">
                          <option value>Show: </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-5 text-right">
                      <p>Show 01- 09 Of 36 Product</p>
                    </div>
                  </div>
                </div>
                <div className="product-list">
                  <div className="row">
                  
                  {/* {this.state.products
                  .filter(product => 
                    product.category.name.includes(this.state.filter.category)
                    && product.name.includes(this.state.filter.name))
                  .slice(this.state.filter.show*(this.state.filter.page-1) ,this.state.filter.show*this.state.filter.page) */}
                  {filterItem.map((product, index) => {
                    return (
                      <div className="col-lg-4 col-sm-6" key={index}> 
                      <div className="product-item">
                        <div className="pi-pic">
                          <img src={process.env.REACT_APP_BACKEND_URL + product.image.url} alt="" />
                          <div className="sale pp-sale">Sale</div>
                          <div className="icon">
                            <i className="icon_heart_alt" />
                          </div>
                          <ul>
                            <li className="w-icon active">
                              <a>
                                <i className="icon_bag_alt" />
                              </a>
                            </li>
                            <li className="quick-view">
                              <a>+ Quick View</a>
                            </li>
                            <li className="w-icon">
                              <a>
                                <i className="fa fa-random" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="pi-text">
                          <div className="catagory-name">{product.name}</div>
                          <a>
                            <h5>{product.description}</h5>
                          </a>
                          <div className="product-price">
                            {product.price}
                            <span>{product.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                  </div>
                </div>
                <div className="loading-more">
                  <i className="icon_loading" />
                  <a>Loading More</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
         
           
                 
        /* <div className="cart" style={{"display":loginDisplay}}>
          <div className="cart-show" >
            <button className="btn btn-warning" onClick={clickCartShow}>SHOW CART ({this.state.cart.items.length})</button>
          </div>

          <div className="cart-panel">
            <div className="cart-panel-top">
              <button className="btn btn-warning" onClick={clickCloseCartpanel}>x</button>
            </div>
            <div className="cart-panel-body">
              <div className="cart-item-list">
                {this.state.cart.items.map((item, index)=>{
                  return(
                    <div className="cart-item" key={index}>
                      <div className="item-name">{item.name}:</div>
                      <div className="item-quantity1">{item.quantity1}x m2 </div>
                      <div className="item-quantity1">{item.quantity2}x cuộn </div>
                      <div className="item-btn"><button onClick={()=>{removeItem({id:item.id, price1: Number(item.price),price2: Number(item.price)*Number(item.lengt)*Number(item.width)})}}
                      className="btn btn-success"> Remove </button></div>
                    </div>
                  )
                })}
              </div>
              <strong>Total : </strong>{this.state.cart.total} <br/>
              <button className="btn btn-primary" onClick={clickCheckout}>Check out!</button>
              <button className="btn btn-primary" onClick={clickCartCancle}>Cancle</button>
            </div>
          </div>
        </div> */

      /* <div className="container_fullwidth">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="category leftbar">
                <h3 className="title">
                  Categories
                </h3>
                <ul>
                  <li onClick={()=>this.setState({filter: {...this.state.filter,category: '',page:1}})}>
                    All
                  </li>
                  <li onClick={()=>this.setState({filter: {...this.state.filter,category: 'cotton',page:1}})}>
                    Cotton
                  </li>
                  <li onClick={()=>this.setState({filter: {...this.state.filter,category: 'kaki',page:1}})}>
                    Kaki
                  </li>
                  <li onClick={()=>this.setState({filter: {...this.state.filter,category: 'kate',page:1}})}>
                    Kate
                  </li>
                  <li onClick={()=>this.setState({filter: {...this.state.filter,category: 'jean',page:1}})}>
                    Jean
                  </li>
                  <li onClick={()=>this.setState({filter: {...this.state.filter,category: 'denim',page:1}})}>
                    Denim
                  </li>
                </ul>
              </div>
              <div className="branch leftbar">
                <h3 className="title">
                  Branch
                </h3>
                <ul>
                  <li>
                    <a href="/products">
                      New
                    </a>
                  </li>
                </ul>
              </div>
              <div className="others leftbar">
                <h3 className="title">
                  Others
                </h3>
              </div>
              <div className="fbl-box leftbar">
                <h3 className="title">
                  Facebook
                </h3>
                <span className="likebutton">
                  <a href="/products">
                    <img src="assets/img/fblike.png" alt=""/>
                  </a>
                </span>
                <p>
                  12k people like Flat Shop.
                </p>
                <ul>
                  <li>
                    <a href="/products">
                    </a>
                  </li>
                </ul>
                <div className="fbplug">
                  <a href="/products">
                    <span>
                      <img src="assets/img/fbicon.png" alt=""/>
                    </span>
                    Facebook social plugin
                  </a>
                </div>
              </div>
              <div className="leftbanner">
                <img src="assets/img/banner-small-01.png" alt=""/>
              </div>
            </div>
            <div className="col-md-9">
              <div className="banner">
                <div className="bannerslide" id="bannerslide">
                  <ul className="slides">
                    <li>
                      <a href="/products">
                        <img src="assets/img/banner-01.jpg" alt=""/>
                      </a>
                    </li>
                    <li>
                      <a href="/products">
                        <img src="assets/img/banner-02.jpg" alt=""/>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix">
              </div>
              <div className="products-list">
                <div className="toolbar">
                  <div className="sorter">
                    <div className="sort-by">
                      Sort by : 
                      <select name="" value="Default" onChange={()=>{}} >
                        <option value="Default" >
                          Default
                        </option>
                        <option value="Name">
                          Name
                        </option>
                        <option value="Price">
                          Price
                        </option>
                      </select>
                    </div>
                    <div className="limiter">
                      Show : 
                      <select onChange={(e)=>this.setState({filter:{...this.state.filter,show: e.target.value}})} value={this.state.filter.show}>
                        <option value={3}>
                          3
                        </option>
                        <option value={6}>
                          6
                        </option>
                        <option value={9}>
                          9
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="pager">
                    <button className="prev-page" onClick={clickPrevPage}>
                      <i className="fa fa-angle-left">
                      </i>
                    </button>
                    <PagNav />
                    <button className="next-page" onClick={clickNextPage}>
                      <i className="fa fa-angle-right">
                      </i>
                    </button>
                  </div>
                </div>
                <ul className="products-listItem">
                  {this.state.products
                  .filter(product => 
                    product.category.name.includes(this.state.filter.category)
                    && product.name.includes(this.state.filter.name))
                  .slice(this.state.filter.show*(this.state.filter.page-1) ,this.state.filter.show*this.state.filter.page)
                  .map((product, index) => {
                    return (
                      <li className="products" key={index}>
                        <div className="offer">
                          New
                        </div>
                        <div className="thumbnail">
                          <img src={process.env.REACT_APP_BACKEND_URL + product.image.url} alt="Product Name"/>
                        </div>
                        <div className="product-list-description">
                          <div className="productname">
                            {product.name}
                          </div>
                          <p>
                            <img src="assets/img/star.png" alt=""/>
                            <a href="/products" className="review_num">
                              02 Review(s)
                            </a>
                          </p>
                          <p>
                            {product.description}
                          </p>
                          <div className="list_bottom">
                            <div className="price">
                              <span className="new_price">
                                {product.price}
                              </span>
                              <span className="old_price">
                                {product.price}
                              </span>
                            </div>
                            <div className="button_group">
                              <button className="button" data-toggle="modal" data-target="#my_modal"
                               onClick={()=>clickAddToCart(product)}>
                                Add To Cart
                              </button>
                              <button className="button favorite">
                                <i className="fa fa-heart-o">
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                    
                <BuyProductModal />
                </div>
              </div>
            </div>
          </div>
        </div> */
     
      );
    }
    return (<h2 className="ProductList-title">Waiting for API...</h2>);
  }
}

export default ProductList;