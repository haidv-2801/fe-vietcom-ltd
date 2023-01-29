import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import JsxParser from 'react-jsx-parser'
import { useParams } from 'react-router-dom'
import useHelper, { controllers } from '../../common'
import LocationBar from '../layouts/LocationBar'
import NotFound from '../NotFound'

export default function SolutionDetails() {
    const [solution, setSolution] = useState({})
    const {link} = useParams()
    const {fetchData} = useHelper()
    const [t, i18n] = useTranslation('common')
    useEffect(() => {fetchData(controllers.client.solutions + link, setSolution)}, [i18n.language])
    if (solution === null)
    return <NotFound/>
    return (
        <div className="contentSurr">
            <LocationBar parentLink="/solutions" parentName={t('header.Solutions')} childLink={solution.Link} childName={solution.Title}/>
            <JsxParser jsx={solution.Article}/>
        </div>
    )
}