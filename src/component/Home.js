import React , {Component} from 'react'
import { Jumbotron, Button } from 'reactstrap';
import Header from '../component/Header'
import Footer from '../component/Footer'
import {Link} from 'react-router-dom'

import Homecarousel from './Homecarousel'
import jumbotron1 from './../img/avatar1.png'
import kaos1 from './../img/kaos1.jpg'
import kaos2 from './../img/kaos2.jpg'
import kemeja1 from './../img/kemeja1.jpg.jpg'
import banner4 from './../img/banner4.jpeg'
import '../css/home.css'

class Home extends Component {
  render () {
    return (
      <div>
      <Header/>
      <div style={{ marginTop: "80px" }}>
          <Homecarousel />
              <div className="container-fluid mt-5 mb-5">
                  <div className="">
                  </div>
                  <hr></hr>
              </div>
              <div className="container">
                  <hr></hr>
                  <div className="row">
                      <div className="col-md-6">
                          <div class="hovereffect">
                              <img style={{width: "530px"}} to="" class="img-responsive" src={banner4} alt=""/>>
                              <div class="overlay">
                              <h2>Tshirt</h2>
                              <Link to ='/kaos'>
                              <a class="info" href="/kaos">link here</a>
                                  </Link>
                              
                              </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="">
                              <div class="hovereffect">
                                  <img style={{width: "580px"}} class="img-responsive" src={kaos1} alt=""/>
                                  <div class="overlay">
                                  <h2>Kemeja</h2>
                                  <Link to ='/kemeja'>
                                  <a class="info">link here</a>
                                  </Link>
                                  </div>
                              </div>
                          </div>
                          <div className="">
                              <div class="hovereffect">
                                  <img style={{height: "410px"}} class="img-responsive" src={kemeja1} alt=""/>
                                  <div class="overlay">
                                  <h2>best seller</h2>
                                  <Link to='/product/10'>
                                  <a class="info">link here</a>
                                  </Link>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          <Footer/>
      </div>
  </div>
    )
  }
}

export default Home