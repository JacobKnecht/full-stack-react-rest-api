import React from 'react';
import { Redirect } from 'react-router-dom';

//component doesn't render and visual elements
const UserSignOut = ({ context }) => {
  //sign the user out
  context.actions.signOut();
  //redirect the user to the course list
  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;
