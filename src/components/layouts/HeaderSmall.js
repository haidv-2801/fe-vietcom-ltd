import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from 'react-router-dom';
import $ from 'jquery'
import url from 'url'
import useHelper from '../../common';




export default function HeaderSmall({q, setQ}) {
    require('../../client.css') // Only for client
    const {searchSubmit } = useHelper()
    function closeMenu() {
        $('.smartNaviSurr').css('display', 'none')
    }
    const {t, i18n} = useTranslation('common');
    return (
        <div className="smartNaviSurr">
            <a href="#" className="close">X</a>
            <Link id="smartLogo" to="/" onClick={closeMenu}>&nbsp;</Link>
            <div className="smartNaviInner">
                <div className="overScroll">
                    <ul className="smartNavi">
                        <li className="item-home"><Link to="/" title={t("header.Home")} onClick={closeMenu}><span
                            className="blueSpan">//</span>&nbsp;{t("header.Home")}</Link></li>
                        <li className="item-about"><Link to="/about" title={t("header.about")} onClick={closeMenu}><span
                            className="blueSpan">//</span>&nbsp;{t("header.about")}</Link>
                        </li>
                        <li className="item-solutions"><Link to="/solutions" title={t("header.Solutions")} onClick={closeMenu}><span
                            className="blueSpan">//</span>&nbsp;{t("header.Solutions")}</Link>
                        </li>
                        <li className="item-projects"><Link to="/projects" title={t("header.Projects")} onClick={closeMenu}>
                            <span className="blueSpan">//</span>&nbsp;{t("header.Projects")}</Link>
                        </li>
                        <li className="item-news"><Link to="/news" title={t("header.News")} onClick={closeMenu}><span
                            className="blueSpan">//</span>&nbsp;{t("header.News")}</Link>
                        </li>
                        <li className="item-service"><Link to="/service" title={t("header.Service")} onClick={closeMenu}><span
                            className="blueSpan">//</span>&nbsp;{t("header.Service")}</Link>
                        </li>
                        <li className="item-career"><Link to="/career" title={t("header.Career")} onClick={closeMenu}><span
                            className="blueSpan">//</span>&nbsp;{t("header.Career")}</Link>
                        </li>
                        <li className="item-contact"><Link to="/contact" title={t("contact.title")} onClick={closeMenu}><span
                            className="blueSpan">//</span>&nbsp;{t("contact.title")}</Link>
                        </li>
                    </ul>
                    <div className="full-center">
                        <form id="langNavi" onSubmit={e => {searchSubmit(e, q); closeMenu()}}>
                            <input type="search" placeholder={t("header.searchFor")} className="tx-indexedsearch-searchbox-sword sword search"  value={q} onChange={e => setQ(e.target.value)}/>
                            <input type="submit" id="suche" value="" className="d-inline"/>
                        </form>
                    </div>
                    <div className="full-center language-span-small">

                    <span className={!i18n.language.includes('vi') ? "active" : ''} onClick={() => i18n.changeLanguage('en')}>En</span>/
                        <span className={i18n.language.includes('vi') ? "active" : ''} onClick={() => i18n.changeLanguage('vi')}>Vi</span>
                    </div>

                </div>
            </div>
        </div>
    )
}