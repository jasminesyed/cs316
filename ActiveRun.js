import React, { Component } from 'react';
//import { setInStorage, getFromStorage,} from '../../utils/storage';
//import 'whatwg-fetch';
import { Link } from 'react-router-dom'

class ActiveRun extends Component {
  constructor(props) {
      super(props);
      this.state = {
        token:this.props.match.params.token,
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
      marginTop: 10,
      labelColor: '#FFFFFF',
      height: 40,
      width: 200,
      fontSize: 25,
      color: 'white',
      border: 'none',
      backgroundImage: 'url(' + 'assets/img/button3D.jpg' + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      marginBottom: 10
    };
    var container ={
      display: 'flex',
      justifyContent: 'center',
      felxDirection: 'column',
      alignItems: 'center',
    };

    let ImgVar = '';
    var a = this.state.list.map((item, index) =>{
      console.log(item)
      return <li><Link to={{pathname:"/run", state: { token: this.props.token }}}>{item.runner} to {item.eatery}</Link></li>
    })
    return(
    <div className='background-image' style ={ { backgroundImage: "url(assets/img/runs.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', height: 575} }>
    <img src={ImgVar} />
    <div>
    <p style = {style}>Users Available For Delivery</p>
    <button style = {buttonStyle} onClick={this.onRefresh}>Jasmine</button>
    <div>
    <button style = {buttonStyle} onClick={this.onRefresh}>Ali</button>
    <div>
    <button style = {buttonStyle} onClick={this.onRefresh}>Rosie</button>
    <div>
    <button style = {buttonStyle} onClick={this.onRefresh}>Murti</button>
    <div>
    <button style = {buttonStyle} onClick={this.onRefresh}>Jane</button>
    <ul>
      {a}
    </ul>
    </div>
    </div>  
    </div>
    </div>
    </div>  
    </div>
  )
}
}

export default ActiveRun;
