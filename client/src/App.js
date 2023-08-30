import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import ExportCSVPage from './components/ExportCsv.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/chatbot" />
        <Route path="/chatbot" component={ Chatbot }/>
        <Route path="/history" component={ ExportCSVPage }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
