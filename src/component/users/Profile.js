import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import {editProfile,deleteAvatar,updateAvatar} from '../../actions/index'
import default_avatar from '../../img/default_avatar.png'

class Profile extends Component {

    state = {
        edit : false
    }

    componentDidMount = () => {
        this.renderProfile()
    }

    //fungsi buat masukin value input ke redux
    onEditClick = async () => {
        const newFName = this.firstname.value
        const newLName = this.lastname.value
        const newPhoneNumber = this.phoneNumber.value

        await this.props.editProfile(newFName,newLName,newPhoneNumber,this.props.objectUser)

        this.setState({edit : false})
        
    }

    //delete avatar
    deleteAvatar = () => {
        this.props.deleteAvatar(this.props.objectUser)
    }

    //update avatar
    updateAvatar = () => {
        this.props.deleteAvatar(this.props.objectUser)

        const formData = new FormData()

        const newAvatar = this.avatar.files[0]

        console.log(newAvatar)

        formData.append('username', this.props.objectUser.username)
        formData.append('avatar', newAvatar)

        this.props.updateAvatar(formData,this.props.objectUser)
    }


    renderProfile = () => {

        const { id, avatar, username, first_name, last_name, email, phone_number } = this.props.objectUser
        return (
            <div>
                <div>
                    {/* Jumbotron */}
                    <div className='jumbotron container mt-4'>
                        <div className="row">
                            {/* KOLOM BUAT FOTO*/}
                            <div className="col-4 col-md-4 col-sm-6">
                                { avatar === null ? <img src={default_avatar} alt="avatar_default" style={ { width: "200px" } } /> : <img src={`http://localhost:4000/users/avatar/${avatar}`} style={ { width: "200px", borderRadius: "150px" } }  alt={this.props.objectUser.avatar} key={ new Date() } />  }
                                {/* <input type='file' className="custom-file" ref={input => this.avatar = input}  />  */}
                                <input type='file' className="custom-file" ref={input => this.avatar = input}/>
                                {/* <button className="btn btn-primary" onClick={this.uploadAvatar} >{ avatar === null ? 'Upload Avatar' : 'Change Avatar'}</button> */}
                               
                                <button className="btn btn-primary" onClick={this.updateAvatar} >{ avatar === '' ? 'Upload Avatar' : 'Change Avatar'}</button>

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
                                    <Button className='btn btn-dark float-left' color="primary" onClick={() => {this.onEditButton()}}>Edit</Button>
                                    <Button className='btn btn-dark float-left' color="primary" onClick={() => {console.log(this.props.objectUser)}}>console</Button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //fungsi buat nampilin avatar default (avatar = '')
    renderDefaultAvatar = () => {
        return(
            <div>

            </div>
        )
    }

    //fungsi buat mau edit
    onEditButton = () => {
        this.setState({ edit: true })
    }

    cancelEdit = () => {
        this.setState({edit : false})
    }

    onEditProfile = () => {
        const { id, avatar, username, first_name, last_name, email, phone_number } = this.props.objectUser

        return (
            <div>
                <div>
                    {/* Jumbotron */}
                    <div className='jumbotron container mt-4'>
                        <div className="row">
                            {/* KOLOM BUAT FOTO*/}
                            <div className="col-4 col-md-4 col-sm-6">
                            { avatar === '' ? <img src={default_avatar} alt="avatar_default" style={ { width: "200px" } } /> : <img src={`http://localhost:4000/users/avatar/${avatar}`} style={ { width: "200px", borderRadius: "150px" } }  alt={this.props.objectUser.avatar} key={ new Date() } />  }

                                {/* <input type='file' className="custom-file" ref={input => this.avatar = input}  />  */}
                                <input type='file' className="custom-file" />
                                {/* <button className="btn btn-primary" onClick={this.uploadAvatar} >{ avatar === null ? 'Upload Avatar' : 'Change Avatar'}</button> */}
                                <button className="btn btn-primary">upload</button>

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
                                    <input ref={input => this.firstname = input}type='text' className='form-control col-md col-sm' defaultValue={this.props.objectUser.first_name}></input>
                                </div>
                                <div className='float-left col form-group'>
                                    <label for='lastname' className=''><b>Last Name</b></label>
                                    <input ref={input => this.lastname = input}type='text' className='form-control col-md col-sm' defaultValue={this.props.objectUser.last_name}></input>
                                </div>
                                <div className='float-left col form-group'>
                                    <label for='surename' className=''><b>Phone Number</b></label>
                                    <input ref={input => this.phoneNumber = input}type='text' className='form-control col-md col-sm' defaultValue={this.props.objectUser.phone_number}></input>
                                </div>
                                <div className='float-left '>

                                    <p className="lead">
                                        <Button className='btn btn-confirm float-left mx-2' color="primary" onClick={() => {this.onEditClick()}} >Save</Button>
                                        <Button className='btn btn-danger float-left mx-2' color="primary" onClick={() => {this.cancelEdit()}}>Cancel</Button>
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
            if (this.state.edit === false) {
                return (
                    this.renderProfile()
                )
            }
            else {
                return (
                    this.onEditProfile()
                )
            }

        }
        else {
            return <Redirect to='/home' />

        }
    }
}

const mapStatetoProps = state => {
    return {
        objectUser: state.auth // bikin namanya sesuka hati
    }
}

export default connect(mapStatetoProps, {editProfile,deleteAvatar,updateAvatar})(Profile)