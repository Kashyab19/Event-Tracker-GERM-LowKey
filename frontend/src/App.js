import React from 'react';
import {BrowserRouter , Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import AuthPage from './pages/Auth';
import EventPage from './pages/Events';
import BookingPage from './pages/Booking';
import MainNavBar from './components/Navigation/MainNavigation';
import AuthContext from "./context/auth-context";

class App extends React.Component {
  state = {
    token:null,
    userId:null
  }
  
  //Global Login
  login = (token,userId,tokenExpiration) =>
  {
    this.setState({token:token,
                    userId:userId})
  }

  logout = () =>{
    this.setState({token:null,
      userId:null})
  }



  render(){
  return (
    <BrowserRouter>
    <>
    <AuthContext.Provider value = {{
      token : this.state.token ,
      userId : this.state.userId,
      login:this.login,
      logout:this.logout
    }}>
    <MainNavBar/>
      <Switch>
      {!this.state.token && <Redirect from="/" to="/auth" exact />}
      {this.state.token && <Redirect from="/" to="/events" exact />}
      {this.state.token && <Redirect from="/auth" to="/events" exact />}
      {!this.state.token && (
           <Route path="/auth" component={AuthPage} />
      )}
      <Route path="/events" component={EventPage} />
      {this.state.token && (
          <Route path="/bookings" component={BookingPage} />
      )}
      </Switch> 
      </AuthContext.Provider>
    </>
    </BrowserRouter>
    
  );
}
}

export default App;
