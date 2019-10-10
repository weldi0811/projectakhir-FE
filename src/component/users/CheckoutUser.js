import React, { Component } from 'react';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { Link, Redirect } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

import { deleteUserCart, postCheckout, getCart } from '../../actions/index'


class CheckoutUser extends Component {

    state = {
        loading: false,
        redirect: false,
        addressId : 0
    }


    async componentWillMount() {
        await this.props.getCart(this.props.objectUser)
        console.log(this.props.objectUser.address)
        console.log(this.props.cartState)
    }

    countTotal = () => {
        let total = 0
        let arrayCart = this.props.cartState
        for (let i = 0; i < arrayCart.length; i++) {
            total = total + (arrayCart[i].price * arrayCart[i].qty_S) + (arrayCart[i].price * arrayCart[i].qty_M) + (arrayCart[i].price * arrayCart[i].qty_L) + (arrayCart[i].price * arrayCart[i].qty_XL)
        }
        return total
    }

   
    renderAddressOption = () => {
        console.log(this.props.objectUser.address)
        let render = this.props.objectUser.address.map(item => {
            
            return (
                <option value={item.address_detail} className='radius-custom' key={item.id}>{item.address_detail}</option>
            )
        })
        return render
    }
    renderAddress = () => {
        return(
            <div>
                <select className='custom-select radius-custom' name='selectedaddress' ref={ input => this.selectedAddress = input } >
                    {this.renderAddressOption()}
                </select>
                
            </div>
        )
    }

    // renderAddressDetails = () => {
        
    // }
    renderAddressForm = () => {
        return (
            <div>

                
                
                <div>
                    <h1 className='text-center mb-5'>Select Address</h1>
                </div>
                <div className='row'>
                <div className='container col-8 mb-5'>{this.renderAddress()}</div>
                </div>
            </div>
        )
    }

    submitCheckout = async () => {
        const { id } = this.props.objectUser
        const { objectUser, cartState } = this.props

        console.log(objectUser)
        console.log(cartState)

        const order_address = this.selectedAddress.value

        const order_name = objectUser.first_name + ' ' + objectUser.last_name
        const order_phonenumber = objectUser.phone_number
        const total_price = this.countTotal()

        const formData = new FormData()

        formData.append('user_id', id)
        formData.append('total_price', total_price)
        formData.append('order_name', order_name)
        formData.append('order_address', order_address)
        formData.append('order_phonenumber', order_phonenumber)

        let statusCheckout = await this.props.postCheckout(id, total_price, order_name, order_address, order_phonenumber, cartState)


        if (statusCheckout.insertId) {
            await this.props.deleteUserCart(objectUser.id)
            await this.props.getCart(objectUser)

            Swal.fire(
                'Checkout Success!',
                'One More Step : Upload Transaction Image on Transaction Tab !',
                'success'
            )

            await this.setState({ redirect: true })
        }
    }

    render() {
        if (this.props.cartState.length === 0) {
            return (
                <div>
                    <Header />

                    <center >
                    <br /><br /><br /><br /><br /><br />
                        <h1 >
                            <b>BELUM ADA BELANJAAN</b>
                        </h1>
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </center>
                    <Footer />
                </div>
            );
        } else if (this.props.objectUser.phone_number === null ){
            return(
                <div>
                    <Header />
                    <center>
                        <h1>Nomor telpon anda belum diisi, silahkan dilengkapi dulu</h1>
                        <Link to='/profile'>
                            <button className='btn btn-primary'>To Profile</button>
                        </Link>
                    </center>
                    <Footer />
                </div>
            )
            
        } else {
            return (
                <div>

                    <center>
                        <h3>
                            Total yang harus dibayar : <b> Rp. {(this.countTotal()).toLocaleString()}  </b>
                        </h3>
                    </center>

                    {this.renderAddressForm()}
                    <button className="btn btn-success btn-block radius-custom" onClick={() => this.submitCheckout()} >SUBMIT</button>
                </div>
            );
        }

    }
}

const mapStatetoProps = state => {
    return {
        objectUser: state.auth,
        productState: state.product.products,
        cartState: state.cart.cart
    }
}

export default connect(mapStatetoProps, { getCart, deleteUserCart, postCheckout })(CheckoutUser);