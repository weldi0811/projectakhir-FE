import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { TextArea, Form } from 'semantic-ui-react';
import notyet from '../../img/notyet.png'

class AddKemeja extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event) => {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })

    }

    render() {
        return (
            <div>
                <div>
                    <h1 className='text-center mb-5'>ADD KEMEJA</h1>
                </div>

                {/* form register */}
                <div className='row'>
                    <div className='container offset-2 col-8 mb-5'>
                        <form>
                            <div className='row'>
                                <div className='float-left col-6 form-group'>
                                    <label className=''><b>Product Name</b></label>
                                    <input type='text' className='form-control col-md col-sm' placeholder='Enter Product Name' required></input>
                                </div>
                                <div className='float-left col-6 form-group'>
                                    <label for='PRICE' className=''><b>PRICE</b></label>
                                    <input type='number' className='form-control col-md col-sm' placeholder='Enter PRICE' required></input>
                                </div>
                            </div>

                            <label for='Description' className='ml-auto form-group'><b>Description</b></label>
                            <Form>
                                <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />
                            </Form>
                            <br />
                            <div className='col col-sm col-md mb-5'>
                                <label className='ml-auto form-group'><b>Stock S</b></label>
                                <input type='number' className='form-control' placeholder='enter stock size S' required></input>
                                <label className='ml-auto form-group'><b>Stock M</b></label>
                                <input type='number' className='form-control' placeholder='enter stock size M' required></input>
                                <label className='ml-auto form-group'><b>Stock L</b></label>
                                <input type='number' className='form-control' placeholder='enter stock size L' required></input>
                                <label className='ml-auto form-group'><b>Stock XL</b></label>
                                <input type='number' className='form-control' placeholder='enter stock size XL' required></input>
                                <label className='ml-auto form-group'><b>weight</b></label>
                                <input type='number' className='form-control' placeholder='enter weight' required></input>
                            </div>
                                <div className='mb-5' >
                                { this.state.file === null ? <img src={notyet} alt="notyet" className='mx-2' style={ { width: "150px" } } /> : <img src={this.state.file} className='mx-2' style={ { width: "150px", borderRadius: "150px" } }  alt={this.state.file} key={ new Date() } />  }
                                </div>
                                <input type="file" className='border' onChange={this.handleChange} />
                            <div className='text-center'>
                                <Button className='btn btn-dark' type='submit'>add product</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default AddKemeja;