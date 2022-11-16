import React from 'react'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReposAsync, removeRepository } from './viewModel';

import './App.css';

import Sidebar from '../sidebar/Sidebar';
import Home from '../home/Home';

import logo from '../assets/images/logo/firstLetter.png'
import Repo from '../repo/Repo';
import ContextMenu from '../contextMenu/ContextMenu';

const App = () => {
  const [homeActive, isHomeActive] = useState(true);
  const [aboutActive, isAboutActive] = useState(false);

  const allRepos = useSelector((state) => state.viewModel.allRepos);
  const selectedRepo = useSelector((state) => state.viewModel.selectedRepo);
  const copied = useSelector((state) => state.viewModel.copied);

  const dispatch = useDispatch();

  useEffect(() => {
    allRepos.forEach(repo => {
        dispatch(fetchReposAsync(repo));
    });
  // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className="App">
      <div className={`copied${copied ? " active" : ""}`}>Copied</div>
      <ContextMenu />
      <Sidebar />
      <div className="mainContent">
        <div className="container dark" style={{width: "90%"}}>
            <div className="logoContainer"><img src={logo} alt="N" />ITROLESS</div>
            {
              selectedRepo.active
              ?
              (
                <div className="repoButtons">
                  <button className="shareButton btn primary">Share</button>
                  <button className="removeButton btn danger" onClick={(e) => {
                    e.preventDefault();
                    console.log("Clicked")
                    dispatch(removeRepository({ url: selectedRepo.url }))
                  }}>Remove Repo</button>
                </div>
              )
              :
              (
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
              )
            }
        </div>
        {
          selectedRepo.active
          ?
          <Repo />
          :
          <Home homeActive={homeActive} />
        }
      </div>
    </div>
  )
}

export default App

