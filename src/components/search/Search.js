import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import JsxParser from 'react-jsx-parser'
import { Link, Route, useLocation } from 'react-router-dom'
import useHelper, { controllers } from '../../common'
import ShowMenu from '../layouts/ShowMenu'
export default function Search({q, setQ}) {
    const location = useLocation()
    const [result, setResult] = useState({ Pages: [], News: [], Projects: [], Solutions: [] })
    const [searched, setSearched] = useState(false)
    const {t, i18n} = useTranslation('common')
    useEffect(() => {
        if (!location.pathname.startsWith("/search"))
            setSearched(false)
        setQ(decodeURI(location.search.replace("?q=", '')))
        if (q === "" || !location.pathname.startsWith("/search") || searched)
            return
        search()
    }, [location.search, i18n.language])

    function search() {
        fetchData(controllers.search + q, setResult, t("header.searchFor") + ": " + q, () => setSearched(true))
    }

    function totalResult() {
        const all = result.News.length + result.Pages.length + result.Projects.length + result.Solutions.length
        const totalText = getOneOrMany(all, t("search.result")) + (all === 0 ? "." :": ")

        const categories = []
        if (result.Pages.length > 0)
            categories.push(getOneOrMany(result.Pages.length, t("search.page")))

        if (result.Solutions.length > 0)
            categories.push(getOneOrMany(result.Solutions.length, t("search.solution")))

        if (result.Projects.length > 0)
            categories.push(getOneOrMany(result.Projects.length, t("search.project")))

        if (result.News.length > 0)
            categories.push(getOneOrMany(result.News.length, t("search.news"), false))
        var joinedResult = categories.join(", ")
        return totalText + joinedResult
    }
    // 1 result(s): 1 page(s), 2 solution(s), 3 projects and 4 news
    function getOneOrMany(number, text, countable = true) { 
        return number + " " + getNoun(number, text, countable)
    }

    function getNoun(number, text, countable = true) {
        return (number > 1) ? text + (countable && i18n.language === 'en' ? "s" : "") : text
    }

    const { searchSubmit, fetchData } = useHelper()

    const renderResult = (item) => (
        <div className="tx-indexedsearch-res" key={item.ID ? item.ID : item.Link}>
            <div className="tx-indexedsearch-res">
                <table cellPadding="0" cellSpacing="0" border="0" summary="Result row">
                    <tbody>
                        <tr>
                            <td className="tx-indexedsearch-result-number result-number" nowrap="nowrap">
                                &nbsp;</td>
                            <td className="tx-indexedsearch-title title" width="100%"><Link className="showMenu"
                                to={item.Link}>{item.Title}</Link></td>
                            <td className="tx-indexedsearch-percent percent" nowrap="nowrap"></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td className="tx-indexedsearch-descr descr" width="100%" colSpan="3"><JsxParser jsx={item.Content}/></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td className="tx-indexedsearch-info info" width="100%" colSpan="3"><br />
                            {t('search.path')}: <span className="tx-indexedsearch-path path">{item.Path}</span></td>
                        </tr>
                    </tbody>
                </table>
                <br />
            </div>
        </div>
    )
    
    const RenderResutGroup = ({data, groupTitle, countable=true}) => (
            data.length > 0 ?
            <>
                <b className="text-capitalize">{getNoun(data.length, groupTitle, countable)}</b>
                {
                    data.map(renderResult)
                }
            </>
            : null
    )

    return (
        <Route path="/search">
            <div className="contentSurr">
            <ShowMenu toTop={false} displayMenu={true}/>
            <div className="csc-default layout-0 d-block">
                <div id="c1028">
                    <div className="tx-indexedsearch text-left">
                        <div className="tx-indexedsearch-searchbox">
                            <form onSubmit={e => {searchSubmit(e, q); if (searched) search()}}>
                                <div className="row">
                                    <div className="col-sm-2 mw-search">
                                        {t('header.searchFor')}:
                                </div>
                                    <div className="col-sm-8">
                                        <input type="search" name="tx_indexedsearch[sword]"
                                            value={decodeURI(q)}
                                            className="sword form-control" onChange={e => {setQ(e.target.value); setSearched(false)}} />
                                    </div>
                                    <div className="col-sm-2">
                                        <input type="submit" name="tx_indexedsearch[submit_button]"
                                            value="Search" className="submit btn-primary m-sm-0 my-1 p-2 py-xl-1 px-3" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        {
                            location.search.replace("?q=", '') && (
                                <>
                                    <div className="tx-indexedsearch-whatis">{t('header.searchFor')} "{decodeURI(location.search.replace("?q=", ''))}"</div>
                                    <div className="tx-indexedsearch-browsebox">
                                        <p>{totalResult()}</p>
                                    </div>
                                    
                                    <RenderResutGroup data={result.Pages} groupTitle={t("search.page")}/>
                                    <RenderResutGroup data={result.Solutions} groupTitle={t("search.solution")}/>
                                    <RenderResutGroup data={result.Projects} groupTitle={t("search.project")}/>
                                    <RenderResutGroup data={result.News} groupTitle={t("search.news")} countable={false}/>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="wideInner"></div>
        </div>
        </Route>
    )
}

