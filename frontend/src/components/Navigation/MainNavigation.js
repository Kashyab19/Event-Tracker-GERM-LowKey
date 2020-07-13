import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from "../../context/auth-context"
import './MainNavigation.css';

const mainNavigation = props => (
<AuthContext.Consumer>

  {(context) =>{return(

<header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>LowKey<span role="img" aria-label="sheep">🔑</span></h1>
    </div>
    <nav className="main-navigation__items">
      <ul>
        
      {!context.token && (<li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
        
        <li>
          <NavLink to="/events">Events<span role="img" aria-label="sheep">🎫</span></NavLink>
        </li>
      
      {context.token && 
        
        (<React.Fragment>
        <li>
          <NavLink to="/bookings">Bookings<span role="img" aria-label="sheep">®️</span></NavLink>
        </li>

        <li>
          <button onClick={context.logout}>Logout<span role="img" aria-label="sheep">📤</span></button>
        </li>
        </React.Fragment>)
      } 
      </ul>
    </nav>
  </header>

  );}}
  

  </AuthContext.Consumer>
);

export default mainNavigation;