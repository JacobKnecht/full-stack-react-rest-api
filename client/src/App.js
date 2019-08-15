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
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';

import { Provider } from './components/Context'
import withContext from './components/Context';
const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);

class App extends Component {
  state = {
    baseURL: config.baseURL,
  }

  render() {
    return (
      <Provider>
        <BrowserRouter>
        <div id="root">
          <div>
            <HeaderWithContext />
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
              <Route path="/signin" component={UserSignInWithContext} />
              {/*User Sign-Up Route*/}
              <Route path="/signup" component={UserSignUpWithContext} />
              {/*User Sign-Out Route*/}
              <Route path="/signout" component={UserSignOut} />
              {/*Unhandled Error Route*/}
              <Route path="/error" component={UnhandledError} />
              {/*Forbidden/Unauthorized Route*/}
              <Route path="/forbidden" component={Forbidden} />
              {/*404/Not Found Route*/}
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
