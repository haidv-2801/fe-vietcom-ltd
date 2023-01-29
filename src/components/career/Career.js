import React, { useEffect, useState } from 'react'
import JsxParser from 'react-jsx-parser'
import { Link, Route, Switch } from 'react-router-dom'
import useHelper, { controllers, DEFAULT_IMAGE, TITLE_PREFIX } from '../../common'
import $ from 'jquery'
// import NewsDetials from './NewsDetails'
import ShowMenu from '../layouts/ShowMenu'
import CareerDetails from './CareerDetails'
import WhiteSpace from '../layouts/WhiteSpace'
import { useTranslation } from 'react-i18next'

export default function Career({ link }) {
    const [items, setItems] = useState([])
    const { fetchData, displayDate, goToTop } = useHelper()
    const {t, i18n} = useTranslation('common')

    useEffect(() => {
        fetchData(controllers.client.career,
            res => { setItems(res) }
        )
    }, [])
    useEffect(() => {
        document.title = TITLE_PREFIX + t("career.title")

    }, [i18n.language])


    return (
        <Switch>
            <Route path="/career/:link">
                <CareerDetails/>
            </Route>
            <Route exact path="/career">
                <ShowMenu />
                <div className="contentSurr mt-5">
                    {
                        items.length === 0 ? (
                            <div className="csc-default layout-0 d-block my-many">
                                <WhiteSpace/>
                                <p className="py-5">{t("career.notRecuit")}</p>
                                <WhiteSpace/>
                            </div>

                        ) : (
                                <div className="container-fluid">
                                        {
                                            items.map(item => (
                                                <div key={item.ID}>
                                                    <div className="csc-default layout-0 d-block news-item px-4 mb-5 mt-0">
                                                        <h2 className="text-left w-100">{item.Title}</h2>
                                                        <div className="ce-textpic ce-center ce-below text-left">
                                                            <div className="ce-bodytext">
                                                                <JsxParser jsx={item.Description} />
                                                                {item.ShortDescription}
                                                                <small>{displayDate(item.Date)}</small>
                                                                <p className="align-center"><Link
                                                                    to={"/career/" + item.Link}
                                                                    title={t('button.findOutMore')} target="_self"
                                                                    className="internal-link btn-primary showMenu">{t("career.viewDetails")}</Link></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            ))
                                        }
                                </div>
                            )

                    }

                    <div className="wideInner"></div>
                </div>
            </Route>
        </Switch>


    )
}
           