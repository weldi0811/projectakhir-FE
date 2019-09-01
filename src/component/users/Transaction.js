import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

import { getUserTransaction, uploadProof, getItemsTransaction, finishTranscation } from '../../actions/index'


class Transaction extends Component {


    state = {
        arrayTransaction: [],
        modalTransaction: [],
        price_total: 0
    }

    async componentWillMount() {
        await this.getUserTransactionIni()

        console.log(this.state.modalTransaction)
        
    }

    getUserTransactionIni = async () => {

        const { id } = this.props.objectUser

        var arrayTransaction = await this.props.getUserTransaction(id)

        this.setState({ arrayTransaction })
        console.log(arrayTransaction)

    }

    uploadProofModal = async (transID) => {
        const { value: file } = await Swal.fire({
            titale: 'Select image (max 2MB, JPG/JPEG/PNG',
            input: 'file',
            inputAttributes: {
                accept: 'image/*', 'aria-label': 'upload payment proof'
            }
        })

        if (file) {
            if (file.size > 2000000) {
                return Swal.fire({
                    title: 'Error!',
                    text: 'File size is too large, maximal 2 MB (MegaBytes)',
                    type: 'error',
                    confirmButtonText: 'Cool'
                })
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                Swal.fire({
                    title: 'Thankyou for uploading proof, we will process as soon as possible :)',
                    imageUrl: e.target.result,
                    imageAlt: 'payment'
                })
            }
            reader.readAsDataURL(file)
            console.log(file)

            const formData = new FormData()

            formData.append('id', transID)
            formData.append('proof_of_payment', file)

            console.log(transID)
            

            await this.props.uploadProof(formData)
            await this.getUserTransactionIni()
        }
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

                const res = await this.props.finishTranscation(id)
                console.log(res)

                if (res.affectedRows) {
                    Swal.fire(
                        'Completed!',
                        'The transaction has been completed.',
                        'success'
                    )

                    this.getUserTransactionIni()
                } else {
                    alert('Error when finish a transaction')
                }
            }
        })

    }

    snippetProductModal = async(checkout_id) => {
        const productArray = await this.props.getItemsTransaction(checkout_id)

        console.log(productArray)

        await this.setState({modalTransaction : productArray})
        console.log(this.state.modalTransaction)
        }

    renderTransDetail = () => {
        console.log(this.state.modalTransaction)
        let render = this.state.modalTransaction.map(el => {
            return(
                <tr key={el.id}>
                    <th scope='col'>
                        <span>{el.product_name}</span>
                    </th>
                    <th scope='col'> <span> {el.qty_S + el.qty_M + el.qty_L + el.qty_XL}</span></th>
                    <th scope='col'> <span> {el.product_price}</span></th>
                    <th scope='col'> <span> {el.product_price * (el.qty_S + el.qty_M + el.qty_L + el.qty_XL)}</span></th>
                </tr>
            )
        })

        return render
    }

    renderTransaction = () => {
        let render = this.state.arrayTransaction.map(el => {
            const {id, proof_of_payment, order_address, order_name, order_phonenumber, order_awb,
            order_status, total_price,created_at} = el

            var order_status_style = ''
            if(order_status === 'pending'){
                order_status_style = 'badge-warning'
            } else if(order_status === 'rejected'){
                order_status_style = 'badge-danger'
            } else if(order_status === 'waiting payment'){
                order_status_style = 'badge-warning'
            } else if(order_status === 'processing'){
                order_status_style = 'badge-primary'
            } else {
                order_status_style ='badge-success'
            }

            return (
                <div className='card my-3 shadow' style={{maxWidth: '1000px', borderRadius:'20px'}} key = {id}>
                    <div className='row no-gutters m-4'>
                        <div className='col-4 col-md-4 col-lg-4 col-sm'>

                            {/* kalau belum upload atau di reject*/}
                            {proof_of_payment === null ? (
                                <div>
                                    <center>
                                        <span>Silahkan upload disini</span> <br/>
                                        <button className='btn btn-primary' onClick={() => {this.uploadProofModal(id)}} required>upload</button>
                                    </center>
                                </div>
                            ) : (
                                <div>
                                    <h3>Payment Proof</h3>
                                <img src={`http://localhost:4000/proof/${proof_of_payment}`} className='card-img' alt={proof_of_payment} style={{width:'100%'}}/>
                                </div>
                            )}

                            <div className='mt-5'>
                                <b> Status : {order_status} </b> &nbsp;
                                {order_status !== 'sent' ? <button type='button'className={'btn btn-md ' + order_status_style } disabled> {order_status} </button> : <button type='button'className={'btn btn-md ' + order_status_style } onClick={() => {this.finishTranscationFunc(id)}}> Finish Transaction </button> }
                            </div>

                            <div className='mt-3'>
                                <button className='btn btn-outline-info' onClick={() => {this.snippetProductModal(id)}} data-toggle='modal' data-target = '#snippetUserProductModal'> See Items </button>
                            </div>

                        </div>

                        <div className='col-8 col-md-8 col-lg-4'>
                            <div className='card-body'>
                                <h4 className='card-title'></h4>
                                    <h5>Total : Rp {total_price.toLocaleString()}</h5>
                                    <h5> {order_address} </h5>
                                    <h5> {order_phonenumber} </h5>
                                    <br/><br/>
                                    <h5> Resi Number : {order_awb === null ? <span>Waiting Admin Response</span> : <span> {order_awb} </span>}</h5>
                                
                            </div>

                        </div>
                    </div>
                </div>
            )
        })

        return render
    }

    render() {
        if(this.props.objectUser.id === '') {
            return <Redirect to='/login' />
        }
        if(this.state.arrayTransaction.length === 0){
            return(
                <div className='container mt-6'>
                    <center>
                        <h1>BELUM ADA TRANSAKSI</h1>
                    </center>
                </div>
            )
        }

        return(
            <div className='container'>
                <center>
                    <h1 className = 'mt-5'>
                        TRANSACTION
                    </h1>

                    {this.renderTransaction()}
                </center>


                <div className="modal fade" id="snippetUserProductModal" tabIndex="-1" role="dialog" aria-labelledby="snippetUserProductModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="snippetUserProductModalLabel">Ordered Products</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <table className="table table-hover mb-5">
                                        <thead>
                                            <tr>
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Total Price</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.renderTransDetail()}
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
        objectUser: state.auth
    }
}

export default connect(mapStatetoProps, {getUserTransaction, uploadProof, getItemsTransaction, finishTranscation})(Transaction);