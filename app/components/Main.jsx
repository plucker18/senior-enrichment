import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Campuses from './Campuses';
import Students from './Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Header from './Header';
import Home from './Home';

export default function Main () {

  return (
    <Router>
      <div>
        <div className="header">
          <Header />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/campuses" component={Campuses} />
          <Route path="/campuses/:campusId" component={SingleCampus} />
          <Route exact path="/students" component={Students} />
          <Route path="/students/:id" component={SingleStudent} />
        </Switch>
      </div>
    </Router>
  );
}
