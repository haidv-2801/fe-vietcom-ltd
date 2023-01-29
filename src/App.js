import React, { Suspense, useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Footer from './components/layouts/Footer';
import Login from './components/Login';

import Admin from './admin/Admin';
import { CookiesProvider } from 'react-cookie';
import { controllers } from './common';
import News from './components/news/News';
import Contact from './components/Contact';
import Search from './components/search/Search';

import HeaderSmall from './components/layouts/HeaderSmall';
import HeaderBig from './components/layouts/HeaderBig';
import Copyright from './components/layouts/Copyright';
import Page from './components/pages/Page';
import Solutions from './components/solutions/Solutions';
import Projects from './components/projects/Projects';
import NotFound from './components/NotFound';
import Career from './components/career/Career';
import { getContact } from './controllers/contact';

export default function App() {
  const [q, setQ] = useState('');
  const [contact, setContact] = useState({
    Emails: '',
    Email: '',
    Phone: '',
    Hotline: '',
    Address_vi: '',
    Address_en: '',
  });

  useEffect(() => {
    getContact(setContact);
  }, []);

  return (
    <Suspense fallback="loading">
      <Router>
        <Switch>
          <Route path="/admin">
            <CookiesProvider>
              <Admin />
            </CookiesProvider>
          </Route>

          <Route path="/">
            <HeaderSmall q={q} setQ={setQ} />
            <div className="surrAll">
              <HeaderBig q={q} setQ={setQ} />
              <div className="placeholder"></div>
              {/* Route here */}
              <Search q={q} setQ={setQ} />
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/home">
                  <Page link={controllers.pages.home} />
                </Route>
                <Route path="/about">
                  <Page link={controllers.pages.about} />
                </Route>
                <Route path="/service">
                  <Page link={controllers.pages.service} />
                </Route>
                <Route path="/contact">
                  <Contact contact={contact} />
                </Route>
                <Route path="/solutions">
                  <Solutions />
                </Route>
                <Route path="/projects/:link">
                  <Projects usingLink={true} />
                </Route>
                <Route path="/projects">
                  <Projects />
                </Route>
                <Route path="/news">
                  <News />
                </Route>
                <Route path="/career">
                  <Career />
                </Route>
                <Route exact path="/">
                  <Page link={controllers.pages.home} />
                </Route>
                <Route path="/search" />
                <Route>
                  <NotFound />
                </Route>
              </Switch>

              {/* End Route */}

              <Footer contact={contact} />
              <Copyright contact={contact} />
            </div>
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}
