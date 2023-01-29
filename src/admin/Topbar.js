import React from 'react'

export default function Topbar({toggled, setToggled, username}) {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

        <form className="form-inline">
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={() => setToggled( toggled === '' ? 'toggled' : '')}>
            <i className="fa fa-bars"></i>
          </button>
        </form>
  
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <span>
            <span id="userDropdown" role="button" >
          <span className="mr-2 d-none d-lg-inline text-gray-600">{username}</span>
            </span>
  
            <a href="#" data-toggle="modal" data-target="#logoutModal">
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </span>
          </li>
  
        </ul>
  
      </nav>
    )
}