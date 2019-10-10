import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProduct,clearProduct} from '../../actions/index'
import Header from '../Header'
import Footer from '../Footer'

class AllProduct extends Component{

    state = {
        products : [],
        searchProducts : []
    }


    async componentDidMount(){
        
        window.scrollTo(0,0)
        const res = await this.props.getAllProduct()
        this.setState({
            products: this.props.productsSTATE,
            searchProducts: this.props.productsSTATE
        })
        console.log(this.props.productsSTATE)
        console.log(this.state.products)
        console.log(this.state.searchProducts)
    }

    compare = (a,b) => {
        if(a.status < b.status){
            return -1
        }
        if(a.status > b.status){
            return 1
        }
        return 0
    }

    renderListProduct = () => {
        let render = this.state.searchProducts.map( product => {
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

    onBtnSearch = () => {
        const name = this.searchname.value
        const min = parseInt(this.min.value)
        const max = parseInt(this.max.value)

        var arrSearch = this.state.products.filter(item => {
            if(isNaN(min) && isNaN(max)){ // Search by Name
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                )
            } else if (isNaN(min)) { // Search by Name & MAX
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price <= max
                )
            } else if (isNaN(max)) { // Search by Name & MIN
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price >= min
                )
            } else {
                return ( // Search by MAX & MIN
                    item.product_name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price <= max &&
                    item.price >= min
                )
            }
        })

        this.setState({searchProducts : arrSearch})
    }

    render(){
        return (
            // Category and Price Filter column
            <div>
                <Header />
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
                                    <div className="border-bottom border-secondary card-title">
                                    <h1>Search</h1>
                                </div>
                                                                
                                        <div className="form-row">
                                        <form className="input-group"><input placeholder="name" ref={input => this.searchname = input} className="form-control mb-2" type="text" /></form>
                                            <h4>Price Range</h4>
                                            <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                            <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                            <button onClick={() => {this.onBtnSearch()}} className="btn btn-outline-danger btn-block mt-5">Search</button>
                                    
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
                <Footer /> 
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