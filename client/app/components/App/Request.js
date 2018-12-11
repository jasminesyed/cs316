import React, { Component } from 'react';
import { setInStorage, getFromStorage,} from '../../utils/storage';
class Request extends Component {
  constructor(props){
    super(props);
    this.state={
      items:[],
      eatery:"",
      token:"",
      refresh:0,
      runid:"",
      itemLimit:0,
      selected: [],
      cart:{},
    }
    this.onRefresh=this.onRefresh.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.send= this.send.bind(this);
  }
  componentWillMount(){
    if(this.props.location.state.token){
      this.setState({
        token:this.props.location.state.token,
        eatery:this.props.location.state.eatery,
        runid:this.props.location.state.runid,
        itemLimit:this.props.location.state.limit,
        cart:{}
      })
    }
    fetch('/api/getitems?eatery=' + this.props.location.state.eatery).then(res=>res.json()).then(json=>{
      var copy=[]
      for(var i =0; i<json.length;i++){
        copy.push(json[i]);
      }
      this.setState({
        items:copy
      })
    })
    }
    handleChange(event) {
    const selectedIndex = event.target.options.selectedIndex;
     this.setState({[event.target.id]: [event.target.value,event.target.options[selectedIndex].getAttribute('p')]});
     console.log(this.state.selected)
   }
  add(){
    if(Object.keys(this.state.cart).length<this.state.itemLimit){
    const copy = Object.assign({}, this.state.cart);
    copy[this.state.selected[1]]=this.state.selected[0]
    this.setState({
      cart:copy
    })
  }
    console.log(Object.keys(this.state.cart).length,this.state.itemLimit)
  }
  onRefresh(){
    var a = this.state.refresh+1
    this.setState({
      refresh:a,
    })
    console.log(this.state.refresh, this.state.items)
  }
  send(){
    console.log(this.state.runid)
   fetch('/api/sendrequest',{
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       body: JSON.stringify({
         runId: this.state.runid,
         requesterToken:this.state.token,
         items:this.state.cart
       })
     }).then(res => res.json()).then(json => {
         if (json.success) {
           this.setState({
             cart:{},
             selected:[]
           });
         }else{
           console.log("err")
         }
     });
  }
  render(){
    let ImgVar = '';
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

    var styleRest = {
      color: '#5D4B36',
      fontSize: 25,
      // marginRight: 15,
      marginBottom: 0,
      textAlign: 'center',
    }

    var container ={
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
    var style = {
      color: 'white',
      fontSize: 50,
      marginBottom: 10,
      fontFamily: 'SignPainter',
    };
     var style1 = {
      color: 'white',
      fontSize: 70,
      marginBottom: 10,
      marginTop: 10,
      fontFamily: 'SignPainter',
    };
    var boxStyle2 = {
      color: '#5D4B36',
      height: 30,
      width: 250,
      fontSize: 20,
      textMargin: 10,
      borderColor: '#D2AF6E',
      marginLeft: 10,
    }

    var display = this.state.items.map(a=>{
      return <option key={a.item_id} p = {a.item_id}>{a.name} {a.size} ${a.price}</option>
    })
    var cart = Object.keys(this.state.cart).map(key=>{
      return <li style={styleRest} key={key} p={key}>{this.state.cart[key]}</li>
    });
    console.log(Object.keys(this.state.cart))

    return(
      <div className='background-image' style ={ { backgroundImage: "url(assets/img/delivery.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', height: 550} }>
      <p style = {style1}> Choose Your Items </p>
      <div style = {container}>

      <div style = {styleRest}>{this.state.eatery}</div>
      <select style={boxStyle2}  onChange={this.handleChange} id="selected">
              {display}
      </select>
      <button style = {buttonStyle} onClick={this.add}>Add to Cart</button>
      <button style = {buttonStyle} onClick={this.send}> Send Request</button>
      </div>

      <div style = {style}>Cart</div>
      <ul>{cart}</ul>
      </div>
    )
  }
}

export default Request;
