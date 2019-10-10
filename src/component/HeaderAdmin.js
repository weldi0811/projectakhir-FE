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
import {onLogoutAdmin, keepLogin} from '../actions/index'
import {connect} from 'react-redux'


class HeaderAdmin extends React.Component{

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
                            <NavbarBrand>Ithink Admin</NavbarBrand>
                        </Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        {/* ngisi produk dkk*/}
                        <Nav className = 'd-md-flex d-block flex-row mx-md-auto' navbar>

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
                        <Link to='/dashboard'>
                            <NavbarBrand>Ithink Admin</NavbarBrand>
                        </Link>
                        
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        {/* ngisi produk dkk*/}
                        
                        {/* logout */}
                        <Nav className="ml-mx-auto" navbar>
                           <div class="dropdown btn-group btn-group-justified" style = {{width:'100%'}}>
                            <Button className="btn btn-light"
                                type="button" id="dropdownMenu1" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-user-alt"></i>
                                Hi, {this.props.objectAdmin.admin_name}      
                            </Button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu1">

                                <NavItem className ='mx-2'>
                                    <Link to='/profile'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>Add Item</button>
                                    </Link>   
                                </NavItem>

                                <NavItem className ='mx-2'>
                                    <Link to='/cart'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>List Produk</button>
                                    </Link>
                                </NavItem>

                                <NavItem className ='mx-2'>
                                    <Link to='/checkout'>
                                        <button className = 'btn btn-light' style={{width:'100%'}}>Transactions</button>
                                    </Link>
                                </NavItem>

                                <NavItem className ='mx-2'>
                                        <button className = 'btn btn-light' style={{width:'100%'}} onClick={()=>{this.props.onLogoutAdmin()}}>logout</button>
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
        
            return (
                this.headerLogin()
            )
        }
    }   


        

const mapStatetoProps = state => {
    return {
        objectUser : state.auth,
        objectAdmin: state.adminAuth
    }
}

export default connect(mapStatetoProps, {onLogoutAdmin, keepLogin})(HeaderAdmin)