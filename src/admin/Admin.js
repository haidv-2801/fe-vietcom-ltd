import React, { useEffect, useReducer, useState } from 'react'
import Footer from "./Footer"
import SlideBar from "./SliderBar"
import Topbar from './Topbar'
import Logout from './modal/Logout'
import { Redirect, Route, Router, Switch, useHistory, useLocation, useParams } from 'react-router-dom'
import { decode } from 'js-base64';
import { controllers } from '../common'
import File from './pages/File'
import { useCookies } from 'react-cookie'
import News from './news/News'
import Preferences from './pages/Preferences'
import useHelper from '../common'
import Page from './pages/Page'
import Solutions from './solutions/Solutions'
import Projects from './projects/Projects'
import SolutionCreate from './solutions/SolutionCreate'
import SolutionUpdate from './solutions/SolutionUpdate'
import ProjectCreate from './projects/ProjectCreate'
import ProjectUpdate from './projects/ProjectUpdate'
import NewsCreate from './news/NewsCreate'
import NewsUpdate from './news/NewsUpdate'
import CareerCreate from './career/CareerCreate'
import CareerUpdate from './career/CareerUpdate'
import Career from './career/Career'
import Links from './pages/Links'

export default function Admin() {

    const [toggled, setToggled] = useState('')
    const [username, setUsername] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['jwt'])
    const {errorHandler} = useHelper()

    const handleChange = (event, setFunction) => {
        const { name, value } = event.target
        setFunction({ [name]: value })
    }

    async function getData(controller, setData) {
        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
        };
        fetch(controller, requestOptions)
            .then(res => {

                if (res.status === 200)
                    return res.json()
                errorHandler(res)
            })
            .then(res => setData(res))
            .catch(error => console.error(error.message));
    }


    const history = useHistory()
    function checkJWTandGetUsername() {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) {
            return false
        }
        const jwtArr = jwt.split('.')
        if (jwtArr.length !== 3)
            return false
        try {

            const user = JSON.parse(decode(jwtArr[1]))
            if (!user.unique_name)
                return false
            setUsername(user.unique_name)
            return true
        }
        catch {
            return false
        }
    }

    useEffect(function () {
        const script = document.createElement("script");
        script.innerHTML = `
        function selectFileWithCKFinder( input, image ) {
          CKFinder.popup( {
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function( finder ) {
              finder.on( 'files:choose', function( evt ) {
                var file = evt.data.files.first();
                var output = document.getElementById( input );
                output.innerHTML = file.getUrl();
                document.getElementById(image).src = file.getUrl();
              } );
        
              finder.on( 'file:choose:resizedImage', function( evt ) {
                var output = document.getElementById( input );
                output.innerHTML = evt.data.resizedUrl;
                document.getElementById(image).src = evt.data.resizedUrl;
              } );
            }
          } );
        }`;
    
        script.async = true;
        document.body.appendChild(script);

        if (!checkJWTandGetUsername()) {
            history.push('/login')
        }
        else {
            const jwt = localStorage.getItem('jwt')

            setCookie('jwt', jwt, { path: '/ckfinder/connector' })
        }
        return () => { removeCookie('jwt', { path: '/ckfinder/connector' }) }
    }, [])

    return (
        <>

            <div id="wrapper">
                <Switch>
                    <Route path="/admin">
                        <SlideBar toggled={toggled} setToggled={setToggled} />
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <Topbar toggled={toggled} setToggled={setToggled} username={username} />
                                <Switch>
                                    <Route path="/admin/files">
                                        <File />
                                    </Route>
                                    <Route path="/admin/home">
                                        <Page link={controllers.pages.home} handleChange={handleChange}/>
                                    </Route>
                                    <Route path="/admin/about">
                                        <Page link={controllers.pages.about} handleChange={handleChange}/>
                                    </Route>
                                    <Route path="/admin/service">
                                        <Page link={controllers.pages.service} handleChange={handleChange}/>
                                    </Route>

                                    {/* Solution */}

                                    <Route path="/admin/solutions/new">
                                        <SolutionCreate/>
                                    </Route>
                                    <Route path="/admin/solutions/edit/:id">
                                        <SolutionUpdate/>
                                    </Route>
                                    <Route path="/admin/solutions">
                                        <Solutions/>
                                    </Route>

                                    {/* Projects */}

                                    <Route path="/admin/projects/new">
                                        <ProjectCreate/>
                                    </Route>
                                    <Route path="/admin/projects/edit/:id">
                                        <ProjectUpdate/>
                                    </Route>
                                    <Route path="/admin/projects">
                                        <Projects/>
                                    </Route>

                                    {/* News */}

                                    <Route path="/admin/news/new">
                                        <NewsCreate/>
                                    </Route>
                                    <Route path="/admin/news/edit/:id">
                                        <NewsUpdate/>
                                    </Route>
                                    <Route path="/admin/news">
                                        <News/>
                                    </Route>
                                    {/* Career */}

                                    <Route path="/admin/career/new">
                                        <CareerCreate/>
                                    </Route>
                                    <Route path="/admin/career/edit/:id">
                                        <CareerUpdate/>
                                    </Route>
                                    <Route path="/admin/career">
                                        <Career/>
                                    </Route>
                                    <Route path="/admin/links">
                                        <Links/>
                                    </Route>
                                    <Route path="/admin/preferences">
                                        <Preferences />
                                    </Route>
                                </Switch>

                            </div>
                            <Footer />
                        </div>
                    </Route>
                    {/* <Route path="/admin">
                        <Redirect to="/admin/home?lang=en" />
                    </Route> */}
                </Switch>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
            <Logout />


        </>
    )
}
