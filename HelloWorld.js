import React from 'react';

var image = {
	backgroundImage: "url(assets/img/cafe123.jpg)",
	backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'auto',
    height: 800,
}
var style1 = {
  color: 'white',
  fontSize: 20,
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'Hoefler Text',
  backgroundColor: 'transparent',
  borderBottomWidth: 1,
  borderLeftWidth: 0,
  borderRightWidth:0,
  borderTopWidth:0,
  borderStyle: 'solid',
  borderColor: 'white',
  overflow: 'hidden',
  height: 750,

};

const HelloWorld = () => (
<header style = {image}>
	<p style = {style1}> We know that you are busy. Between going to classes, writing papers, and running to meetings, sometimes you need a coffee just to stay awake. That is why we created CoffeeBud, 
  a website that allows you to easily connect, deliver, and share coffee with your friends. Click on our logo to get started and create your own account today! </p>
</header>
);
	


export default HelloWorld;