import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from '../../config/axios';


const imageStyle = {
    width: '100%',
    borderRadius: '25px'
}

const verticalCenter = {
    // minHeight: '100%',  
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white'
}

const backStyle = {
    fontSize: '39px',
    backgroundColor: '#d9534f',    // bootstrap danger #hex
    color: 'white',
    borderRadius: '50%'
}

class ProductDetail extends Component {
    state = {
        detailProduct: {},
        size : ''
    }

    async componentWillMount() {
        //nangkep parameter dari app.js
        let productID = this.props.match.params.prod_id

        try {
            const res = await axios.get(`/product/${productID}`)

            this.setState({ detailProduct: res.data[0] })
        } catch (error) {
            console.error(error)

        }
        console.log(this.state.detailProduct)
    }

    countStock = () => {
        let stockS = parseInt(this.state.detailProduct.stock_S)
        let stockM = parseInt(this.state.detailProduct.stock_M)
        let stockL = parseInt(this.state.detailProduct.stock_L)
        let stockXL = parseInt(this.state.detailProduct.stock_L)

        let hasil = stockS + stockM + stockL + stockXL

        console.log(typeof(stockS))
        console.log(typeof(hasil))
        return hasil
    }

    renderItem = () => {
        const { id, product_name, category, stock_S, stock_M, stock_L, stock_XL, price, weight, description, thumbnail,status } = this.state.detailProduct

        return (
            <div className='jumbotron' style={verticalCenter}>
                <div className='container' style={{ borderRadius: '25px' }}>
                    <Link to='/allproduct'>
                        <button>back</button>
                    </Link>
                    <div className='row m-5'>
                        <div className='col'>
                            <img src={`http://localhost:4000/product/photos/${thumbnail}`} style={imageStyle}></img>
                        </div>
                        <div className='col'>
                            <h2>{product_name}</h2>
                            <h3 className={'badge badge-pill ' + (category === 'kaos' ? 'badge-primary' : (category === 'kemeja' ? 'badge-success' : 'badge-danger'))} >{category}</h3>
                            <h3> Rp {price} </h3>
                            <p>{description}</p>
                            <h3>stock tersedia : {this.countStock()}</h3>
                            <h5>quantity</h5>
                            <input ref={input => this.quantity = input} type='number' placeholder="Quantity" className="form-control mb-3" min="1" defaultValue={1} />

                            {status === 1 ? <button className='btn btn-primary' onClick={() => {}}>Tambahkan ke keranjang</button> : <button className='btn btn-danger' disabled>Barang tidak tersedia</button>}
                        </div>

                    </div>

                </div>
            </div>
        )

    }

    render() {
        return (
            <div>
                {this.renderItem()}
            </div>
        );
    }
}

export default ProductDetail;