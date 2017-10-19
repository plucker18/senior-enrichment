import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header>
      <Link to="/">
        <h1>Margaret Hamilton Interplanetary Academy of JavaScript</h1>
      </Link>
      <nav>
        <div className="nav-item">
          <Link to={'/campuses'}>
            <h2>Campuses</h2>
          </Link>
        </div>
        <div className="nav-item">
          <Link to={'/students'}>
            <h2>Students</h2>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
