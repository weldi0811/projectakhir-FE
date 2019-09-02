import React, { Component } from 'react'
import axios from '../config/axios'
import Swal from 'sweetalert2'



class Footer extends Component {


onSubscribeClick = async () => {

  const email = this.emailInput.value

  const res = await axios.post('/subscribe', {
    email
  })

  if(res.data){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000
    })
    
    Toast.fire({
      type: 'success',
      title: 'Anda telah selesai mendaftar'
    })
  }


}


  render() {
    return (
      <div>
        <footer className='page-footer bg-dark font-small pt-4'>
          <div className='container'>
            <div className='row'>
              {/* footer buat link*/}
              <div className='col-md-6'>
                <h3 className='font-weight-bold text-uppercase mt-2 text-white'>Links</h3>
                <ul className='list-unstyled'>
                  <li>
                    <a href='/asdf'>link1</a>
                  </li>
                  <li>
                    <a href='/asdf2'>link2</a>
                  </li>
                  <li>
                    <a href='/asdf3'>link3</a>
                  </li>
                </ul>
              </div>
              {/* footer buat form subscription*/}
              <div className='col-md-6 mt-2'>
                <form className="input-group">
                  <input type="email" class="form-control form-control-sm" ref={input => this.emailInput = input} placeholder="example@ex.com" aria-label="Your email" aria-describedby="basic-addon2"></input>
                  <div className="input-group-append">
                    <button className="btn btn-danger btn-sm ml-2" type="button" onClick={() => {this.onSubscribeClick()}}>Subscribe</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer