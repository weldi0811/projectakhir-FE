import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProduct,clearProduct} from '../../actions/index'

class AllProduct extends Component{

    async componentWillMount(){
        // this.props.clearProduct()
        window.scrollTo(0,0)
        await this.props.getAllProduct()
        console.log(this.props.productsSTATE)
    }

    renderListProduct = () => {
        let render = this.props.productsSTATE.map( product => {
            return (
                <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3 shadow" key={product.id}>
                    <center>
                    <img src={`http://localhost:4000/product/photos/${product.thumbnail}`} style={{ width: "100%", borderRadius: "25px" }} className = 'mt-5'></img>
                    </center>
                    
                    <div className='card-body'>
                        <h5 className='card-title'> {product.product_name} </h5>
                        <span 
                        className={'badge badge-pill ' + ( product.category === 'kaos' ? 'badge-primary' : ( product.category === 'kemeja' ? 'badge-success' : 'badge-danger' ) ) }> {product.category} </span>
                        {product.status === 1 ? <h3 className='badge badge-pill badge-primary ml-2'>Tersedia</h3> : <h3 className='badge badge-pill badge-danger ml-2'>Tidak Tersedia</h3>}
                        
                        <p className='card-text'> Rp. {product.price.toLocaleString()} </p>
                        
                        <Link to={`/product/${product.id}`} >
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