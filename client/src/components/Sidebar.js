import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__element">
                 <h3>Settings</h3>
            </div>
            <div className="sidebar__element">
                <Link to='/updateName'>Change Name</Link>
            </div>
            <div className="sidebar__element">
                <Link to="/changePassword">Change Password</Link>
            </div>
            
        </div>
    )
}

export default Sidebar
