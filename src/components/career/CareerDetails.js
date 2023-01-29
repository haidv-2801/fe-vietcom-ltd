import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import JsxParser from 'react-jsx-parser'
import { useParams } from 'react-router-dom'
import useHelper, { controllers} from '../../common'
import LocationBar from '../layouts/LocationBar'
import NotFound from '../NotFound'

export default function CareerDetails() {
    const [item, setItem] = useState({})
    const { link } = useParams()
    const { fetchData, displayDate } = useHelper()
    useEffect(() => { fetchData(controllers.client.career + link, setItem) }, [])
    const {t} = useTranslation('common')
    if (item === null)

        return <NotFound />
    return (
        <div className="contentSurr">
            <LocationBar parentLink="/career" parentName={t("career.title")} childLink={item.Link} childName={item.Title} />
            <div className="csc-default layout-0 text-left d-block">
                <h2>{item.Title}</h2>
                <p><small className="d-block">{t("career.updateDate")}: {displayDate(item.Date)}</small></p>
                {
                    item.Description &&
                    <>
                        <h3>{t("career.description")}:</h3>
                        <JsxParser jsx={item.Description} />
                    </>
                }
                {
                    item.Requirements &&
                    <>
                        <h3>{t("career.requires")}:</h3>
                        {item.Requirements.split('\n').map((item, index) => <p key={index}>{item}</p>)}
                    </>
                }
                {
                    item.Welfare &&
                    <>
                        <h3>{t("career.welfare")} :</h3>
                        {item.Welfare.split('\n').map((item, index) => <p key={index}>{item}</p>)}
                    </>
                }
                {
                    item.ProfileIncludes &&
                    <>
                        <h3>{t("career.profileIncludes")}:</h3>
                        <JsxParser jsx={item.ProfileIncludes} />
                    </>
                }
                {
                    item.Contact &&
                    <>
                        <h3>{t("contact.title")}:</h3>
                        <JsxParser jsx={item.Contact} />
                    </>
                }

            </div>
        </div>
    )
}