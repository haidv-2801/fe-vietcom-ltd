import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import JsxParser from 'react-jsx-parser';
import { Link, Route, Switch } from 'react-router-dom';
import useHelper, { controllers } from '../../common'
import ShowMenu from '../layouts/ShowMenu';
import SolutionDetails from './SolutionDetails';

export default function Solutions() {
    const { fetchData, goToTop, getTitle} = useHelper();
    const {i18n, t} = useTranslation('common')
    const [solutions, setSolutions] = useState([])


    
    useEffect(() => { fetchData(controllers.client.solutions, setSolutions, getTitle("Solutions"), goToTop) }, [i18n.language])

    return (
        <Switch>
            <Route path="/solutions/:link">
                <SolutionDetails />
            </Route>
            <Route exact path="/solutions">
                <ShowMenu/>
                <div className="contentSurr">
                    <div className="csc-default layout-6">
                        <div className="wideInner">
                            <div className="ce-textpic ce-right ce-intext">
                                <div className="ce-bodytext container">
                                    <div className="row">
                                        {
                                            solutions.map(item => (
                                                <div key={item.ID} className="col-md-6 p-1 d-flex">
                                                    <div className="m-2 solution-card p-5 d-flex flex-column">
                                                        <h2>{item.Title}</h2>
                                                        <JsxParser jsx={item.Description} className="flex-grow-1" />
                                                        <p><Link to={"/solutions/" + item.Link} title={t('button.findOutMore')}
                                                            target="_self" className="internal-link btn-primary showMenu">{t('button.findOutMore')}</Link></p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wideInner"></div>
                </div>
            </Route>
        </Switch>

    )
}