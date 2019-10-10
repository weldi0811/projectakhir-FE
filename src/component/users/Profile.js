import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import axios from '../../config/axios'
import { editProfile, deleteAvatar, updateAvatar, getAddresses } from '../../actions/index'
import default_avatar from '../../img/default_avatar.png'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import cookies from 'universal-cookie'

const cookie = new cookies()

class Profile extends Component {

    state = {
        editprofile: false,
        editaddress: false,
        addAddress: false,
        screenState: 'profile'
    }

    componentDidMount = () => {
        this.renderProfile()
    }

    //fungsi buat masukin value input ke redux
    onEditClick = async () => {
        const newFName = this.firstname.value
        const newLName = this.lastname.value
        const newPhoneNumber = this.phoneNumber.value

        await this.props.editProfile(newFName, newLName, newPhoneNumber, this.props.objectUser)

        this.setState({ editprofile: false })

    }


    //delete avatar
    deleteAvatar = () => {
        this.props.deleteAvatar(this.props.objectUser)
    }

    //update avatar
    uploadAvatar = () => {
        this.props.deleteAvatar(this.props.objectUser)

        const newAvatar = this.avatar.files[0]
        const formData = new FormData()

        console.log(newAvatar)

        formData.append('id', this.props.objectUser.id)
        formData.append('username', this.props.objectUser.username)
        formData.append('avatar', newAvatar)

        this.props.updateAvatar(formData, this.props.objectUser)
    }


