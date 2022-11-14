import React from 'react'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReposAsync } from './viewModel';

import './App.css';

import Sidebar from '../sidebar/Sidebar';
import Home from '../home/Home';

import logo from '../assets/images/logo/firstLetter.png'

const App = () => {
  const [homeActive, isHomeActive] = useState(true);
  const [aboutActive, isAboutActive] = useState(false);

  const allRepos = useSelector((state) => state.viewModel.allRepos);
  const dispatch = useDispatch();

  useEffect(() => {
    allRepos.forEach(repo => {
        dispatch(fetchReposAsync(repo));
    });
  // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className="App">
      <Sidebar />
      <div className="mainContent">
        <div className="container dark" style={{width: "90%"}}>
            <div className="logoContainer"><img src={logo} alt="N" />ITROLESS</div>
            <div className="homeButtons" onClick={(e) => {
                e.preventDefault();

                console.log(e.target.className.includes("aboutButton"));

                if (e.target.className.includes("homeButton")) {
                  isHomeActive(true);
                  isAboutActive(false);
                }

                if (e.target.className.includes("aboutButton")) {
                  isHomeActive(false);
                  isAboutActive(true);
                }

                if (e.target.className.includes("danger")) {
                  window.api.post("exit")
                }

            }}>
                <button className={`homeButton btn primary${ homeActive ? " active" : "" }`}>Home</button>
                <button className={`aboutButton btn primary${ aboutActive ? " active" : "" }`}>About</button>
                <button className="btn danger">Quit</button>
            </div>
        </div>
        <Home homeActive={homeActive} />
      </div>
    </div>
  )
}

export default App

