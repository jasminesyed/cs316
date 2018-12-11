import React, { Component } from 'react';
//import { setInStorage, getFromStorage,} from '../../utils/storage';
//import 'whatwg-fetch';

class Run extends Component {
  constructor(props) {
      super(props);
      this.state = {
        eatery:"",
        itemLimit:0,
        possibleEateries:[],
        runCreated:false,
        token:"",
        runId:"",
        orders:[],

      };
      this.handleChange = this.handleChange.bind(this);
      this.incrementDecrementLimit = this.incrementDecrementLimit.bind(this);
      this.onSubmit=this.onSubmit.bind(this)
      this.run=this.run.bind(this)
      this.refresh=this.refresh.bind(this)
    }
  handleChange(event) {
   this.setState({[event.target.id]: event.target.value});
 }
 incrementDecrementLimit(event){
   this.setState({
     itemLimit: event.currentTarget.value
   })
 }
 componentWillMount(){
   if(this.props.location.state.token){
     this.setState({
       token:this.props.location.state.token
     })
   }
   fetch('/api/geteateries').then(res=>res.json()).then(json=>{
     var eateries = json.map(a=>a.name)
     this.setState({
       possibleEateries:eateries
     })
   })
 }
onInput(event){
  this.setState({
    itemLimit: event.currentTarget.value
  })
}
onSubmit(){
  const {
    eatery,
    itemLimit
  } = this.state;
  fetch('/api/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      eatery: eatery,
      itemLimit: itemLimit,
      sessionId:this.state.token
    }),
  }).then(res => res.json()).then(json => {
    console.log(json)
      if (json.success) {
        this.setState({
          eatery: "",
          itemLimit: 0,
          runCreated:true,
          runId:json.runId
        });
      }else{
        console.log(json)
      }
  });
}
run(){
  console.log(this.state.token)
  fetch('/api/endrun', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      sessionId:this.state.token
    })
  }).then(res => res.json()).then(json => {
      console.log('json', json);
      if (json.success) {
        this.setState({
          eatery: "",
          itemLimit: 0,
          runCreated:false,
        });
      }else{
        console.log("err")
      }
  });
}
  componentDidMount() {
    }
  refresh(){
    console.log(this.state.runId)
    fetch("/api/requests?runid="+this.state.runId).then(res=>{return res.json()}).then(json=>{
    var toadd=[];
    for(var i= 0; i<json.length; i++){
      toadd.push(json[i])
    }
    this.setState({orders:toadd})
  })
  }
  render() {
    let ImgVar = ''

    var styleRest = {
      color: '#5D4B36',
      fontSize: 40,
      marginTop: 20,
      marginBottom: 0,
      textAlign: 'center',
    }

     var style = {
      color: 'white',
      fontSize: 70,
      marginBottom: 0,
      marginTop: 10,
      fontFamily: 'SignPainter',
    };

    var buttonStyle = {
      borderRadius: 25,
      marginTop: 3,
      labelColor: '#FFFFFF',
      height: 40,
      width: 200,
      fontSize: 25,
      textAlign: 'center',
      color: 'white',
      border: 'none',
      backgroundImage: 'url(' + 'assets/img/button3D.jpg' + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      marginLeft: 15,
    };

    var boxStyle = {
      height: 25,
      width: 100,
      fontSize: 20,
      textMargin: 10,
      marginLeft: 5,
      borderColor: '#D2AF6E',
    }

    var boxStyle2 = {
      color: '#5D4B36',
      height: 30,
      width: 250,
      fontSize: 20,
      textMargin: 10,
      borderColor: '#D2AF6E',
    }
    const listItems = this.state.possibleEateries.map((eatery, i) =>
  <option key={i} value={eatery}>{eatery}</option>
)
const orders = this.state.orders.map((a) =>{
  const items = Object.keys(a.orders).map(key=>{
    return <li style = {{fontSize: 20}}>{a.orders[key]}</li>
  })
  return(
    <div>
    <div style = {{fontSize: 30, marginTop: 10, marginBottom: 5}}>{a.requester}</div>
    <ul>{items}</ul>
    </div>
  )
})
if(!this.state.runCreated){
    return(
      <div className='background-image' style ={ { backgroundImage: "url(assets/img/delivery.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', height: 575} }>
      <img src={ImgVar} />
      <p style = {style}> Customize Your Run </p>

      <div style = {styleRest}>
      <select style = {boxStyle2} value={this.state.value} onChange={this.handleChange} id="eatery" >
            {listItems}
      </select>
      <input style = {boxStyle} type="number"  min="0" placeholder="item limit"  onInput={this.incrementDecrementLimit} onChange={this.onChange} id="itemLimit" />
      <button style = {buttonStyle} onClick={this.onSubmit}> Create Run </button>
      </div>
      </div>
    )
  }
return(
  <div className='background-image' style ={ { backgroundImage: "url(assets/img/delivery.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', height: 575} }>
  <img src={ImgVar} />
    <p style={style}>Accepting Orders</p>
    <button style = {buttonStyle} onClick={this.run}>Run</button>
    <button style = {buttonStyle} onClick={this.refresh}>Refresh</button>
    <div style={styleRest}>Orders</div>
    <ul>{orders}</ul>
  </div>
)
}
}

export default Run;
