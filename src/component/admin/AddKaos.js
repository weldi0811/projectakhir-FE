import React, { Component } from 'react';
import { Button } from 'reactstrap'
import notyet from '../../img/notyet.png'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { addItem, getCategories } from '../../actions/index'
import axios from '../../config/axios'
import HeaderAdmin from '../HeaderAdmin';
import Swal from 'sweetalert2'


class AddKaos extends Component {

    state = {
        categories: [],
        redirect: false
    }



    async componentDidMount() {
        var hasilCategory = await axios.get('/category')
        console.log(hasilCategory)
        await this.setState({
            categories: hasilCategory.data
        })
        this.setState({ isLoading: false })
        console.log(this.state.categories)

    }

    optionItems = () => {
        let elements = this.state.categories.map(item => {
            return (
                <option key={item.id}>{item.category}</option>
            )
        })
        return elements


    }

    addProduct = async () => {
        const productName = this.productName.value
        const productPrice = this.productPrice.value
        const productDesc = this.productDesc.value
        const category = this.category.value
        const stockS = this.stockS.value
        const stockM = this.stockM.value
        const stockL = this.stockL.value
        const stockXL = this.stockXL.value
        const productWeight = this.productWeight.value
        const productPicture = this.productPicture.files[0]
        const status = 1

        //filter file size dulu

        if (productPicture.size > 15000000) {
            let timerInterval
            Swal.fire({
                title: 'Ukuran file terlalu besar!',
                html: 'I will close in <strong></strong> milliseconds.',
                timer: 2000,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
            })
        }



        const formData = new FormData()

        formData.append('product_name', productName)
        formData.append('description', productDesc)
        formData.append('price', productPrice)
        formData.append('category', category)
        formData.append('stock_S', stockS)
        formData.append('stock_M', stockM)
        formData.append('stock_L', stockL)
        formData.append('stock_XL', stockXL)
        formData.append('weight', productWeight)
        formData.append('thumbnail', productPicture)
        formData.append('status', status)

        const resdata = await this.props.addItem(formData)
        if(resdata.data.affectedRows === 1) {
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
        
        console.log(resdata)

        console.log('sudah diklik')
        console.log(productPicture.size)
        this.setState({ redirect: true })
        for (var value of formData.values()) {
            console.log(value);
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            isLoading: true
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event) => {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })

    }



    render() {

        if (this.state.redirect) {
            return <Redirect to='dashboard' />
        }

        if (this.props.objectAdmin.admin_name !== '') {
            return (

                this.state.isLoading ? <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div> :
                    <div>
                        <HeaderAdmin />
                        <div>
                            <h1 className='text-center mb-5'>ADD NEW PRODUCT</h1>
                        </div>

                        {/* form register */}
                        <div className='row'>
                            <div className='container offset-2 col-8 mb-5'>
                                <form>
                                    <div>
                                        <p>Category :
                                    </p>
                                        <select ref={input => this.category = input}>
                                            {this.optionItems()}
                                        </select>

                                    </div>
                                    <div className='row'>
                                        <div className='float-left col-6 form-group'>
                                            <label className=''><b>Product Name</b></label>
                                            <input type='text' ref={input => this.productName = input} className='form-control col-md col-sm' placeholder='Enter Product Name' required></input>
                                        </div>
                                        <div className='float-left col-6 form-group'>
                                            <label for='PRICE' className=''><b>PRICE</b></label>
                                            <input type='number' ref={input => this.productPrice = input} className='form-control col-md col-sm' placeholder='Enter PRICE' required></input>
                                        </div>
                                    </div>

                                    <label for='Description' className='ml-auto form-group'><b>Description</b></label>
                                    <form className="input-group">
                                        <textarea placeholder="Product Description" ref={input => this.productDesc = input} className="form-control mb-2" type="text" style={{ height: "200px" }} required />
                                    </form>
                                    <br />
                                    <div className='col col-sm col-md mb-5'>
                                        <label className='ml-auto form-group'><b>Stock S</b></label>
                                        <input type='number' ref={input => this.stockS = input} className='form-control' placeholder='enter stock size S' required></input>
                                        <label className='ml-auto form-group'><b>Stock M</b></label>
                                        <input type='number' ref={input => this.stockM = input} className='form-control' placeholder='enter stock size M' required></input>
                                        <label className='ml-auto form-group'><b>Stock L</b></label>
                                        <input type='number' ref={input => this.stockL = input} className='form-control' placeholder='enter stock size L' required></input>
                                        <label className='ml-auto form-group'><b>Stock XL</b></label>
                                        <input type='number' ref={input => this.stockXL = input} className='form-control' placeholder='enter stock size XL' required></input>
                                        <label className='ml-auto form-group'><b>weight</b></label>
                                        <input type='number' ref={input => this.productWeight = input} className='form-control' placeholder='enter weight' required></input>
                                    </div>
                                    <div className='mb-5' >
                                        {this.state.file === null ? <img src={notyet} alt="notyet" className='mx-2' style={{ width: "150px", borderRadius: "25px" }} /> : <img src={this.state.file} className='mx-2' style={{ width: "150px", borderRadius: "25px" }} alt={this.state.file} key={new Date()} />}
                                    </div>
                                    <input type="file" className='border' ref={input => this.productPicture = input} onChange={this.handleChange} required />
                                    <div className='text-center'>
                                        {this.state.file === null ? <h3 className='mt-3'>please add product photo </h3> : <Button className='btn btn-dark mt-3' onClick={() => { this.addProduct() }}>add product</Button>}

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
            );
        } else {
            return (
                <div>
                    <div className='center'>
                        <h1 className='center'>ACCESS DENIED</h1>
                        <Link to='/admin'>
                            <button className='btn btn-primary'>LOGIN</button>
                        </Link>
                    </div>
                </div>
            )
        }

    }
}
const mapStatetoProps = state => {
    return {
        objectAdmin: state.adminAuth, // bikin namanya sesuka hati
    }
}

export default connect(mapStatetoProps, { addItem, getCategories })(AddKaos);