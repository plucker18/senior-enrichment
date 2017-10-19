'use strict';

import React from 'react';
import {render} from 'react-dom';
// import Router from 'react-router-dom';
// import { Provider } from 'react-redux';

// import store from './store';
import Main from './components/Main';
// import Header from './components/Header';

render(
  <div>
    <Main />
  </div>,
  document.getElementById('app')
  );
