import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Jumbotron } from 'reactstrap'

class AdminDashboard extends Component {

    render() {
        return (
            <div>
                <div>
                    <div className='row'>
                        <Jumbotron className='bg col col-md-12 col-sm-12 col-lg-12 mr-1'>
                            <h1 className="display-4 text-center">ADD KAOS</h1>
                            <p className="lead">
                                <div className='text-center'>
                                    <Link to='/inputkaos'>
                                        <Button className='btn'>Add Kaos</Button>
                                    </Link>
                                </div>
                            </p>
                        </Jumbotron>
                        <Jumbotron className='bg col col-md-12 col-sm-12 col-lg-12'>
                            <h1 className="display-4 text-center">ADD KEMEJA</h1>
                            <p className="lead">
                                <div className='text-center'>
                                    <Link to='/inputkemeja'>
                                        <Button className='btn'>Add Kemeja</Button>
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
                </div>
            </div>
        );
    }
}

export default AdminDashboard;