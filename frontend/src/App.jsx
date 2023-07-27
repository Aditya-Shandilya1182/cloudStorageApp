import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import UploadFile from './components/UploadFile';
import CreateFileLink from './components/CreateFileLink';
import FileLinks from './components/FileLinks';
import Login from './components/AuthForm';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/upload">Upload File</Link>
              </li>
              <li>
                <Link to="/create-link">Create File Link</Link>
              </li>
              <li>
                <Link to="/file-links">File Links</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/upload" component={UploadFile} />
            <PrivateRoute path="/create-link" component={CreateFileLink} />
            <PrivateRoute path="/file-links" component={FileLinks} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
};

const Home = () => {
  return <h2>Welcome to the File Sharing App!</h2>;
};

export default App;
