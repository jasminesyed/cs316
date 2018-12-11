import React, { Component } from 'react';
//import { setInStorage, getFromStorage,} from '../../utils/storage';
//import 'whatwg-fetch';
import { Link } from 'react-router-dom'

class ActiveRun extends Component {
  constructor(props) {
      super(props);
      this.state = {
        token:"",
        list:[]
      };
      this.onRefresh=this.onRefresh.bind(this);
    }
  componentDidMount() {
    console.log(this.props.match)
    if(true){
      fetch('/api/getrun').then(res => {
        console.log(res)
        return res.json()}
      )
    }

  }
  componentWillMount(){
    this.setState({
      token:this.props.location.state.token
    })
  }
  onRefresh(){
    fetch('/api/getrun').then(res => {
      var respclone = res.clone();
      return res.json()}
    ).then(json=>{
      console.log(json)
      this.setState({
        list:json.list
      })
    })
  }
  handleChange(event) {
   this.setState({[event.target.id]: event.target.value});
 }
  render() {
    var style = {
      color: 'white',
      fontSize: 70,
      marginBottom: 10,
      marginTop: 10,
      fontFamily: 'SignPainter',
    };
    var buttonStyle = {
      borderRadius: 25,
      marginTop: 3,
      labelColor: '#FFFFFF',
      height: 40,
      width: 300,
      fontSize: 25,
      textAlign: 'center',
      color: 'white',
      border: 'none',
      backgroundImage: 'url(' + 'assets/img/button3D.jpg' + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      marginBottom: 10
    };
    var buttonStyle2 = {
      borderRadius: 25,
      labelColor: '#FFFFFF',
      height: 40,
      width: 150,
      fontSize: 20,
      color: 'white',
      border: 'none',
      backgroundImage: 'url(' + 'assets/img/buttonC.jpg' + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }

    var container ={
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
    var styleRest = {
      color: '#5D4B36',
      fontSize: 30,
      marginBottom: 0,
      textAlign: 'center',
    }

    let ImgVar = '';
    var a = this.state.list.map((item, index) =>{
      return <li key={item.runner}><button style={buttonStyle}><Link style ={{textDecoration: 'none', color: 'white', fontSize: 15}} to={{pathname:"/request", state: { token: this.state.token, eatery:item.eatery, runid:item._id, limit:item.itemLimit }}}>{item.runner} to {item.eatery} </Link></button></li>
    }
    )
return(
  <div className='background-image' style ={ { backgroundImage: "url(assets/img/delivery.jpg)", backgroundSize: 'cover', backgroundPosition: 'center'} }>
  <img src={ImgVar} />
  <p style = {style}>Users Available For Delivery</p>
  <button style = {buttonStyle2} onClick={this.onRefresh}>Refresh</button>
  <ul>
    {a}
  </ul>
  </div>
)
}
}

export default ActiveRun;
