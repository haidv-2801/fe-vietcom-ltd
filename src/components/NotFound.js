import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TITLE_PREFIX } from '../common';

export default function NotFound() {
    const {t} = useTranslation('common')
    document.title = TITLE_PREFIX + t('error404.title')
    return (  
    <div className="page-wrap d-flex flex-row align-items-center feature_area section_gap_top">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-12 text-center">
                <span className="display-1 d-block">404</span>
                <div className="mb-4 lead">{t('error404.notFound')}</div>
                <Link to="/">{t('error404.backHome')}</Link>
            </div>
        </div>
    </div>
</div>
    )
}