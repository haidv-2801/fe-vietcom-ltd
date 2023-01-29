import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from 'react-router-dom';
import $ from 'jquery'
import url from 'url'
import useHelper from '../../common';
import Scrollspy from 'react-scrollspy'
var timeoutSearch


export default function HeaderBig({q, setQ}) {
    const {searchSubmit, selectedMenuItem} = useHelper()
    const location = useLocation();
    useEffect(selectedMenuItem, [location.pathname])
    
    const [t, i18n] = useTranslation('common');


    return (
        <div className="header">
        <div className="wideInner">
            <Link id="logo" to="/">&nbsp;</Link>
            <form className="langSearchSurr" onSubmit={e => searchSubmit(e, q)}>
                <div id="langNavi">
                    <input type="search" placeholder={t("header.searchFor")} className="tx-indexedsearch-searchbox-sword sword search" value={q} onChange={e => setQ(e.target.value)}/>
                    </div><input type="submit" id="suche" value=""/>
                    <span className="language-span">
                        <span className={!i18n.language.includes('vi') ? "active" : ''} onClick={() => i18n.changeLanguage('en')}>En</span>/
                        <span className={i18n.language.includes('vi') ? "active" : ''} onClick={() => i18n.changeLanguage('vi')}>Vi</span></span>
                    <div>
                
            </div>
            </form>
           
            <ul id="mainNavi">
                <li className="item-about"><span className="blueSpan">//</span><Link to="/about" title={t("header.about")}>{t("header.about")}</Link></li>
                <li className="item-solutions"><span className="blueSpan">//</span><Link to="/solutions" title={t("header.Solutions")}>{t("header.Solutions")}</Link></li>
                <li className="item-projects"><span className="blueSpan">//</span><Link to="/projects" title={t("header.Projects")}>{t("header.Projects")}</Link></li>
                <li className="item-news"><span className="blueSpan">//</span><Link to="/news" title={t("header.News")}>{t("header.News")}</Link></li>
                <li className="item-service"><span className="blueSpan">//</span><Link to="/service" title={t("header.Service")}>{t("header.Service")}</Link></li>
                <li className="item-career"><span className="blueSpan">//</span><Link to="/career" title={t("header.Career")}>{t("header.Career")}</Link></li>
                <li className="item-contact"><span className="blueSpan">//</span><Link to="/contact" title={t("contact.title")}>{t("contact.title")}</Link></li>
            </ul>

            <a href="#" className="smartNaviButton"></a>
        </div>
    </div>
    )
}