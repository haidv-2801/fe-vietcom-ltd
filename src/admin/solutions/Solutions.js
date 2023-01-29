import { MDBDataTableV5 } from 'mdbreact';
import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
import useHelper, { controllers } from '../../common';
import Delete from '../modal/Delete';


export default function Solutions() {
    const [items, setItems] = useState([]);
    const controller = controllers.solutions;

    const [deleteLink, setDeleteLink] = useState('')
    const {fetchDataAdmin} = useHelper();
    useEffect(() => {
        fetchDataAdmin(controller, setItems)
    }, [])

    const data = {
        columns: [
            {
                label: 'ID',
                field: 'id'
            },
            {
                label: 'Priority',
                field: 'show'
            },
            {
                label: 'Title',
                field: 'title',
            },
            {
                label: 'Language',
                field: 'lang',
            },
            {
                label: 'Actions',
                field: 'actions',
            }
        ],
        rows: items.map(item => ({
            id: item.ID,
            show: item.Show > 0 ? item.Show : <i className="fas fa-eye-slash"></i>,
            title: item.Title,
            lang: item.Lang,
            actions: <><Link
                className="btn btn-warning btn-circle btn-sm m-1"
                to={"/admin/solutions/edit/" + item.ID}
            >
                <i className="fas fa-pencil-alt"></i>
            </Link>

                <button
                    href="#"
                    data-toggle="modal"
                    data-target="#deleteModal"
                    className="btn btn-danger btn-circle btn-sm m-1"
                    onClick={() => setDeleteLink(controller + item.ID)}
                >
                    <i className="fas fa-trash"></i>
                </button></>
        })

        ),
    };
    return (
        <>
            <div className="container-fluid">
                <h1 className="h3 mb-2 text-gray-800">Solution</h1>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <Link
                            type="button"
                            className="btn btn-success"
                            to="/admin/solutions/new"
                        >
                            <span className="icon text-white-50">
                                <i className="fas fa-plus"></i>
                            </span>
                            <span className="text">Add</span>
                        </Link>
                    </div>
                    <MDBDataTableV5
                        hover
                        entriesOptions={[10, 25, 50]}
                        entries={10}
                        pagesAmount={4}
                        data={data}
                        pagingTop
                        searchTop
                        searchBottom={false}
                    />
                </div>
            </div>
            <Delete link={deleteLink} reload={() => fetchDataAdmin(controller, setItems)} />
        </>
    )
}