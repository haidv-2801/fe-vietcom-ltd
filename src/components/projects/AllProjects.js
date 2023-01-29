import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useHelper, { controllers } from '../../common'

export default function AllProjects({activeLink}) {
    const [allProjects, setAllProjects] = useState([])
    const { fetchData, goToTop } = useHelper()
    const {i18n} = useTranslation()
    useEffect(() => { fetchData(controllers.client.projects, setAllProjects, undefined, goToTop) }, [i18n.language])
    return (
        <div className="container-fluid mb-4">
            <div className="list-group col-md-6 col-lg-6 col-xl-4 rounded-0">
                {
                    allProjects.map(item => <Link key={item.Link} to={"/projects/" + item.Link} className={"list-group-item list-group-item-action showMenu" + (activeLink === item.Link ? ' active' : '')}>
                        {item.Title}
                    </Link>)
                }
            </div>
        </div>

    )
}