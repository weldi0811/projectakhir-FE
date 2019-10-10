import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Jumbotron } from 'reactstrap'
import {connect} from 'react-redux'
import axios from '../../config/axios'
import HeaderAdmin from '../HeaderAdmin'

class AdminDashboard extends Component {

   

    render() {
        if(this.props.objectAdmin.admin_name !== ''){
            return (
                <div>
                    <HeaderAdmin />
                    <div>
                        <div className='row'>
                            <Jumbotron className='bg col col-md-12 col-sm-12 col-lg-12 mr-1'>
                                <h1 className="display-4 text-center">ADD Item</h1>
                                <p className="lead">
                                    <div className='text-center'>
                                        <Link to='/inputkaos'>
                                            <Button className='btn'>Add Item</Button>
                                        </Link>
                                    </div>
                                </p>
                            </Jumbotron>
                        </div>
                        <div className='row'>
                            <Jumbotron className='bg col col-md-12 col-sm-12 col-lg-12 mr-1'>
                                <h1 className="display-4 text-center">LIST PRODUK</h1>
                                <p className="lead">
                                    <div className='text-center'>
                                        <Link to='/listproduk'>
                                            <Button className='btn'>List Produk</Button>
                                        </Link>
                                    </div>
                                </p>
                            </Jumbotron>
                        </div>
                        <div className='row'>
                            <Jumbotron className='bg col col-md-12 col-sm-12 col-lg-12 mr-1'>
                                <h1 className="display-4 text-center">TRANSACTIONS</h1>
                                <p className="lead">
                                    <div className='text-center'>
                                        <Link to='/orders'>
                                            <Button className='btn'>MANAGE TRANSACTION</Button>
                                        </Link>
                                    </div>
                                </p>
                            </Jumbotron>
                        </div>
                        
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className='center'>
                    <h1 className='center'>ACCESS DENIED</h1>
                    <Link to='/admin'>
                    <button className='btn btn-primary'>LOGIN</button>
                    </Link>
                </div>
                </div>

                
            )
        }
    }
}

const mapStatetoProps = state => {
    return {
        objectAdmin: state.adminAuth // bikin namanya sesuka hati
    }
}

export default connect(mapStatetoProps) (AdminDashboard);