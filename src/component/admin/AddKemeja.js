// import React, { Component } from 'react';
// import { Button } from 'reactstrap'
// import {Link, Redirect} from 'react-router-dom'
// import notyet from '../../img/notyet.png'
// import { addKemeja } from '../../actions/index'
// import { connect } from 'react-redux'
// import Swal from 'sweetalert2'

// class AddKemeja extends Component {

//     state = {
//         redirect : false
//     }

//     addProduct = async () => {
//         const productName = this.productName.value
//         const productPrice = this.productPrice.value
//         const productDesc = this.productDesc.value
//         const stockS = this.stockS.value
//         const stockM = this.stockM.value
//         const stockL = this.stockL.value
//         const stockXL = this.stockXL.value
//         const productWeight = this.productWeight.value
//         const productPicture = this.productPicture.files[0]

//         const formData = new FormData()

//         formData.append('product_name', productName)
//         formData.append('description', productDesc)
//         formData.append('price', productPrice)
//         formData.append('stock_S', stockS)
//         formData.append('stock_M', stockM)
//         formData.append('stock_L', stockL)
//         formData.append('stock_XL', stockXL)
//         formData.append('weight', productWeight)
//         formData.append('thumbnail', productPicture)

//         await this.props.addKemeja(formData)
//         console.log('sudah diklik')
//         for (var value of formData.values()) {
//             console.log(value);
//         }

//         Swal.fire(
//             'ADDED',
//             'Product has been added',
//             'success'
//         )

//         this.setState({redirect : true})

//     }

//     constructor(props) {
//         super(props)
//         this.state = {
//             file: null
//         }
//         this.handleChange = this.handleChange.bind(this)
//     }

//     handleChange = (event) => {
//         this.setState({
//             file: URL.createObjectURL(event.target.files[0])
//         })

//     }

//     render() {
//     if(this.state.redirect === true){
//         return (
//             <div>
//                 <Redirect to='/dashboard'></Redirect>
//             </div>
//         )
//     }
//        if(this.props.objectAdmin.id === ''){
//            return (
//                <div>
//                    <h1>ACCESS DENIED</h1>
//                    <Link to ='/admin'>
//                        <button className='btn btn-primary'> login </button>
//                    </Link>
//                </div>
//            )
//        } else {
//         return (
//             <div>
//                 <div>
//                     <h1 className='text-center mb-5'>ADD KEMEJA</h1>
//                 </div>

//                 {/* form register */}
//                 <div className='row'>
//                     <div className='container offset-2 col-8 mb-5'>
//                         <form>
//                             <div className='row'>
//                                 <div className='float-left col-6 form-group'>
//                                     <label className=''><b>Product Name</b></label>
//                                     <input type='text' ref={input => this.productName = input} className='form-control col-md col-sm' placeholder='Enter Product Name' required></input>
//                                 </div>
//                                 <div className='float-left col-6 form-group'>
//                                     <label for='PRICE' className=''><b>PRICE</b></label>
//                                     <input type='number' ref={input => this.productPrice = input} className='form-control col-md col-sm' placeholder='Enter PRICE' required></input>
//                                 </div>
//                             </div>

//                             <label for='Description' className='ml-auto form-group'><b>Description</b></label>
//                             <form className="input-group">
//                                 <textarea placeholder="Product Description" ref={input => this.productDesc = input} className="form-control mb-2" type="text" style={{ height: "200px" }} required />
//                             </form>
//                             <br />
//                             <div className='col col-sm col-md mb-5'>
//                                 <label className='ml-auto form-group'><b>Stock S</b></label>
//                                 <input type='number' ref={input => this.stockS = input} className='form-control' placeholder='enter stock size S' required></input>
//                                 <label className='ml-auto form-group'><b>Stock M</b></label>
//                                 <input type='number' ref={input => this.stockM = input} className='form-control' placeholder='enter stock size M' required></input>
//                                 <label className='ml-auto form-group'><b>Stock L</b></label>
//                                 <input type='number' ref={input => this.stockL = input} className='form-control' placeholder='enter stock size L' required></input>
//                                 <label className='ml-auto form-group'><b>Stock XL</b></label>
//                                 <input type='number' ref={input => this.stockXL = input} className='form-control' placeholder='enter stock size XL' required></input>
//                                 <label className='ml-auto form-group'><b>weight</b></label>
//                                 <input type='number' ref={input => this.productWeight = input} className='form-control' placeholder='enter weight' required></input>
//                             </div>
//                             <div className='mb-5' >
//                                 {this.state.file === null ? <img src={notyet} alt="notyet" className='mx-2' style={{ width: "150px", borderRadius: "25px" }} /> : <img src={this.state.file} className='mx-2' style={{ width: "150px", borderRadius: "25px" }} alt={this.state.file} key={new Date()} />}
//                             </div>
//                             <input type="file" className='border' ref={input => this.productPicture = input} onChange={this.handleChange} required />
//                             <div className='text-center'>
//                                 {this.state.file === null ? <h3 className='mt-3'>please add product photo </h3> : <Button className='btn btn-dark mt-3' onClick={() => { this.addProduct() }}>add product</Button>}

//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         );
//        }
//     }
// }

// const mapStatetoProps = state => {
//     return {
//         objectAdmin: state.adminAuth // bikin namanya sesuka hati

//     }
// }

// export default connect(mapStatetoProps, { addKemeja })(AddKemeja);