import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import config from './config';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';

class App extends Component {
  state = {
    baseURL: config.baseURL,
  }

  render() {
    return (
      <BrowserRouter>
      <div id="root">
        <div>
          <Header />
          <hr />
          <Switch>
            {/*Homepage/Course List Route*/}
            <Route
              exact path="/"
              render={ () => <Courses baseURL={this.state.baseURL} /> }
            />
            {/*Create Course Route*/}
            <Route
              path="/courses/create"
              render={ () => <CreateCourse baseURL={this.state.baseURL} /> }
            />
            {/*Course Update Route*/}
            <Route
              path="/courses/:id/update"
              render={ props =>
                <UpdateCourse
                  {...props}
                  baseURL={this.state.baseURL}
                />
              }
            />
            {/*Course Details Route*/}
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
            {/*User Sign-Out Route*/}
            <Route path="/signout" render={ () => <UserSignOut /> } />
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
