import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
  };

  returnToList = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  updateUserEmailAddress = (e) => {
    this.setState({ emailAddress: e.target.value });
  }

  updateUserPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { context } = this.props;
    context.actions.signIn(this.state.emailAddress, this.state.password)
      .then(user => {
        if(user !== null) {
          user.password = this.state.password;
          context.actions.setAuthenticatedUser(user);
          this.props.history.push("/");
          console.log(`${this.state.emailAddress} successfully signed in`);
        } else {
          this.props.history.push("/forbidden");
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error");
      });
  }

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className=""
                  placeholder="Email Address" value={this.state.emailAddress}
                  onChange={this.updateUserEmailAddress} />
              </div>
              <div>
                <input id="password" name="password" type="password" className=""
                  placeholder="Password" value={this.state.password}
                  onChange={this.updateUserPassword} />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={this.returnToList}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserSignIn);
