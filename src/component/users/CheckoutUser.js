import React, { Component } from 'react';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { Link, Redirect } from 'react-router-dom'

import { deleteUserCart, postCheckout, getCart } from '../../actions/index'


class CheckoutUser extends Component {

    state = {
        loading: false,
        redirect: false
    }


    async componentWillMount() {
        await this.props.getCart(this.props.objectUser)
        console.log(this.props.objectUser)
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

    renderAddressForm = () => {
        return (
            <div>
                <div>
                    <h1 className='text-center mb-5'>Input Address</h1>
                </div>
                <div className='row'>
                    <div className='container offset-2 col-8 mb-5'>
                        <form>
                            <p className="lead">Nama Penerima : {this.props.objectUser.first_name} {this.props.objectUser.last_name}</p>
                            <p className="lead">No. Handphone : {this.props.objectUser.phone_number}</p>
                            <div className='row'>

                                <form className="input-group col-12">
                                    <textarea placeholder="Masukkan Alamat" ref={input => this.address = input} className="form-control mb-2" type="text" style={{ height: "200px" }} required />
                                </form>
                            </div>


                            <input type='text' ref={input => this.city = input} className='form-control' placeholder='Kota atau kecamatan' required></input>
                            <br />
                            <input type='number' ref={input => this.postalCode = input} className='form-control' placeholder='Kode Pos' required></input>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    submitCheckout = async () => {
        const { id } = this.props.objectUser
        const { objectUser, cartState } = this.props

        console.log(objectUser)
        console.log(cartState)

        const order_address = this.address.value + ',' + this.city.value + ',' + this.postalCode.value

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

const mapStatetoProps = state => {
    return {
        objectUser: state.auth,
        productState: state.product.products,
        cartState: state.cart.cart
    }
}

export default connect(mapStatetoProps, { getCart, deleteUserCart, postCheckout })(CheckoutUser);