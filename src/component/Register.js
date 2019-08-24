import React, {Component} from 'react'
import {Button} from 'reactstrap'

class Register extends Component {

    render(){
        return(
            <div>
                <div>
                    <h1 className = 'text-center mb-5'>Register</h1>
                </div>

                {/* form register */}
                <div className='row'>
                    <div className ='container offset-2 col-8 mb-5'>
                        <form>
                            <div className='row'>
                            <div className='float-left col-6 form-group'>
                                <label for='surename' className =''><b>First Name</b></label>
                                <input type='text' className ='form-control col-md col-sm' placeholder='Enter First Name' name='password' required></input>
                            </div>
                            <div className='float-left col-6 form-group'>
                                <label for='surename' className =''><b>Last Name</b></label>
                                <input type='text' className ='form-control col-md col-sm' placeholder='Enter Last Name' name='password' required></input>
                            </div>
                            </div>
                            
                            <label for='Email' className ='ml-auto form-group'><b>Email</b></label>
                            <input type='text' className ='form-control' placeholder='Enter email' name='email' required></input>
                            <br />
                            <label for='username' className ='ml-auto form-group'><b>Username</b></label>
                            <input type='text' className ='form-control' placeholder='Enter username' name='username' required></input>
                            <br />
                            <label for='password' className ='ml-auto form-group'><b>Password</b></label>
                            <input type='password' className ='form-control' placeholder='Enter password' name='password' required></input>
                            <br />
                            <label for='confirmPassword' className ='ml-auto form-group'><b>Confirm Password</b></label>
                            <input type='password' className ='form-control' placeholder='Re-enter password' name='password' required></input>
                            <br />
                            <div className ='text-center'>
                            <Button className='btn btn-dark' type='submit'>Register</Button>
                            </div>
                        </form>
                    </div> 
                </div>
            </div>
        )
    }

}

export default Register