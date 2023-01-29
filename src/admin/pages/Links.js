import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { decode } from 'js-base64'
import useHelper from "../../common";
import { controllers } from "../../common";

export default function Links() {

  const LINKS = {PROFILE: 'profile', CV: 'cv'}

  const { errorHandler } = useHelper()
  const [profile, setProfile] = useState('')
  const [cv, setCv] = useState('')

  async function getLink(name, setFunction) {
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('jwt')
        },
    };
    fetch(controllers.links + name, requestOptions)
        .then(res => {

            if (res.status === 200)
                return res.json()
            errorHandler(res)
        })
        .then(res => {
            setFunction(res.Url)
        })
        .catch(error => alert(error.message));
}

  function putLink(e, name, url) {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('jwt')
      },
      body: JSON.stringify({Url: url})
    };
    fetch(controllers.links + name, requestOptions)
      .then(res => res.json())
      .then(res => alert(res.Message))
      .catch(error => alert(error.message));
  }

  useEffect(() => {
    getLink(LINKS.PROFILE, setProfile);
    getLink(LINKS.CV, setCv);
  }, [])

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Links</h1>

      <div className="row">
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Vietcomltd Profile Link:
              </h6>
            </div>
            <div className="card-body">
              <form onSubmit={e => putLink(e, LINKS.PROFILE, profile)}>
                <div className="form-group">
                  <label htmlFor="profile">Link to download Vietcomltd Profile</label>
                  <input className="form-control" id="profile" value={profile} onChange={e => setProfile(e.target.value)}/>
                  
                </div>
                <button type="submit" className="btn btn-success">Update</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Vietcomltd CV Link:
              </h6>
            </div>
            <div className="card-body">
              <form onSubmit={e => putLink(e, LINKS.CV, cv)}>
                <div className="form-group">
                  <label htmlFor="cv">Link to download Vietcomltd CV</label>
                  <input className="form-control" id="cv" value={cv} onChange={e => setCv(e.target.value)}/>
                  
                </div>
                <button type="submit" className="btn btn-success">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
