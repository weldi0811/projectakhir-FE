import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProduct,clearProduct} from '../../actions/index'

class AllProduct extends Component{

    async componentWillMount(){
        this.props.clearProduct()
        window.scrollTo(0,0)
        await this.props.getAllProduct
    }


    renderListProduct = () => {
        let render = this.props.productsSTATE.map( product => {
            return (
                <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3 shadow" key={product.id} >
                    <center>
                    {/* <img src={`http://localhost:/products/${product.image}`} className="card-img-top shadow-lg mt-2" alt="products" style={borderRadius} /> */}
                    </center>
                    
                    <div className='card-body'>
                        <h5 className='card-title'> {product.product_name} </h5>
                        <span 
                        className={'badge badge-pill ' + ( product.category === 'Exterior' ? 'badge-primary' : ( product.category === 'Interior' ? 'badge-success' : 'badge-danger' ) ) }> {product.category} </span>
                        <p className='card-text'> Rp. {product.price.toLocaleString()} </p>
                        
                        <Link to={`/productdetail/${product.id}`} >
                            <button className="btn btn-danger btn-block" > Detail </button>
                        </Link>
                    </div>
                </div>
            )
        })

        return render;
    }



    render(){
        return (
            // Category and Price Filter column
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-2 col-lg-2 mt-2 ">
                        <div className="card make-me-sticky">
                            <article className="card-group-item mt-3">
                                <header className="card-header bg-danger"><h6 className="title text-white"> Category </h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">
                                        {/* {this.renderCategory()} */}

                                        {/*  */}
                                    <a href="#" className="list-group-item">Exterior <span className="float-right badge badge-light round">10</span> </a>
                                    <a href="#" className="list-group-item">Interior  <span className="float-right badge badge-light round">5</span>  </a>
                                    <a href="#" className="list-group-item">Engine <span className="float-right badge badge-light round">4</span>  </a>
                                    </div>  
                                </div>
                            </article> 
                            <article className="card-group-item">
                                <header className="card-header bg-danger">
                                    <h6 className="title text-white">Price Range Input</h6>
                                </header>
                                    <div className="filter-content">
                                        <div className="card-body">
                                            <div className="form-row">
                                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                                <button onClick={this.onBtnSearch} className="btn btn-outline-danger btn-block mt-5">Search</button>
                                        
                                            </div>
                                        </div>
                                    </div>
                            </article> 
                        </div> 
                    </div>

                    {/* render getProducts() */}
                    <div className="row col-10">

                        {this.renderListProduct()}

                    </div>

                </div>    
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        productsSTATE : state.product.products
    }
}


export default connect(mapStatetoProps, {getAllProduct, clearProduct})(AllProduct)