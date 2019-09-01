import React, { Component } from 'react';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { getCart, deleteUserCart, deleteItemCart, changeQtyS, changeQtyM, changeQtyL, changeQtyXL } from '../../actions/index'

class CartUser extends Component {

    state = {
        selectedID: 0,
        total_qty: 0,
        subtotal: 0,
        total: 0
    }

    componentWillMount = async () => {
        await this.props.getCart(this.props.objectUser)
    }

    cobaDelete = async(cartID) => {
        await this.props.deleteItemCart(cartID)
    }

    deleteCartButton = async (cartID) => {

        Swal.fire({
            title: 'yakin mau delete?',
            text: "coba dicek lagi",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: 'red',
            confirmButtonText: 'iye bacot'
        }).then(async (result) => {
            if (result.value === true) {

                const res = await this.props.deleteItemCart(cartID)
                console.log(result)
                await this.props.getCart(this.props.objectUser)

            }
        })
        
        
        
    }

    countTotalQTY = () => {
        let total_qty = 0
        let arrayCart = this.props.cartState

        for (var i = 0; i < arrayCart.length; i++) {
            total_qty = total_qty + parseInt(arrayCart[i].qty_S) + parseInt(arrayCart[i].qty_M) + parseInt(arrayCart[i].qty_L) + parseInt(arrayCart[i].qty_XL)
        }

        return total_qty
    }

    countShowSubtotal = () => {
        let subtotal = 0
        let arrayCart = this.props.cartState

        for (var i = 0; i < arrayCart.length; i++) {
            subtotal = subtotal + (arrayCart[i].price * arrayCart[i].qty_S) + (arrayCart[i].price * arrayCart[i].qty_M) + (arrayCart[i].price * arrayCart[i].qty_L) + (arrayCart[i].price * arrayCart[i].qty_XL)

        }
        return subtotal.toLocaleString()
    }

    countTotal = () => {
        let total = 0
        let arrayCart = this.props.cartState
        for (let i = 0; i < arrayCart.length; i++) {
            total = total + (arrayCart[i].price * arrayCart[i].qty_S) + (arrayCart[i].price * arrayCart[i].qty_M) + (arrayCart[i].price * arrayCart[i].qty_L) + (arrayCart[i].price * arrayCart[i].qty_XL)
        }
        return total.toLocaleString()
    }

    changeQtyClickS = async (cart_id, qty_S) => {
        await Swal.fire({
            title: 'Input new quantity',
            //size S
            input: 'number',
            inputValue: qty_S,  // inputValue = defaultValue
            inputPlaceholder: 'Quantity S',
            inputValidator: async (quantity_S) => {
                if (quantity_S <= 0) {
                    return alert('jangan sampe lebih dari 0 dong bosku')
                }

                if (quantity_S === qty_S) { return alert('belum ada yang diganti') }

                const resdata = await this.props.changeQtyS(cart_id, quantity_S)
                console.log(resdata)
                if (resdata.affectedRows) {
                    this.props.getCart(this.props.objectUser)
                }
            }
        })

    }

    changeQtyClickM = async (cart_id, qty_M) => {
        await Swal.fire({
            title: 'Input new quantity',
            //size M
            input: 'number',
            inputValue: qty_M,  // inputValue = defaultValue
            inputPlaceholder: 'Quantity M',
            inputValidator: async (quantity_M) => {
                if (quantity_M <= 0) {
                    return alert('jangan sampe lebih dari 0 dong bosku')
                }

                if (quantity_M === qty_M) { return alert('belum ada yang diganti') }

                const resdata = await this.props.changeQtyM(cart_id, quantity_M)
                console.log(resdata)
                if (resdata.affectedRows) {
                    this.props.getCart(this.props.objectUser)
                }
            }
        })

    }

    changeQtyClickL = async (cart_id, qty_L) => {
        await Swal.fire({
            title: 'Input new quantity',
            //size L
            input: 'number',
            inputValue: qty_L,  // inputValue = defaultValue
            inputPlaceholder: 'Quantity L',
            inputValidator: async (quantity_L) => {
                if (quantity_L <= 0) {
                    return alert('jangan sampe lebih dari 0 dong bosku')
                }

                if (quantity_L === qty_L) { return alert('belum ada yang diganti') }

                const resdata = await this.props.changeQtyL(cart_id, quantity_L)
                console.log(resdata)
                if (resdata.affectedRows) {
                    this.props.getCart(this.props.objectUser)
                }
            }
        })

    }

