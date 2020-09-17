import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {AuthProvider} from './components/util/AuthContext'
import ThemeProvider from "./theme/ThemeProvider";
import Header from "./components/Header/Header";
import Drawer from "./components/SideBar/SideBar";
import BoardPage from "./components/Pages/BoardPage";
import Board from "./components/Pages/Board";
import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";

function App() {
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(useMediaQuery("(prefers-color-scheme: dark)"));
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [isOpen, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!isOpen);
  return (
    <ThemeProvider darkMode={darkMode}>
      <AuthProvider>
        <Header toggleMenu={toggleDrawer} handleChange={toggleDarkMode} />
        <Drawer isOpen={isOpen} handleChange={toggleDrawer} />
        <div
          style={{
            overflowX: "hidden",
            maxWidth: "100vw",
            minWidth: "100vw",
          }}
          >
          <Switch location={location} key={location.key}>
            <Route path="/board/:category/:task">
              <Board />
            </Route>
            <Route path="/board">
              <BoardPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
