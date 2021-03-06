import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

const Header = (props) => {
  //obtain authenticated user state
  const { context } = props;
  const authUser = context.authenticatedUser;

  //render header
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {
            authUser ?
            <React.Fragment>
              <span>Welcome, {authUser.firstName}!</span>
              <NavLink to="/signout">Sign Out</NavLink>
            </React.Fragment>
            :
            <React.Fragment>
              <NavLink to="/signup" className="signup">Sign Up</NavLink>
              <NavLink to={
                {
                  pathname: "/signin",
                  state: { from: props.location },
                }
              }
              className="signin">Sign In</NavLink>
            </React.Fragment>
          }
        </nav>
      </div>
    </div>
  );
}

export default withRouter(Header);
