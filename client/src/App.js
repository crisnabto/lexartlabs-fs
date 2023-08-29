import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/chatbot" />
        <Route path="/login" component={ LoginForm }/>
        <Route path="/chatbot" component={ Chatbot }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
