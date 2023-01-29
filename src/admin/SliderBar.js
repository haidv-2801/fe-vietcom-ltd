import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
export default function SlideBar({toggled, setToggled}) {
    
    const location = useLocation()
    const path = location.pathname.split('/')[2];
    useEffect(() => {
      const query = new URLSearchParams(location.search)
      const lang = query.get('lang')
      if (path) {
        $(`#${path}`).addClass('active')
        $(".nav-item .nav-link").on("click", function(){
          $(".nav-item, .collapse-item").removeClass("active");
          $(this).parent().addClass("active");
       });
      }

     if (lang) {
      $(`#${path} .${lang}`).addClass('active')
      $(".collapse-item").on("click", function(){
        $(".collapse-item").removeClass("active");
        $(this).addClass("active");
     });
     }

    }, [path, location.search])

    return (
      <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggled}`} id="accordionSidebar">

      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-text mx-3">VietCom</div>
      </Link>

      <hr className="sidebar-divider my-0"/>

      <li className="nav-item" id="home">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseHome" aria-expanded="true" aria-controls="collapseHome">
        <i className="fas fa-fw fa-home"></i>
          <span>Home</span>
        </a>
        <div id="collapseHome" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Please choose:</h6>
            <Link className="collapse-item en" to="/admin/home?lang=en">English</Link>
            <Link className="collapse-item vi" to="/admin/home?lang=vi">Vietnamese</Link>
          </div>
        </div>
      </li>

      <hr className="sidebar-divider my-0"/>

      <li className="nav-item" id="about">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAbout" aria-expanded="true" aria-controls="collapseAbout">
          <i className="fas fa-fw fa-info-circle"></i>
          <span>About</span>
        </a>
        <div id="collapseAbout" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Please choose:</h6>
            <Link className="collapse-item en" to="/admin/about?lang=en">English</Link>
            <Link className="collapse-item vi" to="/admin/about?lang=vi">Vietnamese</Link>
          </div>
        </div>
      </li>
      <hr className="sidebar-divider my-0"/>

      <li className="nav-item" id="service">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseService" aria-expanded="true" aria-controls="collapseService">
        <i className="fas fa-fw fa-headset"></i>
        <span>Service</span>
        </a>
        <div id="collapseService" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Please choose:</h6>
            <Link className="collapse-item en" to="/admin/service?lang=en">English</Link>
            <Link className="collapse-item vi" to="/admin/service?lang=vi">Vietnamese</Link>
          </div>
        </div>
      </li>
      <hr className="sidebar-divider my-0"/>

      <li className="nav-item" id="solutions">
      <Link to="/admin/solutions" className="nav-link">
      <i className="fas fa-fw fa-house-user"></i>
          <span>Solutions</span>
        </Link>
      </li>
      <hr className="sidebar-divider my-0"/>
      <li className="nav-item" id="projects">
      <Link to="/admin/projects" className="nav-link">
      <i className="fas fa-fw fa-project-diagram"></i>
          <span>Projects</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0"/>
      <li className="nav-item" id="news">
      <Link to="/admin/news" className="nav-link">
      <i className="fas fa-fw fa-newspaper"></i>
          <span>News</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0"/>
      <li className="nav-item" id="career">
      <Link to="/admin/career" className="nav-link">
      <i className="fas fa-fw fa-suitcase"></i>
          <span>Career</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0"/>
      <li className="nav-item" id="links">
      <Link to="/admin/links" className="nav-link">
      <i className="fas fa-fw fa-link"></i>
          <span>Links</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0"/>
      <li className="nav-item" id="files">
      <Link to="/admin/files" className="nav-link">
      <i className="fas fa-fw fa-folder-open"></i>
          <span>Files</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0"/>
      <li className="nav-item" id="preferences">
      <Link to="/admin/preferences" className="nav-link">
      <i className="fas fa-fw fa-wrench"></i>
          <span>Preferences</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block"/>

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => setToggled( toggled === '' ? 'toggled' : '')}></button>
      </div>

    </ul>
    )
}