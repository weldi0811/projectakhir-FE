import React , {Component} from 'react'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Link} from 'react-router-dom'
import {onLogout, keepLogin} from '../actions/index'
import {connect} from 'react-redux'


class Header extends React.Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    headerNotLogin = () => {
        return (
            <div>
                    <Navbar color="light" light expand="md">
                        <Link to='/'>
                            <NavbarBrand>Ithink</NavbarBrand>
                        </Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        {/* ngisi produk dkk*/}
                        <Nav className = 'd-md-flex d-block flex-row mx-md-auto' navbar>

                        <div className="dropdown btn-group">
                            <Button className="btn btn-light dropdown-toggle"
                                type="button" id="dropdownMenu1" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                    Products
                            </Button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">

                                <NavItem className ='mx-2'>
                                    <Link to='/kaos'>
                                        <button className = 'btn btn-light ' style={{width:'100%'}}>Kaos</button>
                                    </Link>   
                                </NavItem>

                                <NavItem className ='mx-2'>
                                    <Link to='/kemeja'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>Kemeja</button>
                                    </Link>
                                </NavItem>

                                <NavItem className ='mx-2'>
                                    <Link to='/allproduct'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>All Product</button>
                                    </Link>   
                                </NavItem>
                                </div>
                            </div>
                            <NavItem className ='mx-2'>
                                <button className = 'btn btn-light'>Contact Us</button>
                            </NavItem>
                            <NavItem className ='mx-2'>
                                <button className = 'btn btn-light'>About Us</button>
                            </NavItem>
                        </Nav>
                        {/* login register*/}
                        <Nav className="ml-mx-auto" navbar>
                            <NavItem className ='mx-2'>
                                <Link to='/login'>
                                    <button className = 'btn btn-light' >Sign In</button>
                                </Link>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </Navbar>
                    
                </div>
            
        )
    }

    headerLogin = () => {
    
        return(
            <div>
                <Navbar color="light" light expand="md">
                        <Link to='/'>
                            <NavbarBrand>Ithink</NavbarBrand>
                        </Link>
                        
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        {/* ngisi produk dkk*/}
                        <Nav className = 'd-md-flex d-block flex-row mx-md-auto' navbar>
                        <div class="dropdown btn-group">
                            <Button className="btn btn-light dropdown-toggle"
                                type="button" id="dropdownMenu1" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" >
                                    Products
                            </Button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu1">

                                <NavItem className ='mx-2'>
                                    <Link to='/kaos'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>Kaos</button>
                                    </Link>   
                                </NavItem>

                                <NavItem className ='mx-2'>
                                    <Link to='/kemeja'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>Kemeja</button>
                                    </Link>
                                </NavItem>

                                <NavItem className ='mx-2'>
                                    <Link to='/allproduct'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>All Product</button>
                                    </Link>   
                                </NavItem>
                                </div>
                            </div>
                            <NavItem className ='mx-2'>
                                <button className = 'btn btn-light'>Contact Us</button>
                            </NavItem>
                            <NavItem className ='mx-2'>
                                <button className = 'btn btn-light'>About Us</button>
                            </NavItem>
                        </Nav>

                        {/* logout */}
                        <Nav className="ml-mx-auto" navbar>
                           <div class="dropdown btn-group btn-group-justified" style = {{width:'100%'}}>
                            <Button className="btn btn-light"
                                type="button" id="dropdownMenu1" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-user-alt"></i>
                                Hi, {this.props.objectUser.username}      
                            </Button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu1">

                                <NavItem className ='mx-2'>
                                    <Link to='/profile'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>Profile</button>
                                    </Link>   
                                </NavItem>

                                <NavItem className ='mx-2'>
                                    <Link to='/cart'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>cart</button>
                                    </Link>
                                </NavItem>

                                <NavItem className ='mx-2'>
                                    <Link to='/checkout'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>checkout</button>
                                    </Link>
                                </NavItem>
                                <NavItem className ='mx-2'>
                                    <Link to='/myorder'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>My orders</button>
                                    </Link>
                                </NavItem>

                                <NavItem className ='mx-2'>
                                        <button className = 'btn btn-light' style={{width:'100%'}} onClick={()=>{this.props.onLogout()}}>logout</button>
                                </NavItem>
                                </div>
                            </div>
                        </Nav>
                        </Collapse>
                    </Navbar>
            </div>
        )
    }

    render(){
        //kalau belom login 
        if(this.props.objectUser.id === ''){
            return (
                this.headerNotLogin()
            )
        }
        else {
            return (
                this.headerLogin()
            )
        }
    }   
}

        

const mapStatetoProps = state => {
    return {
        objectUser : state.auth
    }
}

export default connect(mapStatetoProps, {onLogout, keepLogin})(Header)