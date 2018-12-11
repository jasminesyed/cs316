import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import HelloWorld from './components/HelloWorld/HelloWorld';
import Run from './components/App/Run';
import Choice from './components/App/Choice';
import ActiveRun from './components/App/ActiveRun';
import Request from './components/App/Request'
import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route path="/run" component={Run}/>
        <Route path="/home" component={Choice}/>
        <Route path="/activeruns" component={ActiveRun}/>
        <Route path="/request" component={Request}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
