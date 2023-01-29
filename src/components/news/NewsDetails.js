import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import JsxParser from 'react-jsx-parser'
import { useParams } from 'react-router-dom'
import useHelper, { controllers } from '../../common'
import LocationBar from '../layouts/LocationBar'
import NotFound from '../NotFound'

export default function NewsDetials() {
    const [news, setNews] = useState({})
    const {link} = useParams()
    const {fetchData, displayDate} = useHelper()
    const {t} = useTranslation('common')
    useEffect(() => {fetchData(controllers.client.news + link, setNews)}, [useTranslation().i18n.language])
    if (!news)
        return <NotFound/>
    return (
        <div className="contentSurr">
            <LocationBar parentLink="/news" parentName={t("header.News")} childLink={news.Link} childName={news.Title}/>
            <div className="csc-default layout-0 text-left d-block">
                <h2>{news.Title}</h2>
                <small className="d-block">{displayDate(news.Date)}</small>
                <JsxParser jsx={news.Article}/>
            </div>
        </div>
    )
}