import React , {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Kaos from '../component/products/Kaos'
import Kemeja from '../component/products/Kemeja'
import ProductDetail from '../component/products/ProductDetail'
import AllProduct from '../component/products/AllProduct'
import AdminLogin from '../component/admin/AdminLogin'
import Profile from '../component/users/Profile'
import CartUser from '../component/users/CartUser'
import CheckoutUser from '../component/users/CheckoutUser'
import Transaction from '../component/users/Transaction'
import AddKaos from './admin/AddKaos'
import AddKemeja from './admin/AddKemeja'
import AdminDashboard from '../component/admin/AdminDashboard'
import ListProduct from '../component/admin/ListProduct'
import DetailProduct from '../component/admin/DetailProduct'
import ManageTransaction from '../component/admin/ManageTransaction'

import {BrowserRouter,Route} from 'react-router-dom'
import {keepLogin} from '../actions/index'
import {connect} from 'react-redux'


import cookies from 'universal-cookie';


const cookie = new cookies()


class App extends Component {

    componentDidMount() {
        var userCookie = cookie.get("ithinkUser");

        if (userCookie !== undefined) {
          this.props.keepLogin(userCookie);
        }
    }
  render() {
    return (
        <BrowserRouter>
            <Route path ='/admin' exact component={AdminLogin}/>
            <Route path ='/inputkaos' component={AddKaos}/>
            {/* <Route path ='/inputkemeja' component={AddKemeja}/> */}
            <Route path ='/dashboard' component={AdminDashboard}/>
            <Route path ='/listproduk' component={ListProduct}/>
            <Route path ='/orders' component={ManageTransaction}/>
            <Route path ='/admin/produk/:prod_id' component={DetailProduct}/>


            
            <Route path ='/' exact component={Home} />
            <Route path ='/login' component={Login} />
            <Route path ='/register' component={Register} />
            <Route path ='/kaos' component={Kaos} />
            <Route path ='/allproduct' component={AllProduct} />
            <Route path ='/product/:prod_id' component={ProductDetail} />
            <Route path ='/kemeja' component={Kemeja} />
            <Route path ='/profile' component = {Profile} />
            <Route path ='/cart' component = {CartUser} />
            <Route path ='/checkout' component = {CheckoutUser} />
            <Route path ='/myorder' component = {Transaction} />
            
            
        </BrowserRouter>
        
        
    )
}
}

export default connect(null, {keepLogin})(App)