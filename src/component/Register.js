import React, { Component } from 'react'
import { Button } from 'reactstrap'
import axios from '../config/axios'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Register extends Component {

    state = {
        register: false
    }

    enterPress = (event) => {
        event.preventDefault()
        this.onButtonClick()
    }

    onButtonClick = async () => {
        const first_name = this.firstname.value
        const last_name = this.lastname.value
        const username = this.username.value
        const email = this.email.value
        const password = this.password.value

        const confirmPassword = this.confirmPassword.value

        if (username.length < 6) {
            alert('username harus terdiri dari 6-16 karakter')
        }

        try{
            const res = await axios.post('/users/input',
            {
                first_name, last_name, username, email, password 
            })

            if(typeof(res.data) === 'string'){
                return res.data
            }

            if(typeof(res.data) === 'object'){
                alert('Registrasi Sukses, silahkan login')
                this.setState({register : true})
            }
        }
        catch(err){
            alert(err)
        }        
    }

    renderRegister = () => {
        return (
            <div>
                <div>
                    <h1 className='text-center mb-5'>Register</h1>
                </div>
                <div className='row'>
                    <div className='container offset-2 col-8 mb-5'>
                        <form>
                            <div className='row'>
                                <div className='float-left col-6 form-group'>
                                    <label for='surename' className=''><b>First Name</b></label>
                                    <input type='text' ref={input => this.firstname = input} className='form-control col-md col-sm' placeholder='Enter First Name' name='password' required></input>
                                </div>
                                <div className='float-left col-6 form-group'>
                                    <label for='surename' className=''><b>Last Name</b></label>
                                    <input type='text' ref={input => this.lastname = input} className='form-control col-md col-sm' placeholder='Enter Last Name' name='password' required></input>
                                </div>
                            </div>

                            <label for='Email' className='ml-auto form-group'><b>Email</b></label>
                            <input type='text' ref={input => this.email = input} className='form-control' placeholder='Enter email' name='email' required></input>
                            <br />
                            <label for='username' className='ml-auto form-group'><b>Username</b></label>
                            <input type='text' ref={input => this.username = input} className='form-control' placeholder='Enter username' name='username' required></input>
                            <br />
                            <label for='password' className='ml-auto form-group'><b>Password</b></label>
                            <input type='password' ref={input => this.password = input} className='form-control' placeholder='Enter password' name='password' required></input>
                            <br />
                            <label for='confirmPassword' className='ml-auto form-group'><b>Confirm Password</b></label>
                            <input type='password' ref={input => this.confirmPassword = input} className='form-control' placeholder='Re-enter password' name='password' required></input>
                            <br />
                            <div className='text-center'>
                                <Button className='btn btn-dark' onClick={() => { this.onButtonClick() }}>Register</Button>
                                <p className="lead">Already have an account ? <Link to="/login">Login Now!</Link></p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }

    render() {

        if(this.state.register === true){
            return <Redirect to='/login' />
        }

        if (this.props.objectUser.id === '') {
            return (
                this.renderRegister()
            )
        }
        
        else {
            return(
                <div>
                <Redirect to='/' />
            </div>
            )

        }

    }

}

const mapStateToProps = state => {
    return {
        objectUser: state.auth  // { id, name, username, email, phone_number, is_admin, avatar }
    }
}

export default connect(mapStateToProps)(Register)