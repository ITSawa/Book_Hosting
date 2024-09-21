import './static/css/App.css';
import './static/css/Header.css';
import './static/css/Main.css';
import './static/css/Footer.css';
import './static/css/Loading.css';
import './static/css/NotFound.css';
import './static/css/Info.css'
import './static/css/WelcomePage.css';
import './static/css/Auth.css';
import './static/css/Account.css';
import './static/css/Constructor.css'
import './static/css/Switch.css'

import React, { useContext } from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import Loading from './components/assets/Loading';

import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from './components/context/AppContext';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Router>
          <Loading />
          <Header />
          <Main />
          <Footer />
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;