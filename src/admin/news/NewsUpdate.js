import CKEditor from 'ckeditor4-react';
import React, { useEffect, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom';
import useHelper, { controllers, DEFAULT_IMAGE } from '../../common';
import InputLink from '../components/InputLink';
import Language from '../components/Language';
CKEditor.editorUrl = "/ckeditor/ckeditor.js";

export default function NewsUpdate() {
  const emptyItem = {
    Title: '',
    Image: DEFAULT_IMAGE,
    Show: 1,
    Description: '',
    Article: '',
    Date: "",
    Link: "",
    Lang: "en"
  }

  const { id } = useParams()
  const [editing, setEditing] = useReducer((state, newState) => ({ ...state, ...newState }), emptyItem)
  const { put, handleChange, fetchDataAdmin, setTimeoutCkeditor200, setupCkfinder } = useHelper()
  const backLink = "/admin/news"
  useEffect(() => {
    fetchDataAdmin(controllers.news + id, setEditing, () => {
      setTimeoutCkeditor200()
      setTimeout(() => {
        const script = document.createElement("script");
        script.innerHTML = `
        document.getElementById('btnChooseImageNews1').addEventListener('click', function() {
          selectFileWithCKFinder('imageNews1', 'imgPreviewNews1');
        })`;

        script.async = true;
        document.body.appendChild(script);
      }, 200)
    })
  }, [])

  useEffect(setupCkfinder, []);
  if (!editing.Link)
    return (
      <div>
        <h2 className="text-danger">This news does not exist</h2>
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
                <label htmlFor="show" className="col-form-label">
                  Priority:
                    </label>
                <input
                  name="Show"
                  type="number"
                  className="form-control"
                  id="show"
                  placeholder="0 to hide; 1, 2, 3,... is the priority of appearance increase"
                  value={editing.Show}
                  onChange={(e) => handleChange(e, setEditing)}
                />
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
          <Language value={editing.Lang} setValue={e => handleChange(e, setEditing)}/>
          
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
                  className="form-control"
                  id="Title"
                  value={editing.Title}
                  onChange={(e) => handleChange(e, setEditing)}
                />
              </div>
            </div>
          </div>
          <InputLink title={editing.Title} value={editing.Link} setValue={(e) => handleChange(e, setEditing)}/>

          <div className="form-group">
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col">

                    <img
                      className="img-preview"
                      src={editing.Image}
                      id="imgPreviewNews1"
                    />
                  </div>

                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-info"
                      id="btnChooseImageNews1"
                    >
                      Choose Image
                        </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p id="imageNews1" className="my-1">
                      {editing.Image}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group ckeditor200">
            <h2 className="text-center m-5">Description</h2>
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
            <h2 className="text-center m-5">Article</h2>
            <CKEditor
              data={editing.Article}
              onChange={(e) =>
                handleChange({
                  target: { name: "Article", value: e.editor.getData() },
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
          onClick={e => put(controllers.news, editing, backLink, 'imageNews1')}
          data-dismiss="modal"
        >
          Update
                      </button>
      </div>



    </div>
  )

}