    renderProfile = () => {

        const { id, avatar, username, first_name, last_name, email, phone_number, address } = this.props.objectUser
        return (
            <div>
                <Header />
                <div className='container'>
                    <button className='btn btn-primary mr-5' onClick={() => { this.onProfileButton() }}>PROFILE</button>
                    <button className='btn btn-primary' onClick={() => { this.onAddressButton() }}>ADDRESS</button>
                    {/* Jumbotron */}
                    <div className='jumbotron container mt-4'>
                        <div className="row">
                            {/* KOLOM BUAT FOTO*/}
                            <div className="col-4 col-md-4 col-sm-6">
                                {avatar === null ? <img src={default_avatar} alt="avatar_default" style={{ width: "200px" }} /> : <img src={`http://localhost:4000/users/avatar/${avatar}`} style={{ width: "200px", borderRadius: "150px" }} alt={this.props.objectUser.avatar} key={new Date()} />}
                                {/* <input type='file' className="custom-file" ref={input => this.avatar = input}  />  */}
                                <input type='file' className="custom-file" ref={input => this.avatar = input} />
                                {/* <button className="btn btn-primary" onClick={this.uploadAvatar} >{ avatar === null ? 'Upload Avatar' : 'Change Avatar'}</button> */}

                                <button className="btn btn-primary" onClick={() => { this.uploadAvatar() }} >{avatar === null ? 'Upload Avatar' : 'Change Avatar'}</button>

                                {/* if user has an avatar, Button Delete Avatar will be appeared */}
                                {/* {  avatar !== null ? <button className="btn btn-danger" onClick={this.deleteAvatar} >Delete Avatar</button> : ''  } */}
                            </div>
                            {/* KOLOM BUAT BIODATA*/}
                            <div className='col-8 col-md-8 col-sm-6'>
                                <h1 >BIODATA</h1>
                                <p className="lead">Nama : {first_name} {last_name}</p>
                                <p className="lead">Username : {username} </p>
                                <p className="lead">No. Handphone : {phone_number}</p>
                                <p className="lead">Email : {email} </p>
                                <p className="lead">
                                    <Button className='btn btn-dark float-left' color="primary" onClick={() => { this.onEditButton() }}>Edit</Button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    updateAddress = async () => {


    }


    //ADDRESS


    addAddressButton = () => {
        this.setState({ addAddress: true })
    }
    cancelAddAddress = () => {
        this.setState({ addAddress: false })
    }

    saveAddAddressButton = async () => {

        const { id, first_name, last_name, username, email, phone_number, avatar, address } = this.props.objectUser

        const FNewAddress_name = this.newAddress_name.value
        const FNewAddress_detail = this.newAddress_detail.value + ' ' + this.newPostal_code.value + ' ' + this.newCity.value


        const formData = new FormData()

        formData.append('address_name', FNewAddress_name)
        formData.append('address_detail', FNewAddress_detail)

        console.log(FNewAddress_name)

        const result = await axios.post(`address/${this.props.objectUser.id}`, {
            address_name: FNewAddress_name,
            address_detail: FNewAddress_detail
        })

        cookie.remove('ithinkUser')

        const result3 = await this.props.getAddresses(this.props.objectUser) // buat set payload

        const result2 = await axios.get(`/address/${this.props.objectUser.id}`) // buat set cookie

        cookie.set('ithinkUser', { id, first_name, last_name, username, email, phone_number, address: result2.data, avatar })

        console.log(result2)

        this.setState({ screenState: 'profile' })
        this.setState({ addAddress: false })


    }

    renderAddAddress = () => {
        return (
            <div>
                <Header />
                <div>

                    <div className='container'>

                        <h1 className='text-center mb-5'>Add address</h1>
                    </div>
                    <div className='row'>
                        <div className='container'>
                            <form>


                                <label className='ml-auto form-group'><b>address name</b></label>
                                <input ref={input => this.newAddress_name = input} type='text' className='form-control' placeholder='Address Name'></input>
                                <br />
                                <label className='ml-auto form-group'><b>address</b></label>
                                <textarea ref={input => this.newAddress_detail = input} type='text' className='form-control' placeholder='Address details' />
                                <br />
                                <label className='ml-auto form-group'><b>postal code</b></label>
                                <input ref={input => this.newPostal_code = input} type='number' className='form-control' placeholder='postal code'></input>
                                <br />
                                <label className='ml-auto form-group'><b>city</b></label>
                                <input ref={input => this.newCity = input} type='text' className='form-control' placeholder='city'></input>
                                <br />

                            </form>
                            <button className='btn btn-primary mr-3 mb-5 col col-sm' onClick={() => { this.saveAddAddressButton() }}>SAVE</button>
                            <button className='btn btn-danger mb-5 col col-sm' onClick={() => { this.cancelAddAddress() }}>CANCEL</button>
                        </div>
                    </div>

                </div>


            </div>
        )
    }

    renderAddresses = () => {

        //map array address 

        let render = this.props.objectUser.address.map(item => {
            return (
                <tr key={item.id}>
                    <th>{item.address_name}</th>
                    <th>{item.address_detail}</th>
                </tr>
            )
        })

        return render
    }

    renderAddress = () => {

        return (

            <div>
                
                <Header />
                <div className='container'>
                    <button className='btn btn-primary mr-5' onClick={() => { this.onProfileButton() }}>PROFILE</button>
                    <button className='btn btn-primary' onClick={() => { this.onAddressButton() }}>ADDRESS</button>
                </div>
                <div className='mx-5'>
                    <center>
                        <br />
                        <h2 className='mt-3'>
                            ADDRESS
                    </h2>
                        <br />
                        <div className="table-responsive">

                            <table className="table table-hover mx-auto w-auto mb-5" style={{ margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        {/* <th scope="col">ID</th> */}
                                        <th scope="col">ADDRESS NAME</th>
                                        <th scope="col">ADDRESS</th>


                                    </tr>
                                </thead>
                                {/* render all ADDRESSES */}
                                <tbody>{this.renderAddresses()}</tbody>

                            </table>
                            <button className='btn btn-primary mb-5' onClick={() => { this.addAddressButton() }}>add address</button>
                        </div>
                    </center>
                </div>
                <Footer />
            </div>
        )

    }

    onProfileButton = () => {
        this.setState({ screenState: 'profile' })
    }

    onAddressButton = () => {
        this.setState({ screenState: 'address' })
    }

    //fungsi buat mau edit
    onEditButton = () => {
        this.setState({ editprofile: true })
    }

    cancelEdit = () => {
        this.setState({ editprofile: false })
    }

    onEditProfile = () => {
        const { id, avatar, username, first_name, last_name, email, phone_number, address } = this.props.objectUser

        return (
            <div>
                <Header />
                <div>
                    {/* Jumbotron */}
                    <div className='jumbotron container mt-4'>
                        <div className="row">
                            {/* KOLOM BUAT FOTO*/}
                            <div className="col-4 col-md-4 col-sm-6">
                                {avatar === null ? <img src={default_avatar} alt="avatar_default" style={{ width: "200px" }} /> : <img src={`http://localhost:4000/users/avatar/${avatar}`} style={{ width: "200px", borderRadius: "150px" }} alt={this.props.objectUser.avatar} key={new Date()} />}

                                {/* <input type='file' className="custom-file" ref={input => this.avatar = input}  />  */}
                                <input type='file' className="custom-file" />
                                {/* <button className="btn btn-primary" onClick={this.uploadAvatar} >{ avatar === null ? 'Upload Avatar' : 'Change Avatar'}</button> */}
                                <button className="btn btn-primary">Change Avatar </button>

                                {/* if user has an avatar, Button Delete Avatar will be appeared */}
                                {/* {  avatar !== null ? <button className="btn btn-danger" onClick={this.deleteAvatar} >Delete Avatar</button> : ''  } */}
                            </div>
                            {/* KOLOM BUAT BIODATA*/}
                            <div className='col-8 col-md-8 col-sm-6'>
                                <h1 >EDIT BIODATA</h1>
                                <p className="lead">Username : {username} </p>
                                <p className="lead">Email : {email} </p>
                                <div className='float-left col form-group'>
                                    <label for='surename' className=''><b>First Name</b></label>
                                    <input ref={input => this.firstname = input} type='text' className='form-control col-md col-sm' defaultValue={this.props.objectUser.first_name}></input>
                                </div>
                                <div className='float-left col form-group'>
                                    <label for='lastname' className=''><b>Last Name</b></label>
                                    <input ref={input => this.lastname = input} type='text' className='form-control col-md col-sm' defaultValue={this.props.objectUser.last_name}></input>
                                </div>
                                <div className='float-left col form-group'>
                                    <label for='surename' className=''><b>Phone Number</b></label>
                                    <input ref={input => this.phoneNumber = input} type='text' className='form-control col-md col-sm' defaultValue={this.props.objectUser.phone_number}></input>
                                </div>
                                <div className='float-left '>

                                    <p className="lead">
                                        <Button className='btn btn-confirm float-left mx-2' color="primary" onClick={() => { this.onEditClick() }} >Save</Button>
                                        <Button className='btn btn-danger float-left mx-2' color="primary" onClick={() => { this.cancelEdit() }}>Cancel</Button>
                                    </p>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }


    render() {
        if (this.props.objectUser.id != '') {
            //NGERENDER PROFILE
            if (this.state.screenState === 'profile') {
                if (this.state.editprofile === false) {
                    return (
                        this.renderProfile()
                    )
                }
                if (this.state.editprofile === true) {
                    return (
                        this.onEditProfile()
                    )
                }
            }
            if (this.state.screenState === 'address') {
                console.log(this.props.objectUser.address)

                if (this.state.addAddress === false) {
                    return (
                        this.renderAddress()
                    )
                }

                if (this.state.addAddress === true) {
                    return (
                        this.renderAddAddress()
                    )
                }
            }
            //NGERENDER ADDRESS
        }
        else {
            return <Redirect to='/' />
        }
    }
}

const mapStatetoProps = state => {
    return {
        objectUser: state.auth // bikin namanya sesuka hati
    }
}

export default connect(mapStatetoProps, { editProfile, deleteAvatar, updateAvatar, getAddresses })(Profile)