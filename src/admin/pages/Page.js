import React, { useEffect, useReducer, useState } from 'react';
import CKEditor from 'ckeditor4-react';
import useHelper from '../../common';
import { useLocation } from 'react-router-dom';
CKEditor.editorUrl = '/ckeditor/ckeditor.js'

export default function Page({ link, handleChange}) {

    const [page, setPage] = useReducer((state, newState) => ({ ...state, ...newState }), {Title: "", Path: "", Content: ""})
    const {errorHandler} = useHelper();
    const [loaded, setLoaded] = useState(false)
    const location = useLocation()

    useEffect(() => {
        getPage()
        setTimeout(() => {
            const script = document.createElement('script')
            script.async = true
            script.innerHTML = `CKFinder.setupCKEditor();`
            document.body.appendChild(script)
            setLoaded(true)
        }, 500)
    }, [link, location.search])

    function putPage() {
        const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify(page)
          };
          fetch(link + location.search, requestOptions)
          .then(res => {
            if (res.status === 200) 
            {
                alert('Saved!')
                return
            }
            errorHandler(res) 
          })
          .catch(error => alert(error.message));
    }

    function getPage() {
            fetch(link + location.search)
            .then(res => {
              
              if (res.status === 200)
                return res.json()
              errorHandler(res)
            })
            .then(res => setPage(res))
            .catch(error => alert(error.message));
            
    }

    return (
        <div className="containter mx-2">
            <div className="form-group">
                <label htmlFor="title" className="col-form-label">
                    Title:
                      </label>
                <input
                    name="Title"
                    type="text"
                    className="form-control"
                    id="title"
                    value={page.Title}
                    onChange={e => handleChange(e, setPage)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="path" className="col-form-label">
                    Path:
                      </label>
                <input
                    name="Path"
                    type="text"
                    className="form-control"
                    id="path"
                    value={page.Path}
                    onChange={e => handleChange(e, setPage)}
                />
            </div>
            <h2 className="text-center m-5">Content</h2>
            {
                (page.Content || loaded) &&
                <CKEditor
                data={page.Content}
                onChange={e => setPage({Content: e.editor.getData()})}
            />
            }
            <button
                    className="btn btn-success px-5 py-2 my-2"
                    onClick={() => putPage()}>
                    Save</button>
        </div>
    )
}