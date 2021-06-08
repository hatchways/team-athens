import { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';

export const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { loggedInUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedInUser) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
      }}
    />
  );
};
