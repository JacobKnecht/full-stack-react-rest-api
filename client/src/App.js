import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';

class App extends Component {
  state = {
    baseURL: "http://localhost:5000/api",
  }

  render() {
    return (
      <BrowserRouter>
      <div id="root">
        <div>
          <Header />
          <hr />
          <Switch>
            {/*Homepage Route - Renders <Courses> Component/Courses List*/}
            <Route
              exact path="/"
              render={ () => <Courses baseURL={this.state.baseURL} /> }
            />
            {/*Course Details Route - Renders <CourseDetails> Component*/}
            <Route
              path="/courses/:id"
              render={ props =>
                <CourseDetail
                  {...props}
                  baseURL={this.state.baseURL}
                />
              }
            />
            {/*User Sign-In Route*/}
            <Route path="/signin" render={ () => <UserSignIn /> } />
            {/*User Sign-Up Route*/}
            <Route path="/signup" render={ () => <UserSignUp /> } />
            {/*404/Not Found Route*/}
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
