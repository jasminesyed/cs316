import React, { Component } from 'react';
//import { setInStorage, getFromStorage,} from '../../utils/storage';
//import 'whatwg-fetch';

class Run extends Component {
  constructor(props) {
      super(props);
      this.state = {
        eatery:"",
        itemLimit:0,
        possibleEateries:['a', 'b', 'c','d'],
        runCreated:false,
        token:""

      };
      this.handleChange = this.handleChange.bind(this);
      this.incrementDecrementLimit = this.incrementDecrementLimit.bind(this);
      this.onSubmit=this.onSubmit.bind(this)
      this.run=this.run.bind(this)
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
      if (json.success) {
        this.setState({
          eatery: "",
          itemLimit: 0,
          runCreated:true,
        });
      }else{
        console.log(json)
      }
  });
}
run(){
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
  render() {
    const listItems = this.state.possibleEateries.map((eatery, i) =>
  <option key={i} value={eatery}>{eatery}</option>
)
if(!this.state.runCreated){
    return(
      <div>
      <select value={this.state.value} onChange={this.handleChange} id="eatery">
            {listItems}
      </select>
      <input type="number" placeholder="item limit"  onInput={this.incrementDecrementLimit} onChange={this.onChange} id="itemLimit"/>
      <button onClick={this.onSubmit}> Create Run </button>
      </div>
    )
  }
return(
  <div>
    <p>Accepting Orders</p>
    <button onClick={this.run}>Run</button>
  </div>
)
}
}

export default Run;
