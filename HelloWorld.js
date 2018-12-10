import React from 'react';

let ImgVar = '';

let imgUrl = 'assets/img/friendscoffee.jpg'; 

<div className = 'Component-Bg' 
     style = {{ backgroundImage: 'url(' + imgUrl + ')', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }}>
</div>


const HelloWorld = () => (
  <p> We know that you are busy. Between going to classes, writing papers, and running to meetings, sometimes you need a coffee just to stay awake. That is why we created CoffeeBud, 
  a website that allows you to easily connect, deliver, and share coffee with your friends. Click on our logo to get started and create your own account today! </p>

);



export default HelloWorld;
