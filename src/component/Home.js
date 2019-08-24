import React , {Component} from 'react'
import { Jumbotron, Button } from 'reactstrap';

import Homecarousel from './Homecarousel'
import jumbotron1 from './../img/avatar1.png'
import '../css/home.css'

class Home extends Component {
  render () {
    return (
      <div>
        <Homecarousel />
          <div className ='row'>
            <Jumbotron className = 'col col-sm col-md mb-1 bg-transparent'>
                <h1 className="display-2  d-flex justify-item-center ">Tagline item1</h1>
                <p className="lead">Tagline item1</p>
                <p className="lead">
                <Button className='btn btn-dark float-left' color="primary">Learn More</Button>
                </p>
            </Jumbotron>
            <img src={jumbotron1} className='col col-sm col-md jumbotron-resp'/>
          </div>
          
          <div>
            <Jumbotron>
                <h1 className="display-2 text-right">Tagline item2</h1>
                <p className="lead text-right">Tagline item2</p>
                <p className="lead">
                <Button className='btn btn-dark float-right' color="primary">Learn More</Button>
                </p>
            </Jumbotron>
          </div>
          
      </div>
    )
  }
}

export default Home