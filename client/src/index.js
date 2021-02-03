import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import Add from './components/Add';
import Art from './components/Art';
import Update from './components/Update';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/add" component={Add} />
      <Route path="/art/:id" component={Art} />
      <Route path="/update/:id" component={Update} />
    </div>
  </Router>
)


ReactDOM.render(Routes , document.getElementById('root'));

