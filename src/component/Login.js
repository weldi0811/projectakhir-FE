import React , {Component} from 'react'
import { Jumbotron, Button } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom'
import {onLoginUser} from '../actions/index'
import { connect } from 'react-redux';

class Login extends Component {

    onLoginClick = () => {
        console.log('1234')
        const data_email = this.email.value
        const data_password = this.password.value   
        
        console.log(data_email)

        this.props.onLoginUser(data_email,data_password)
        console.log(this.props.objectUser)
    }


  render () {
    if(!this.props.objectUser.id){
        return (
            <div>
                  <div>
                      <h1 className = 'text-center mb-5'>Sign in</h1>
                  </div>
                  {/* bikin form login dan register*/}
                  <div className = 'row'>
                      <div className ='col-12 col-md-6 col-sm-12'>
                      <h1 className='text-center'>Login</h1>
                          
                          <div >
                              {/* buat logo avatar*/}
                          </div>
                          <div className='container'>

                             <form>
                             <label for='Email' className ='ml-auto'><b>Email</b></label>
                              <input ref={input => this.email = input} type='text' className ='form-control' placeholder='Enter registered email' name='email' required></input>
                              <br />
                             </form>
                              <form>
                              <label for='password' className ='ml-auto'><b>password</b></label>
                              <input ref={input => this.password = input} type='password' className ='form-control' placeholder='Enter password' name='password' required></input>
                              </form>
                              <br />
                              <button onClick = {this.onLoginClick} className='col btn btn-dark mr-3'>ini ?</button>
                             
                          </div>
                          
                      </div>
                      <div className ='col-12 col-md-6 col-sm-12'>
                      <Jumbotron className='bg'>
                          <h1 className="display-4 text-center">New User?</h1>
                          <p className="lead text-center">Sign up now for member's benefit</p>
                          <p className="lead">
                              <div className='text-center'>
                                  <Link to='register'>
                                  <button className='btn btn-dark' color="primary">Sign up</button>
                                  </Link>
                                  
                              </div>
                          </p>
                      </Jumbotron>
                      </div>
                </div>
            </div>
          )
    }
    return <Redirect to='/' />
  }
}

const mapStatetoProps = state => {
    return {
        objectUser : state.auth // bikin namanya sesuka hati
    }
}

export default connect(mapStatetoProps,{onLoginUser})(Login)