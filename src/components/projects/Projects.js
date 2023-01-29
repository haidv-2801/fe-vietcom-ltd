import React, { useEffect, useState } from 'react'
import JsxParser from 'react-jsx-parser'
import { useLocation, useParams } from 'react-router-dom'
import useHelper, { controllers } from '../../common'
import LocationBar from '../layouts/LocationBar'
import $ from 'jquery'
import AllProjects from './AllProjects'
import NotFound from '../NotFound'
import { useTranslation } from 'react-i18next'

export default function Projects({usingLink}) {
    // if project === null ==> 404
    const [projectsPage, setProjectsPage] = useState({Title: '', Link: ''})
    const {link} = useParams()
    const {i18n, t} = useTranslation()
    function showCarouselControls() {
        $('.carousel-control-prev').html(`<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>`)
        $('.carousel-control-next').html(`<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>`)
    }
    var controller = controllers.client.projects + (usingLink ? link : '1')

    const {fetchData} = useHelper()
    useEffect(() => {fetchData(controller, setProjectsPage, undefined, showCarouselControls)}, [i18n.language, useLocation().pathname])
    if (projectsPage === null)
        return <NotFound/>
    return (
        <div className="contentSurr">
            <LocationBar parentName={t("header.Projects")} parentLink="/projects" childName={projectsPage.Title} childLink={projectsPage.Link}/>
            <JsxParser jsx={projectsPage.Article}/>
            <AllProjects activeLink={projectsPage.Link}/>
        </div>
    )
}