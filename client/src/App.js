import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
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
        
          <Switch>
            <Route exact path='/' component={Landing}/>
            <Route component={Routes}/>
          </Switch>
        </Fragment>
        </Router>
      </Provider>    
    ) 
  }
 };
export default App;
