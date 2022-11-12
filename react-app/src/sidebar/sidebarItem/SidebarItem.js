import React from 'react'
import './SidebarItem.css'

const SidebarItem = ({
    icon,
    image,
    title,
    active,
    className
}) => {
  return (
    <div className={`sidebar-item${active ? " active" : ""}${className ? " "+className : ""}`}>
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