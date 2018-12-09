import React, { Component } from 'react';
import { setInStorage, getFromStorage,} from '../../utils/storage';
import Run from '../App/Run'
import Choice from '../App/Choice'
/*import express from 'express'*/

var styles = {
  backgroundImage: 'url(' + 'assets/img/coffee.jpg' + ')',
  backgroundSize: 'cover',
    overflow: 'auto',

};
var container ={
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        token: '',
        signUpError: '',
        signInError: '',
        signInEmail: '',
        signInPassword: '',
        signUpEmail: '',
        signUpPassword: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.onSignUp = this.onSignUp.bind(this);
      this.onSignIn = this.onSignIn.bind(this);
      this.logout = this.logout.bind(this);
    
}
  handleChange(e){
    console.log(e.target.id)
    this.setState(
      {
        [e.target.id] :e.target.value
      }
    )}
    onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }
  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }
  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  componentDidMount() {
          this.setState({
        // token:"aaaaa" //set this to go to next page
      })
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
        // Verify token
        fetch('/api/account/verify?token=' + token)
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState({
                token,
                isLoading: false
              });
            } else {
              this.setState({
                isLoading: false,
              });
            }
          });
      } else {
        this.setState({
          isLoading: false,
        });
      }
    }
  render() {
    let ImgVar = '';
    var style = {
      color: 'white',
      fontSize: 40,
      marginBottom: 30
    };
      const {
        isLoading,
        token,
        signInError,
        signInEmail,
        signInPassword,
        signUpEmail,
        signUpPassword,
        signUpError,
      } = this.state;
      if (isLoading) {
        return (<div style = {{color: "#562E14", fontSize: 25, marginTop: 50, marginBottom: 400}}><p>Loading...</p></div>);
      }


      if (!token) {
        return (

          <div className='background-image' style ={ { backgroundImage: "url(assets/img/coffee.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', height: 500} }>
          <img src={ImgVar} />
            <div style={{color: "white"}}>
              {
                (signInError) ? (
                  <p>{signInError}</p>
                ) : (null)
              }
              <p style = {style}>Welcome Back</p>
              <input
                type="email"
                placeholder="Email"
                value={this.state.signInEmail}
                onChange={this.handleChange}
                id="signInEmail"
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={this.state.signInPassword}
                onChange={this.handleChange}
                id="signInPassword"
              />
              <br />
              <button onClick={this.onSignIn}>Sign In</button>
            </div>
            <br />
            <br />
            <div style = {{marginBottom: 100, backgroundColor: 'transparent', color: "white"}}>
              {
                (signUpError) ? (
                  <p>{signUpError}</p>
                ) : (null)
              }
              <p style = {style}>Join Us</p>
              <input
                type="email"
                placeholder="Email"
                value={this.state.signUpEmail}
                onChange={this.handleChange}
                id="signUpEmail"
              /><br />
              <input
                type="password"
                placeholder="Password"
                value={this.state.signUpPassword}
                onChange={this.handleChange}
                id="signUpPassword"
              /><br />
              <button onClick={this.onSignUp}>Sign Up</button>
            </div>
         </div>
        );
      }
      return (
        <div>
          <p>Account</p>
          <button onClick={this.logout}>Logout</button>
          <Choice token={this.state.token}/>
        </div>

      );
    }
}

export default Home;
