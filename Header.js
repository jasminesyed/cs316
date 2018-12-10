import React from 'react';

import { Link } from 'react-router-dom';
var style1 = {
  color: 'white',
  fontSize: 65,
  textAlign: 'center',
  fontWeight: 900,
  fontFamily: 'Hoefler Text !important',
  backgroundColor: 'transparent',
  backgroundImage: "url(assets/img/c.jpg)",
  borderBottomWidth: 1,
  borderLeftWidth: 0,
  borderRightWidth:0,
  borderTopWidth:0,
  borderStyle: 'solid',
  borderColor: 'white',
  overflow: 'auto',

};
var style2 = {
  color: 'white',
  fontSize: 20,
  textAlign: 'left',
  fontFamily: 'Josefin Sans !important',
  backgroundColor: 'transparent',
  textDecoration:'none !important',
  overflow: 'auto',
  marginTop: 10,

};


const Header = () => (
  <header style = {style1}>
   <nav style = {style2}>
      <Link to="/helloworld"className = "link" style={{ textDecoration: 'none' , color: 'white',   overflow: 'auto', fontSize: 25}}>About</Link>
    </nav>
    <Link to="/" className = "link"style={{ textDecoration: 'none', color: 'white', shadowColor:'transparent'}}>COFFEEBUD</Link>
    <hr />
  </header>
 

      
);



export default Header;
