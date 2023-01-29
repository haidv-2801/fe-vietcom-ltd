import React, { useEffect, useReducer, useState} from "react";
import useHelper, { controllers, DEFAULT_IMAGE } from "../../common";
import { MDBDataTableV5 } from 'mdbreact';
import Delete from '../modal/Delete';
import { Link } from "react-router-dom";
export default function News() {

  const [items, setItems] = useState([]);
  const controller = controllers.news;
  const [isEditting, setIsEditting] = useState(false);
  const emptyItem = {
    Title: '',
    Image: DEFAULT_IMAGE,
    Show: 1,
    Description: '',
    Article: '',
    Date: new Date().now,
    Link: ''
  }
  
  const {fetchDataAdmin} = useHelper();
  const [editing, setEditing] = useReducer((state, newState) => ({ ...state, ...newState }), emptyItem)
  const [deleteLink, setDeleteLink] = useState('')
  useEffect(function() {
    fetchDataAdmin(controller, setItems)
  }, [])
    const data = {
        columns: [
            {
                label: 'Priority',
                field: 'show'
            },
            {
                label: 'Image',
                field: 'image',
            },
            {
                label: 'Title',
                field: 'title',
            },
            {
                label: 'Date',
                field: 'date',
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
        rows: items.map( item => ({
            show: item.Show > 0 ? item.Show : <i className="fas fa-eye-slash"></i>,
            image: <img src={item.Image} alt={item.Image} width="100"/>,
            title: item.Title,
            lang: item.Lang,
            date: item.Date.split('T')[0],
            actions: <><Link
            className="btn btn-warning btn-circle btn-sm m-1"
            to={"/admin/news/edit/" + item.ID}
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
      <h1 className="h3 mb-2 text-gray-800">News</h1>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
        <Link
                            type="button"
                            className="btn btn-success"
                            to="/admin/news/new"
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
  );
}
