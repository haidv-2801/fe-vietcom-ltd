import CKEditor from 'ckeditor4-react';
import React, { useEffect, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom';
import useHelper, { controllers, DEFAULT_IMAGE } from '../../common';
import InputLink from '../components/InputLink';
CKEditor.editorUrl = "/ckeditor/ckeditor.js";

export default function CareerUpdate() {
  const emptyItem = {
    Title: '',
    Description: '',
    Requirements: '',
    Welfare: '',
    ProfileIncludes: '',
    Contact: '',
    Date: "",
    Show: true,
    Link: "",
    Lang: "en"
  }

  const { id } = useParams()
  const [editing, setEditing] = useReducer((state, newState) => ({ ...state, ...newState }), emptyItem)
  const { put, handleChange, fetchDataAdmin, setTimeoutCkeditor200, setupCkfinder } = useHelper()
  const backLink = "/admin/career"

  useEffect(setupCkfinder, []);
  useEffect(setTimeoutCkeditor200, [])

  useEffect(() => {
    fetchDataAdmin(controllers.career + id, setEditing, () => {
      setTimeoutCkeditor200()
    })
  }, [])

  if (!editing.Link)
    return (
      <div>
        <h2 className="text-danger">This career does not exist</h2>
        <Link
          type="button"
          className="btn btn-secondary m-1"
          to={backLink}
        >
          Close
          </Link>
      </div>
    )

  return (
    <div className="containter mx-2">

      <div>
      <form>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <div className="form-check pl-0">
                    <label htmlFor="show" className="col-form-label">
                      Show:
                    </label>
                    <input
                      name="Show"
                      type="checkbox"
                      className="form-check-input career-show-checkbox" 
                      id="show"
                      checked={editing.Show}
                      onChange={(e) => handleChange(e, setEditing)}
                    />
                    </div>
                    
                  </div>
                  <div className="col">
                <label htmlFor="Date" className="col-form-label">
                      Date:
                    </label>
                    <input
                      required
                      name="Date"
                      type="date"
                      className="form-control"
                      id="Date"
                      value={editing.Date}
                      onChange={(e) => handleChange(e, setEditing)}
                    />
                    </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                <div className="col">
                <label htmlFor="Title" className="col-form-label">
                      Title:
                    </label>
                    <input
                      required
                      name="Title"
                      type="text"
                      className="form-control vn-font"
                      id="Title"
                      value={editing.Title}
                      onChange={(e) => handleChange(e, setEditing)}
                    />
                    </div>
                </div>
              </div>
              <InputLink title={editing.Title} value={editing.Link} setValue={(e) => handleChange(e, setEditing)}/>

              <div className="form-group ckeditor200">
                <label className="text-left mb-4">Description:</label>
                <CKEditor
                  data={editing.Description}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "Description", value: e.editor.getData() },
                    }, setEditing)
                  }
                />
              </div>

              <div className="form-group">
                <div className="row">
                <div className="col">
                <label htmlFor="Requirements" className="col-form-label">
                Requirements:
                    </label>
                    <textarea
                     name="Requirements"
                     id="Requirements"
                     className="form-control vn-font"
                     value={editing.Requirements}
                     onChange={(e) => handleChange(e, setEditing)}
                     rows="5"
                     />
                    </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                <div className="col">
                <label htmlFor="Welfare" className="col-form-label">
                Welfare:
                    </label>
                    <textarea
                     name="Welfare"
                     id="Welfare"
                     className="form-control vn-font"
                     value={editing.Welfare}
                     onChange={(e) => handleChange(e, setEditing)}
                     rows="5"
                     />
                    </div>
                </div>
              </div>

              <div className="form-group ckeditor200">
              <label className="text-left mb-4">Profile Includes:</label>
                <CKEditor
                  data={editing.ProfileIncludes}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "ProfileIncludes", value: e.editor.getData() },
                    }, setEditing)
                  }
                />
              </div>
              <div className="form-group ckeditor200">
              <label className="text-left mb-4">Contact:</label>
                <CKEditor
                  data={editing.Contact}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "Contact", value: e.editor.getData() },
                    }, setEditing)
                  }
                />
              </div>
            </form>

        <Link
          type="button"
          className="btn btn-secondary m-1"
          to={backLink}
        >
          Close
                  </Link>
        <button
          type="button"
          className="btn btn-success m-1"
          onClick={e => put(controllers.career, editing, backLink)}
          data-dismiss="modal"
        >
          Update
                      </button>
      </div>
    </div>
  )

}