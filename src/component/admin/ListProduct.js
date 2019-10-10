import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllProduct, clearProduct } from '../../actions/index'
import HeaderAdmin from '../HeaderAdmin'

class ListProduct extends Component {

    async componentWillMount() {

        window.scrollTo(0, 0)
        await this.props.getAllProduct()
        console.log(this.props.productsSTATE)
    }

    renderProductList = () => {
        let render = this.props.productsSTATE.map(product => {

            return (
                <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3 shadow" key={product.id}>
                    <center>
                        <img src={`http://localhost:4000/product/photos/${product.thumbnail}`} style={{ width: "150px", borderRadius: "25px" }} className='mt-5'></img>
                    </center>

                    <div className='card-body'>
                        <h5 className='card-title'> {product.product_name} </h5>
                        <span
                            className={'mr-2 badge badge-pill ' + (product.category === 'kaos' ? 'badge-primary' : (product.category === 'kemeja' ? 'badge-success' : 'badge-danger'))}> {product.category} </span>
                        { product.status === 1 ? <h3 className='badge badge-pill badge-primary'>Tersedia</h3> :  <h3 className='badge badge-pill badge-danger'>Tidak Tersedia</h3>  }

                            
                        <p className='card-text'> Rp. {product.price.toLocaleString()} </p>
                        <p className='card-text'> Stok Tersedia</p>
                        <p className='card-text'> S : {product.stock_S}</p>
                        <p className='card-text'> M : {product.stock_M}</p>
                        <p className='card-text'> L : {product.stock_L}</p>
                        <p className='card-text'> XL : {product.stock_XL}</p>

                        <Link to={`/admin/produk/${product.id}`} >
                            <button className="btn btn-danger btn-block" > Detail </button>
                        </Link>
                    </div>
                </div>
            )
        })

        return render
    }

    render() {
        if(this.props.objectAdmin.admin_name !== ''){
            return (
                <div>
                    <HeaderAdmin />
                    <h1 className='text-center my-2'>LIST PRODUK</h1>
                    <div className="row col-12 offset-1">
                        {this.renderProductList()}
                    </div>
                </div>
            );
        } else {
            return(
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
        productsSTATE: state.product.products,
        objectAdmin: state.adminAuth // bikin namanya sesuka hati

    }
}

export default connect(mapStatetoProps, { getAllProduct, clearProduct })(ListProduct);