import React , {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Kaos from '../component/products/Kaos'
import Kemeja from '../component/products/Kemeja'
import AllProduct from '../component/products/AllProduct'
import AdminLogin from '../component/admin/AdminLogin'
import Profile from '../component/users/Profile'

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
            <Route path ='/admin' component={AdminLogin}/>

            <Header />
            <Route path ='/' exact component={Home} />
            <Route path ='/login' component={Login} />
            <Route path ='/register' component={Register} />
            <Route path ='/kaos' component={Kaos} />
            <Route path ='/allproduct' component={AllProduct} />
            <Route path ='/kemeja' component={Kemeja} />
            <Route path ='/profile' component = {Profile} />
            <Footer />
            
        </BrowserRouter>
        
        
    )
}
}

export default connect(null, {keepLogin})(App)