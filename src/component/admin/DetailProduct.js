import React, { Component } from 'react'
import axios from '../../config/axios'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateStatusProduct, getAllProduct, editProduct } from '../../actions/index'


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

class DetailProduct extends Component {

    state = {
        detailProduct: {},
        status: false,
        edit: false,
        newName: '',
        newPrice: '',
        newDesc: ''
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

        console.log(typeof (stockS))
        console.log(typeof (hasil))
        return hasil
    }

    setStatusClick = async (id) => {
        await this.props.updateStatusProduct(id)
        this.setState({ status: true })

    }
    onEditClick = () => {
        this.setState({ edit: true })
    }

    onSaveClick = async () => {

        let productID = this.state.detailProduct.id
        let newName = this.newProduct_name.value
        let newPrice = this.newPrice.value
        let newDesc = this.newProductDesc.value

        if (newName === '') {
            newName = this.state.detailProduct.product_name
        }

        if (newPrice === '') {
            newPrice = this.state.detailProduct.price
        }

        if (newDesc === '') {
            newDesc = this.state.detailProduct.description
        }

        console.log(newName)
        console.log(newPrice)
        console.log(newDesc)

        await this.props.editProduct(productID, newName, newPrice, newDesc)

        this.setState({ edit: false })

        try {
            const res = await axios.get(`/product/${productID}`)

            this.setState({ detailProduct: res.data[0] })
        } catch (error) {
            console.error(error)

        }

    }

    onCancelClick = () => {
        this.setState({ edit: false })
    }

    renderItem = () => {
        const { id, product_name, category, stock_S, stock_M, stock_L, stock_XL, price, weight, description, thumbnail, status } = this.state.detailProduct
        console.log(this.state.detailProduct)
        return (
            <div className='jumbotron' style={verticalCenter}>

                <div className='container' style={{ borderRadius: '25px' }}>
                    <Link to='/listproduk'>
                        <button className='btn btn-primary'>back</button>
                    </Link>


                    <h2 className='text-center'>{product_name}</h2>
                    <div className='row m-5'>

                        <div className='col'>
                            <img src={`http://localhost:4000/product/photos/${thumbnail}`} style={imageStyle}></img>
                        </div>
                        <div className='col'>
                            <h3 className={'mr-2 badge badge-pill ' + (category === 'kaos' ? 'badge-primary' : (category === 'kemeja' ? 'badge-success' : 'badge-danger'))} >{category}</h3>
                            {status === 1 ? <h3 className='badge badge-pill badge-primary'>Tersedia</h3> : <h3 className='badge badge-pill badge-danger'>Tidak Tersedia</h3>}
                            <h3> Rp {price} </h3>
                            <p>{description}</p>
                            <h5>stock S : {stock_S} </h5>
                            <h5>stock M : {stock_M} </h5>
                            <h5>stock L : {stock_L} </h5>
                            <h5>stock XL : {stock_XL} </h5>
                            <h3>stock tersedia : {this.countStock()}</h3>

                            <button className='mr-1 btn btn-primary' onClick={() => { this.onEditClick() }}>edit</button>
                            {status === 1 ? <button className='btn btn-danger' onClick={() => { this.setStatusClick(id) }}>set not available</button> : <button className='btn btn-danger' onClick={() => { this.setStatusClick(id) }}>set available</button>}
                        </div>

                    </div>

                </div>
            </div>
        )

    }

    renderEditItem = () => {

        const { id, product_name, category, stock_S, stock_M, stock_L, stock_XL, price, weight, description, thumbnail, status } = this.state.detailProduct
        console.log(this.state.detailProduct)
        return (
            <div className='jumbotron' style={verticalCenter}>
                <div className='container' style={{ borderRadius: '25px' }}>
                    <div className='row m-5'>
                        <div className='col mt-5'>
                            <img src={`http://localhost:4000/product/photos/${thumbnail}`} style={imageStyle}></img>
                        </div>
                        <div className='col'>

                            <label for='productname' className='ml-auto form-group'><b>Product Name</b></label>
                            <input type='text' ref={input => this.newProduct_name = input} className='form-control' placeholder={product_name}></input>

                            <label for='Description' className='ml-auto form-group'><b>Description</b></label>
                            <form className="input-group">
                                <textarea placeholder="Product Description" ref={input => this.newProductDesc = input} className="form-control mb-2" type="text" style={{ height: "200px" }} required />
                            </form>

                            <label for='price' className='ml-auto form-group'><b>Price</b></label>
                            <input type='text' ref={input => this.newPrice = input} className='form-control' placeholder={price}></input>


                            <h3 className={'mr-2 badge badge-pill ' + (category === 'kaos' ? 'badge-primary' : (category === 'kemeja' ? 'badge-success' : 'badge-danger'))} >{category}</h3>
                            {status === 1 ? <h3 className='badge badge-pill badge-primary'>Tersedia</h3> : <h3 className='badge badge-pill badge-danger'>Tidak Tersedia</h3>}

                            <h3>stock S : {stock_S} </h3>
                            <h3>stock M : {stock_M} </h3>
                            <h3>stock L : {stock_L} </h3>
                            <h3>stock XL : {stock_XL} </h3>
                            <h3>stock tersedia : {this.countStock()}</h3>

                            <button className='mr-1 btn btn-primary' onClick={() => { this.onSaveClick() }}>save</button>
                            <button className='mr-1 btn btn-warning' onClick={() => { this.onCancelClick() }}>cancel</button>
                            {status === 1 ? <button className='btn btn-danger' onClick={() => { this.setStatusClick(id) }}>set not available</button> : <button className='btn btn-danger' onClick={() => { this.setStatusClick(id) }}>set available</button>}
                        </div>

                    </div>

                </div>
            </div>
        )

    }

    render() {

        if (this.state.status === true) {
            return (<Redirect to='/listproduk' />)
        }

        if (this.state.edit === true) {
            return this.renderEditItem()
        }


        return (
            <div>
                <div>{this.renderItem()}</div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        objectAdmin: state.adminAuth // bikin namanya sesuka hati

    }
}

export default connect(mapStatetoProps, { updateStatusProduct, getAllProduct, editProduct })(DetailProduct);