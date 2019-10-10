import React , {Component} from 'react'
import { Jumbotron, Button } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom'
import {onLoginAdmin} from '../../actions/index'
import { connect } from 'react-redux';

class AdminLogin extends Component{

    onLoginClick = () => {
       
        const data_username = this.username.value
        const data_password = this.password.value   

        console.log(data_password)
        console.log(data_username)

        this.props.onLoginAdmin(data_username,data_password)
        
        
    }

    render(){
        if(this.props.objectAdmin.id === ''){
            return (
                <div className="mt-5 row">
                        <div className="col-sm-3 mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Login</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Username</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.username = input} className="form-control" type="text"/></form>
                                <div className="card-title mt-1">
                                    <h4>Password</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.password = input} className="form-control" type="password"/></form>
                                <div className="d-flex justify-content-center my-3">
                                <button className="btn btn-success btn-block" onClick={()=> {this.onLoginClick()}}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        } else {
            return <Redirect to='/dashboard' />
        }
    }

}

const mapStatetoProps = state => {
    return {
        objectAdmin : state.adminAuth // bikin namanya sesuka hati
    }
}


export default connect (mapStatetoProps,{onLoginAdmin})(AdminLogin)