import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { connect } from 'react-redux'

import { getAllTransaction, getAdminTransaction, addResi, finishTranscation, rejectTransaction } from '../../actions/index'
import { async } from 'q';

class ManageTransaction extends Component {

    state = {
        allTransaction: [],
        modalTransaction: []
    }

    componentDidMount() {
        this.getTransactions()

    }

    getTransactions = async () => {
        const allTransaction = await this.props.getAllTransaction()
        this.setState({ allTransaction: allTransaction })
        console.log(this.state.allTransaction)
    }

    snippetProductModal = async (checkout_id) => {
        const arrayProduct = await this.props.getAdminTransaction(checkout_id)
        console.log(arrayProduct)

        this.setState({ modalTransaction: arrayProduct })
    }

    addResiFunc = async (id) => {
        await Swal.fire({
            title: 'Add Resi Number',
            input: 'text',
            showCancelButton: true,
            inputValidator: async (resi) => {
                if (!resi) {
                    return 'resi belum diisi'
                }

                await this.props.addResi(id, resi)

                await this.getAllTransactions()
            }
        })
    }

    finishTranscationFunc = (id) => {
        Swal.fire({
            title: 'yakin sob?',
            text: "pastikan paket sudah tiba",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: 'red',
            confirmButtonText: 'iye bacot'
        }).then(async (result) => {
            if (result.value === true) {

                const res = await this.props.finishTransaction(id)
                console.log(res)

                if (res.affectedRows) {
                    Swal.fire(
                        'Completed!',
                        'The transaction has been completed.',
                        'success'
                    )

                    this.getTransactions()
                } else {
                    alert('Error when finish a transaction')
                }
            }
        })

    }


    rejectTransactionFunc = async (id, proof_of_payment) => {

        Swal.fire({
            title: 'yakinmau reject?',
            text: "cek lagi bukti pembayarannya",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: 'red',
            confirmButtonText: 'iye bacot'
        }).then(async (result) => {
            if (result.value === true) {

                const res = await this.props.rejectTransaction(id, proof_of_payment)
                console.log(res)

                if (res.affectedRows) {
                    Swal.fire('Rejected!')

                    this.getTransactions()
                } else {
                    alert('Error when reject a transaction')
                }
            }
        })
    }


    renderTransDetail = () => {
        let render = this.state.modalTransaction.map(el => {
            return (
                <tr key={el.product_id}>
                    <th scope='col'> {el.product_name} </th>
                    <th scope='col'> {el.qty_S}</th>
                    <th scope='col'> {el.qty_M}</th>
                    <th scope='col'> {el.qty_L}</th>
                    <th scope='col'> {el.qty_XL}</th>
                    <th scope='col'> {parseInt(el.qty_S + el.qty_M + el.qty_L + el.qty_XL)}</th>
                    <th scope='col'> {el.price.toLocaleString()}</th>
                    <th scope='col'> {(el.price * parseInt(el.qty_S + el.qty_M + el.qty_L + el.qty_XL)).toLocaleString()}</th>

                </tr>
            )
        })

        return render

    }

    paymentProofModal = (proof_of_payment) => {
        Swal.fire({
            imageUrl: `http://localhost:4000/proof/${proof_of_payment}`,
            imageWidth: 250,
            imageAlt: 'payment'
        })
    }

    renderTransactions = () => {
        let render = this.state.allTransaction.map(el => {
            let { id, user_id, username, email, total_price, order_name, order_address, order_phonenumber, order_awb, order_status, proof_of_payment } = el

            var order_status_style = ''
            if (order_status === 'pending') {
                order_status_style = 'badge-warning'
            } else if (order_status === 'rejected') {
                order_status_style = 'badge-danger'
            } else if (order_status === 'waiting payment') {
                order_status_style = 'badge-warning'
            } else if (order_status === 'processing') {
                order_status_style = 'badge-primary'
            } else {
                order_status_style = 'badge-success'
            }

            return (
                <tr key={id}>
                    <th scope='col'>
                        <h5>{created_at}</h5>
                        <span className={'badge badge-pill ' + order_status_style}> {order_status} </span>

                    </th>

                    <th scopt='col'>
                        <p>username : {username}</p>
                        <p>email : {email}</p>
                    </th>
                    <th scope='col'>
                        <p>Name : {order_name}</p>
                        <p>Address : {order_address} </p>
                        <p>Phone Number : {order_phonenumber}</p>
                        <p>
                            Resi : {order_awb === null ? <button className='btn btn-info btn-sm' onClick={() => { this.addResiFunc(id) }}>Add Resi</button> : <p>{order_awb}</p>}
                        </p>

                    </th>
                    <th scope='col'>
                        {proof_of_payment === null ? <p>Masih menunggu pembayaran</p> : <button classname='btn btn-link' onClick={() => { this.paymentProofModal(proof_of_payment) }}>
                            <img src={`http://localhost:4000/proof/${proof_of_payment}`} className='card-img' alt={proof_of_payment} style={{ width='75%' }} />
                        </button>}
                    </th>
                    <th scope='col'>
                        <p>Total price : Rp. {total_price.toLocaleString()} </p>
                        <button className='btn btn-outline-info' onClick={() => { this.snippetProductModal(id) }} data-toggle='modal' data-target='#snippetproductmodal' >See Products</button>
                        <br /> <br />

                        {order_status === 'Completed' ? (
                            <p>ORDER COMPLETED</p>) : (
                                <button className="btn btn-success" onClick={() => { this.finishTranscationFunc(id) }} >Finish</button>)}
                        {/* Button Reject will appear */}
                        {proof_of_payment != null && order_status != 'Completed' ? (
                            <button className="btn btn-danger" onClick={() => { this.rejectTransactionFunc(id, proof_of_payment) }}  >Reject</button>) : ''}
                    </th>
                </tr>
            )
        })

        return render
    }




    render() {
        if (this.props.objectAdmin.id === '') return <h1>ACCESS DENIED</h1>

        return (
            <div className='mx-5'>
                <center>
                    <br />
                    <h2 className='mt-3'>
                        USER TRANSACTIONS
                    </h2>
                    <br />
                    <div className="table-responsive">

                        <table className="table table-hover mx-auto w-auto mb-5" style={{ margin: 'auto' }}>
                            <thead>
                                <tr>
                                    {/* <th scope="col">ID</th> */}
                                    <th scope="col">DATE</th>
                                    <th scope="col">USER</th>
                                    <th scope="col">DESTINATION</th>
                                    <th scope="col">PAYMENT PROOF</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            {/* render all transaction */}
                            <tbody> {this.renderTransactions()}  </tbody>

                        </table>
                    </div>
                </center>

                <div className="modal fade" id="snippetProductModal" tabIndex="-1" role="dialog" aria-labelledby="snippetProductModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="snippetProductModalLabel">Customer Products</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-hover mb-5">
                                    <thead>
                                        <tr>
                                            <th scope="col" colSpan="2">Products</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTransactionDetail()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        objectUser: state.auth,
        objectAdmin: state.adminAuth // bikin namanya sesuka hati

    }
}

export default connect(mapStatetoProps, { getAllTransaction, getAdminTransaction, addResi, finishTranscation, rejectTransaction })(ManageTransaction);