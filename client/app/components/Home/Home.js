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
      fontSize: 70,
      marginBottom: 10,
      fontFamily: 'SignPainter',
    };
    var buttonStyle = {
      borderRadius: 25,
      marginTop: 10,
      labelColor: '#FFFFFF',
      height: 30,
      width: 100,
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      border: 'none',
      backgroundImage: 'url(' + 'assets/img/button3D.jpg' + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
    }
    var buttonStyle2 = {
      borderRadius: 25,
      marginTop: 10,
      labelColor: '#FFFFFF',
      height: 30,
      width: 100,
      fontSize: 15,
      color: 'white',
      border: 'none',
      backgroundImage: 'url(' + 'assets/img/buttonC.jpg' + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'auto',
      marginRight: 1300,
      marginLeft:10,
    }

    var boxStyle = {
      borderRadius: 25,
      height: 25,
      width: 250,
      fontSize: 20,
      textMargin: 10,
      borderColor: '#D2AF6E',
    }
    var boxStyle2 = {
      borderRadius: 25,
      fontSize: 20,
      marginTop: 10,
      height: 25,
      width: 250,
      borderColor: '#D2AF6E',
    }
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

          <div className='background-image' style ={ { backgroundImage: "url(assets/img/coffee.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', height: 575} }>
          <img src={ImgVar} />
            <div style={{color: "white", marginTop:0, marginBottom:0}}>
              {
                (signInError) ? (
                  <p>{signInError}</p>
                ) : (null)
              }
              <p style = {style}>Welcome Back</p>
              <input
                type="email"
                placeholder="  Email"
                value={this.state.signInEmail}
                style={boxStyle}
                onChange={this.handleChange}
                id="signInEmail"
              />
              <br />
              <input
                type="password"
                placeholder="  Password"
                value={this.state.signInPassword}
                style={boxStyle2}
                onChange={this.handleChange}
                id="signInPassword"
              />
              <br />
              <button style={buttonStyle} onClick={this.onSignIn}>SIGN IN</button>
            </div>
            <div style = {{marginBottom: 100, marginTop: 0, backgroundColor: 'transparent', color: "white"}}>
              {
                (signUpError) ? (
                  <p>{signUpError}</p>
                ) : (null)
              }
              <p style = {style}>Join Us</p>
              <input
                type="email"
                placeholder="  Email"
                value={this.state.signUpEmail}
                style={boxStyle}
                onChange={this.handleChange}
                id="signUpEmail"
              /><br />
              <input
                type="password"
                placeholder="  Password"
                value={this.state.signUpPassword}
                style={boxStyle2}
                onChange={this.handleChange}
                id="signUpPassword"
              /><br />
              <button style={buttonStyle} onClick={this.onSignUp}>SIGN UP</button>
            </div>
         </div>
        );
      }
      return (
        <div>
        <Choice token={this.state.token}/>
        <button style = {buttonStyle2} onClick={this.logout}>Logout</button>
        </div>

      );
    }
}

export default Home;
