import React, { Component } from 'react';
import { Link } from 'react-router-dom'

//import { setInStorage, getFromStorage,} from '../../utils/storage';
//import 'whatwg-fetch';
var style1 = {
  color: 'black',
  fontSize: 40,
  // textAlign: 'center',
  // fontWeight: 900,
  // fontFamily: 'Hoefler Text',
  backgroundColor: 'tan',
  textDecoration: 'none',
  marginRight: 50,
  marginLeft: 50,
  marginBottom: 2000,
};
var container ={
  display: 'flex',
  // justifyContent: 'space-evenly',
  alignItems: 'flex-end',
  // backgroundColor: '#222',
};


class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

};

  render() {
    let ImgVar = '';
    var buttonStyle = {
      borderRadius: 25,
      labelColor: '#FFFFFF',
      height: 60,
      width: 200,
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      border: 'none',
      backgroundImage: 'url(' + 'assets/img/buttonC.jpg' + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginLeft: 800,
      marginBottom: 50,
    }

    var desc = {
      marginLeft: 800,
      fontFamily: 'SignPainter',
      fontSize : 55,
      marginBottom: 10,
      color: 'white',


    }

    return(
        <div className='background-image' style ={ { backgroundImage: "url(assets/img/cafe.jpg)", backgroundSize: '100%', backgroundPosition: 'center', height: 575} }>
        <img src={ImgVar} />,      
        <div>
        <p style = {desc}> Start a Coffee Run </p>
        <button style = {buttonStyle}>
          <Link to={{pathname:"/run", state: { token: this.props.token } }} style ={{textDecoration: 'none', color:'white'}} >Deliver</Link>
        </button>
        <div> 
          <span>
          </span>
        </div>
        <p style = {desc}> Find Coffee Nearby</p>
        <button style = {buttonStyle}>
         <Link to={{pathname:"/activeruns", state: { token: this.props.token }}} style ={{textDecoration: 'none', color:'white'}}>Order</Link>
        </button>
      </div>
      </div>
    )

  }
}

export default Choice;
