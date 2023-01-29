import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function LocationBar({ parentName, parentLink, childName, childLink }) {
    const {t} = useTranslation('common')
    return (
        <div className="wideInner">
            <div className="breadcrumb"><span className="smartBreak">{t("locationBar.youHere")}:&nbsp;</span><Link
                to={parentLink}>{parentName}</Link>&nbsp;&gt;&nbsp;<Link to={parentLink + "/" + childLink}
                    className="selected">{childName}</Link>
            </div>
        </div>
    )
}