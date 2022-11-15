import React from 'react'
import './SidebarItem.css'

const SidebarItem = ({
  id,
  icon,
  image,
  title,
  active,
  className,
  onClick
}) => {
  return (
    <div key={id} className={`sidebar-item${active ? " active" : ""}${className ? " "+className : ""}`} onClick={onClick}>
        <div className="active-indicator"></div>
        <div className="sidebar-icon">
            {
                icon !== undefined && icon !== null
                ?
                (<i className={icon}></i>)
                :
                (<img src={image} alt={title} />)
            }
        </div>
    </div>
  )
}

export default SidebarItem