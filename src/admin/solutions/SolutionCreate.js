import CKEditor from "ckeditor4-react";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import useHelper, { controllers } from "../../common";
import InputLink from "../components/InputLink";
import Language from "../components/Language";
CKEditor.editorUrl = "/ckeditor/ckeditor.js";

export default function SolutionCreate() {
  const emptyItem = {
    Show: 1,
    Title: "",
    Description: "",
    Article: "",
    Link: '',
    Lang: "en",
  };
  // Add lang
  const [editing, setEditing] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    emptyItem
  );
  const {
    post,
    handleChange,
    setTimeoutCkeditor200,
    setupCkfinder,
  } = useHelper();
  const backLink = "/admin/solutions";
  useEffect(() => {
    setTimeoutCkeditor200();
    setupCkfinder();
  }, []);

  return (
    <div className="container-fluid mx-2">
      <form>
        <div className="form-group">
          <label htmlFor="show" className="col-form-label">
            Priority:
          </label>
          <input
            name="Show"
            type="text"
            className="form-control"
            id="show"
            placeholder="0 to hide; others is priority of appearance"
            value={editing.Show}
            onChange={(e) => handleChange(e, setEditing)}
          />
        </div>

        <Language value={editing.Lang} setValue={e => handleChange(e, setEditing)}/>

        <div className="form-group">
          <label htmlFor="Title" className="col-form-label">
            Title:
          </label>
          <input
            name="Title"
            type="text"
            className="form-control"
            id="Title"
            value={editing.Title}
            onChange={(e) => handleChange(e, setEditing)}
          />
        </div>
        <InputLink title={editing.Title} value={editing.Link} setValue={(e) => handleChange(e, setEditing)}/>
 
        <div className="form-group ckeditor200">
          <h2 className="text-center m-5">Description</h2>
          <CKEditor
            data={editing.Description}
            height={400}
            onChange={(e) =>
              handleChange(
                {
                  target: { name: "Description", value: e.editor.getData() },
                },
                setEditing
              )
            }
          />
        </div>

        <div className="form-group">
          <h2 className="text-center m-5">Article</h2>
          <CKEditor
            data={editing.Article}
            onChange={(e) =>
              handleChange(
                {
                  target: { name: "Article", value: e.editor.getData() },
                },
                setEditing
              )
            }
          />
        </div>
      </form>

      <Link type="button" className="btn btn-secondary m-1" to={backLink}>
        Close
      </Link>
      <button
        type="button"
        className="btn btn-success m-1"
        onClick={(e) => post(controllers.solutions, editing, backLink)}
        data-dismiss="modal"
      >
        Add New
      </button>
    </div>
  );
}
