import React from 'react'
import './Sidebar.css';

import { useDispatch, useSelector } from 'react-redux';

import SidebarItem from './sidebarItem/SidebarItem';
import logo from '../assets/images/logo/index.png'

const Sidebar = () => {
  const dispatch = useDispatch();
  const allRepos = useSelector((state) => state.viewModel.allRepos);
  
  return (
    <div className="sidebar">
        <SidebarItem image={logo} title="Home" active={true} />
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
              return <SidebarItem icon="fa-solid fa-triangle-exclamation danger" title="Broken Repo" active={false} />
            } else {
              return (<SidebarItem image={repo.url + '/' + repo.data.icon} title={repo.data.name} active={false} />)
            }
          })
        }
        <div className="divider"></div>
        <SidebarItem icon="fa-solid fa-circle-plus" active={false} className="success" />
    </div>
  )
}

export default Sidebar