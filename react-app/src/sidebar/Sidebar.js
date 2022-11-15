import React from 'react'
import './Sidebar.css';

import { useDispatch, useSelector } from 'react-redux';
import { deselectRepository, setActiveRepository } from '../app/viewModel';

import SidebarItem from './sidebarItem/SidebarItem';
import logo from '../assets/images/logo/index.png'

const Sidebar = () => {
  const dispatch = useDispatch();
  const allRepos = useSelector((state) => state.viewModel.allRepos);
  const selectedRepo = useSelector((state) => state.viewModel.selectedRepo);
  
  return (
    <div className="sidebar">
        <SidebarItem image={logo} title="Home" active={ !selectedRepo.active } onClick={(e) => {
          e.preventDefault();
          dispatch(deselectRepository());
        }} />
        {
          allRepos.length > 0 
          ?
          (<div className="divider"></div>)
          :
          ""
        }
        {
          allRepos.map((repo) => {
            if (typeof repo === 'string' || repo instanceof String) {
              return <SidebarItem id={repo} icon="fa-solid fa-triangle-exclamation danger" title="Broken Repo" active={ false } />
            } else {
              return (<SidebarItem id={repo.url} image={repo.url + '/' + repo.data.icon} title={repo.data.name} active={ selectedRepo.active && selectedRepo.url === repo.url } onClick={(e) => {
                e.preventDefault();
                dispatch(setActiveRepository({ url: repo.url, data: repo.data }));
              }} />)
            }
          })
        }
        <div className="divider"></div>
        <SidebarItem icon="fa-solid fa-circle-plus" active={false} className="success" onClick={(e) => {
          e.preventDefault();
          window.api.post("addRepo");
        }} />
    </div>
  )
}

export default Sidebar