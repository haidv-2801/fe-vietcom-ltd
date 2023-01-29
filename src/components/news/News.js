import React, { useEffect, useState } from 'react'
import JsxParser from 'react-jsx-parser'
import { Link, Route, Switch } from 'react-router-dom'
import useHelper, { controllers, DEFAULT_IMAGE, TITLE_PREFIX } from '../../common'
import $ from 'jquery'
import NewsDetials from './NewsDetails'
import ShowMenu from '../layouts/ShowMenu'
import { useTranslation } from 'react-i18next'
import WhiteSpace from '../layouts/WhiteSpace'

export default function News() {
    const [news, setNews] = useState([])
    const [page, setPage] = useState(1)
    const { fetchData, displayDate, goToTop } = useHelper()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const {t} = useTranslation('common')

    const getNews = (news) => {

        fetchData(controllers.client.newsPage + page,
            res => { setNews([...news, ...res.News]); setCurrentPage(res.currentPage); setTotalPages(res.totalPages) },
            undefined,
            () => {$('#view-more-news').css('display', 'block'); goToTop()},
            true
        )
    }

    useEffect(() => getNews(news), [page])

    useEffect(() => {
        document.title = TITLE_PREFIX + t("header.News")   
        getNews([])
    }, [useTranslation().i18n.language])

    return (
        <Switch>
            <Route path="/news/:link">
                <NewsDetials />
            </Route>
            <Route exact path="/news">
                <ShowMenu/>
                <div className="contentSurr">
                    <WhiteSpace/>
                    <div className="container-fluid bg-gray">
                        <div className="row pt-5">
                            {
                                news.map(item => (
                                    <div key={item.ID} className="col-md-6 col-xl-4">
                                        <div className="csc-default layout-0 d-block news-item px-4 mb-5 mt-0">
                                            <h2>{item.Title}</h2>
                                            <div className="ce-textpic ce-center ce-below text-left">
                                                <div className="ce-bodytext">
                                                    <JsxParser jsx={item.Description} />
                                                    <small>{displayDate(item.Date)}</small>
                                                    <p className="align-center"><Link
                                                        to={"/news/" + item.Link}
                                                        title={t("button.findOutMore")} target="_self"
                                                        className="internal-link btn-primary showMenu">{t("button.findOutMore")}</Link></p>
                                                </div>
                                                {
                                                    item.Image !== DEFAULT_IMAGE && (
                                                        <div className="ce-gallery" data-ce-columns="1" data-ce-images="1">
                                                            <div className="ce-outer">
                                                                <div className="ce-inner">
                                                                    <div className="ce-row">
                                                                        <div className="ce-column">
                                                                            <div className="ce-media">
                                                                                <img src={item.Image}
                                                                                    className="img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            {
                                (currentPage < totalPages) &&
                                <button className="btn-primary m-3 px-5" onClick={() => { setPage(page + 1); $('#view-more-news').css('display', 'none') }} id="view-more-news">{t("button.viewMore")}</button>
                            }
                        </div>
                    </div>
                    <div className="wideInner"></div>
                </div>
            </Route>
        </Switch>
    )
}