    changeQtyClickXL = async (cart_id, qty_XL) => {
        await Swal.fire({
            title: 'Input new quantity',
            //size XL
            input: 'number',
            inputValue: qty_XL,  // inputValue = defaultValue
            inputPlaceholder: 'Quantity XL',
            inputValidator: async (quantity_XL) => {
                if (quantity_XL <= 0) {
                    return alert('jangan sampe lebih dari 0 dong bosku')
                }

                if (quantity_XL === qty_XL) { return alert('belum ada yang diganti') }

                const resdata = await this.props.changeQtyXL(cart_id, quantity_XL)
                console.log(resdata)
                if (resdata.affectedRows) {
                    this.props.getCart(this.props.objectUser)
                }
            }
        })

    }



    renderCart = () => {
        let render = this.props.cartState.map(cart => {
            return (
                <div className="card mb-3 shadow" style={{ maxWidth: '1100px', borderRadius: "30px" }} key={cart.product_id} >
                    <div className="row no-gutters m-3" >
                        <div className="col-4 col-md-4">
                            <Link to={`/product/${cart.product_id}`} >
                                <img src={`http://localhost:4000/product/photos/${cart.thumbnail}`} className="card-img mt-6" alt={cart.cart_id} style={{ width: "100%", borderRadius: '30px' }} />
                            </Link>
                        </div>

                        <div className="col-8 col-md-8">

                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/product/${cart.product_id}`} style={{ color: '#d9534f' }} className='text-center' >  {cart.product_name} </Link>
                                </h5>

                                <div>
                                    {/* SIZE S */}
                                    <h5>size S {cart.qty_S} Units</h5>
                                    <button className="btn btn-outline-primary" onClick={() => this.changeQtyClickS(cart.cart_id, cart.qty_S)} style={{ color: '#d9534f' }} >
                                        Edit Quantity S
                                </button>
                                    <br></br>
                                    {/* SIZE M */}
                                    <h5>size M {cart.qty_M} Units</h5>
                                    <button className="btn btn-outline-primary" onClick={() => this.changeQtyClickM(cart.cart_id, cart.qty_M)} style={{ color: '#d9534f' }} >
                                        Edit Quantity M
                                </button>
                                    <br></br>
                                    {/* SIZE L */}
                                    <h5>size L {cart.qty_L} Units</h5>
                                    <button className="btn btn-outline-primary" onClick={() => this.changeQtyClickL(cart.cart_id, cart.qty_L)} style={{ color: '#d9534f' }} >
                                        Edit Quantity L
                                </button>
                                    <br></br>
                                    {/* SIZE XL */}
                                    <h5>size XL {cart.qty_XL} Units</h5>
                                    <button className="btn btn-outline-primary" onClick={() => this.changeQtyClickXL(cart.cart_id, cart.qty_XL)} style={{ color: '#d9534f' }} >
                                        Edit Quantity XL
                                </button>

                                    <p className="card-text"> Rp {(cart.price).toLocaleString()} / Unit </p>

                                    <p className="card-text"> total item = {cart.qty_S + cart.qty_M + cart.qty_L + cart.qty_XL}</p>
                                    <p className="card-text"> Total Price = Rp. {(cart.qty_S + cart.qty_M + cart.qty_L + cart.qty_XL) * cart.price} </p>
                                    <button className="btn btn-outline-danger" onClick={() => this.deleteCartButton(cart.cart_id)} > <i class="far fa-trash-alt"></i> </button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            )
        })

        return render;
    }


    render() {
        return (
            <div>
                <div className='container mt-1'>
                    {this.renderCart()}

                    <h1 className='text-center'>Total : Rp {this.countTotal()}</h1>
                    <Link to='/checkout'>
                            <button className="btn btn-success btn-lg btn-block text-center"> CHECKOUT </button>                   
                        </Link>

                </div>
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

export default connect(mapStatetoProps, { getCart, deleteItemCart, deleteUserCart, changeQtyS, changeQtyM, changeQtyL, changeQtyXL })(CartUser);