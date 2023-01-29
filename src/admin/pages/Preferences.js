import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { decode } from 'js-base64'
import useHelper from "../../common";
import { controllers } from "../../common";

export default function Preferences() {

  const { errorHandler } = useHelper()
  const [contact, setContact] = useState({})



  async function getContact() {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('jwt')
      },
    };
    fetch(controllers.contact, requestOptions)
      .then(res => {

        if (res.status === 200)
          return res.json()
        errorHandler(res)
      })
      .then(res => {
        if (res)
          setContact(res)
      })
      .catch(error => alert(error.message));
  }

  async function udpateContact(values) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('jwt')
        },
        body: JSON.stringify(values)
      };
      const data = await fetch(controllers.contact, requestOptions).then(res => res.json())
      alert(data.Message)
    }
    catch(ex) {
      console.error(ex)
    }
  }

  useEffect(() => {
    getContact();
  }, [])

  function changePassword(data) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('jwt')
      },
      body: JSON.stringify(data)
    };
    fetch(controllers.changePassword, requestOptions)
      .then(res => res.json())
      .then(res => alert(res.Message))
      .catch(error => alert(error.message));
  }
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Preferences</h1>

      <div className="row">
        <div className="col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Change password
              </h6>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{ newPassword: '', password: '', reNewPassword: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.password) {
                    errors.password = 'Required!';
                  }
                  if (!values.newPassword) {
                    errors.newPassword = 'Required!';
                  }
                  if (!values.reNewPassword) {
                    errors.reNewPassword = 'Required!';
                  }
                  else if (values.newPassword !== values.reNewPassword) {
                    errors.reNewPassword = 'Passwords do not match!';
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const jwt = localStorage.getItem('jwt')
                  if (jwt) {
                    const arr = jwt.split('.')
                    if (arr.length !== 3) {
                      alert('Invalid token. Please log in again!')
                      return;
                    }
                    const username = JSON.parse(decode(arr[1])).unique_name
                    const passwords = { Username: username, Password: values.password, NewPassword: values.newPassword }
                    changePassword(passwords)
                  }
                  else {
                    alert('Invalid token. Please log in again!')
                  }
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <label>Current Password</label>
                    <div className="form-group pass_show">
                      <Field type="password" name="password" className="form-control" />
                      <ErrorMessage className="text-danger" name="password" component="div" />
                    </div>

                    <label>New Password</label>
                    <div className="form-group pass_show">
                      <Field type="password" name="newPassword" className="form-control" />
                      <ErrorMessage className="text-danger" name="newPassword" component="div" />
                    </div>

                    <label>Confirm Password</label>
                    <div className="form-group pass_show">
                      <Field type="password" name="reNewPassword" className="form-control" />
                      <ErrorMessage className="text-danger" name="reNewPassword" component="div" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-success">
                      Change password
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Contact
              </h6>
            </div>
            <div className="card-body">
              <Formik
                initialValues={contact}
                enableReinitialize={true}
                onSubmit={async (values, { setSubmitting }) => {
                  await udpateContact(values)
                  setSubmitting(false);
                }}
              >
                {
                  ({ isSubmitting}) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="emails">Email received messages, An Email address per row</label>
                        <Field type="text" name="Emails" as="textarea" className="form-control" id="emails" rows="4" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <Field type="tel" name="Phone" className="form-control" id="phone"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="hotline">Hotline</label>
                        <Field type="tel" name="Hotline" className="form-control" id="hotline"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Contact Email</label>
                        <Field type="text" name="Email" className="form-control" id="email"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="address_en">Address in English</label>
                        <Field type="text" name="Address_en" className="form-control" id="address_en"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="address_vi">Address in Vietnamese</label>
                        <Field type="text" name="Address_vi" className="form-control" id="address_vi"/>
                      </div>
                      <button type="submit" className="btn btn-success" disabled={isSubmitting}>Update Contact</button>
                    </Form>
                  )
                }

              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
