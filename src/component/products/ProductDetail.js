import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from '../../config/axios';
import Swal from 'sweetalert2'
import {getCart,addToCartL,addToCartXL,addToCartS,addToCartM,updateQTYS,updateQTYM,updateQTYL,updateQTYXL} from '../../actions/index'


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
        size: ''
    }

    async componentWillMount() {
        //nangkep parameter dari app.js
        let productID = this.props.match.params.prod_id

        try {
            const res = await axios.get(`/product/${productID}`)

            this.setState({ detailProduct: res.data[0] })
            await this.props.getCart(this.props.objectUser)
        } catch (error) {
            console.error(error)

        }
        console.log(this.state.detailProduct)
        console.log(this.props.objectUser)
        console.log(this.props.cartState)
    }

    countStock = () => {
        let stockS = parseInt(this.state.detailProduct.stock_S)
        let stockM = parseInt(this.state.detailProduct.stock_M)
        let stockL = parseInt(this.state.detailProduct.stock_L)
        let stockXL = parseInt(this.state.detailProduct.stock_L)

        let hasil = stockS + stockM + stockL + stockXL

        console.log(typeof (stockS))
        console.log(typeof (hasil))
        return hasil
    }

    addToCartButton_S = async () => {
        if(this.props.objectUser.id === '') {
            alert ('login dulu lah sob')

            return(
                this.props.history.push('/login')
            )
        }

        const qtyProduct_S = parseInt(this.qty_S.value)
        var prod_id = parseInt(this.props.match.params.prod_id)

        const existProduct = this.props.cartState.find(Item =>Item.product_id == prod_id) //value didapet dari state cart

        if(existProduct){
            //update qty
            const newQty_S = existProduct.qty_S + qtyProduct_S
            const result = await this.props.updateQTYS(existProduct.product_id, this.props.objectUser.id, newQty_S)

            if(result.affectedRows === 1){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Keranjang sudah di update'
                  })
            }
            await this.props.getCart(this.props.objectUser)
        } else {
            const resdata = await this.props.addToCartS(prod_id,this.props.objectUser.id,qtyProduct_S)

            if(resdata.affectedRows === 1) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Produk berhasil ditambahkan'
                  })
            }
            await this.props.getCart(this.props.objectUser)
        }
    }

    addToCartButton_M = async () => {
        if(this.props.objectUser.id === '') {
            alert ('login dulu lah sob')

            return(
                this.props.history.push('/login')
            )
        }

        const qtyProduct_M = parseInt(this.qty_M.value)
        var prod_id = parseInt(this.props.match.params.prod_id)

        console.log('ini dalem function')
        console.log(this.props.cartState)
        console.log(typeof(prod_id))
        

        const existProduct = this.props.cartState.filter( cartItem => cartItem.product_id === prod_id).shift() //value didapet dari state cart
        console.log(existProduct)

        if(existProduct){
            //update qty
            const newQty_M = existProduct.qty_M + qtyProduct_M
            const result = await this.props.updateQTYM(existProduct.product_id, this.props.objectUser.id, newQty_M)

            if(result.affectedRows === 1){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Keranjang sudah di update'
                  })
            }
            await this.props.getCart(this.props.objectUser)
        } else {
            const resdata = await this.props.addToCartM(prod_id,this.props.objectUser.id,qtyProduct_M)

            if(resdata.affectedRows === 1) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Produk berhasil ditambahkan'
                  })
            }
            await this.props.getCart(this.props.objectUser)
        }
    }

    addToCartButton_L = async () => {
        if(this.props.objectUser.id === '') {
            alert ('login dulu lah sob')

            return(
                this.props.history.push('/login')
            )
        }

        const qtyProduct_L = parseInt(this.qty_L.value)
        var prod_id = parseInt(this.props.match.params.prod_id)

        const existProduct = this.props.cartState.find( cartItem => cartItem.product_id === prod_id) //value didapet dari state cart

        if(existProduct){
            //update qty
            const newQty_L = existProduct.qty_L + qtyProduct_L
            const result = await this.props.updateQTYL(existProduct.product_id, this.props.objectUser.id, newQty_L)

            if(result.affectedRows === 1){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Keranjang sudah di update'
                  })
            }
            await this.props.getCart(this.props.objectUser)
        } else {
            const resdata = await this.props.addToCartL(prod_id,this.props.objectUser.id,qtyProduct_L)

            if(resdata.affectedRows === 1) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Produk berhasil ditambahkan'
                  })
            }
            await this.props.getCart(this.props.objectUser)
        }
    }

    addToCartButton_XL = async () => {

        if(this.props.objectUser.id === '') {
            alert ('login dulu lah sob')

            return(
                this.props.history.push('/login')
            )
        }

        const qtyProduct_XL = parseInt(this.qty_XL.value)
        var prod_id = parseInt(this.props.match.params.prod_id)
        const existProduct = this.props.cartState.find( cartItem => cartItem.product_id === prod_id) //value didapet dari state cart

        if(existProduct){
            //update qty
            const newQty_XL = existProduct.qty_XL + qtyProduct_XL
            const result = await this.props.updateQTYXL(existProduct.product_id, this.props.objectUser.id, newQty_XL)

            if(result.affectedRows === 1){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Keranjang sudah di update'
                  })
            }
            await this.props.getCart(this.props.objectUser)
        } else {
            const resdata = await this.props.addToCartXL(prod_id,this.props.objectUser.id, qtyProduct_XL)

            if(resdata.affectedRows === 1) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Produk berhasil ditambahkan'
                  })
            }
            await this.props.getCart(this.props.objectUser)
        }
        
    }

    renderSize = () => {
        if (this.state.size === 'M') {
            return (
                <div>
                    <h2 className='badge badge-pill badge-success'>Size M tersedia : {this.state.detailProduct.stock_M}</h2>
                    <h5>quantity M</h5>
                    <input ref={input => this.qty_M = input} type='number' placeholder="QuantityM" className="form-control mb-3" min="1" defaultValue={1} />

                    {this.state.detailProduct.status === 1 ? <button className='btn btn-primary' onClick={() => { this.addToCartButton_M()}}>Tambahkan ke keranjang</button> : <button className='btn btn-danger' disabled>Barang tidak tersedia</button>}

                </div>
            )
        } else if (this.state.size === 'S') {
            return (
                <div>
                    <h2 className='badge badge-pill badge-success'>Size S tersedia : {this.state.detailProduct.stock_S}</h2>
                    <h5>quantity S</h5>
                    <input ref={input => this.qty_S = input} type='number' placeholder="QuantityS" className="form-control mb-3" min="1" defaultValue={1} />

                    {this.state.detailProduct.status === 1 ? <button className='btn btn-primary' onClick={() => { this.addToCartButton_S() }}>Tambahkan ke keranjang</button> : <button className='btn btn-danger' disabled>Barang tidak tersedia</button>}

                </div>
            )
        } else if (this.state.size === 'L') {
            return (
                <div>
                    <h2 className='badge badge-pill badge-success'>Size L tersedia : {this.state.detailProduct.stock_L}</h2>
                    <h5>quantity L</h5>
                    <input ref={input => this.qty_L = input} type='number' placeholder="QuantitLy" className="form-control mb-3" min="1" defaultValue={1} />

                    {this.state.detailProduct.status === 1 ? <button className='btn btn-primary' onClick={() => { this.addToCartButton_L() }}>Tambahkan ke keranjang</button> : <button className='btn btn-danger' disabled>Barang tidak tersedia</button>}

                </div>
            )
        } else if (this.state.size === 'XL') {
            return (
                <div>
                    <h2 className='badge badge-pill badge-success'>Size XL tersedia : {this.state.detailProduct.stock_XL}</h2>
                    <h5>quantity XL</h5>
                    <input ref={input => this.qty_XL = input} type='number' placeholder="QuantityXL" className="form-control mb-3" min="1" defaultValue={1} />

                    {this.state.detailProduct.status === 1 ? <button className='btn btn-primary' onClick={() => { this.addToCartButton_XL()}}>Tambahkan ke keranjang</button> : <button className='btn btn-danger' disabled>Barang tidak tersedia</button>}

                </div>
            )
        }
    }

    renderItem = () => {
        const { id, product_name, category, stock_S, stock_M, stock_L, stock_XL, price, weight, description, thumbnail, status } = this.state.detailProduct

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
                            <h2 className='badge badge-pill badge-info mx-1' onClick={() => {this.setState({size : 'S'})}}>size S</h2>
                            <h2 className='badge badge-pill badge-info mx-1' onClick={() => {this.setState({size : 'M'})}}>size M</h2>
                            <h2 className='badge badge-pill badge-info mx-1' onClick={() => {this.setState({size : 'L'})}}>size L</h2>
                            <h2 className='badge badge-pill badge-info mx-1' onClick={() => {this.setState({size : 'XL'})}}>size XL</h2>

                            {/* BIKIN KONDISI BUAT DISPLAY STOCK SIZE YANG MANA */}
                            {this.renderSize()}
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

const mapStatetoProps = state => {
    return{
        objectUser : state.auth,
        productState : state.product.products,
        cartState : state.cart.cart
    }
}

export default connect(mapStatetoProps, {getCart,addToCartL,addToCartXL,addToCartS,addToCartM,updateQTYS,updateQTYM,updateQTYL,updateQTYXL})(ProductDetail);