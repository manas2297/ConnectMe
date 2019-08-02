import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Otp from './components/auth/Otp';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/layout/NotFound';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

const history = createBrowserHistory();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends React.Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return  (
      <Provider store={store}>
        <Router history={history}>
          <Fragment>
          <Navbar/>
          <Route exact path='/' component={Landing}/>
          <section className="container">
            <Alert/>
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/dashboard' component={Landing}/>
              <Route exact path='/otp' component={Otp} />
              <Route component={NotFound}/>
              
            </Switch>
          </section>
          
        </Fragment>
        </Router>
      </Provider>    
    ) 
  }
 };

export default App;
