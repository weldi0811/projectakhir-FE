import React , {Component} from 'react'

class Footer extends Component {
  render () {
    return (
      <div>
        <footer className='page-footer bg-dark font-small pt-4'>
          <div className='container'>
            <div className='row'>
              {/* footer buat link*/}
              <div className='col-md-6'>
                <h3 class='font-weight-bold text-uppercase mt-2 text-white'>Links</h3>
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
              <form class="input-group">
                  <input type="text" class="form-control form-control-sm" placeholder="Your email" aria-label="Your email" aria-describedby="basic-addon2"></input>
                      <div class="input-group-append">
                          <button class="btn btn-dark btn-sm ml-2" type="button">Sign up</button>
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