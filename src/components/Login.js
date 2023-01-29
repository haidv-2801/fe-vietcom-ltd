import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [error, setError] = useState(false);

  const history = useHistory();
  const {t} = useTranslation('common')

  function login(data) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch('/api/login', requestOptions)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        }
        if (res.status === 401)
          setError({ message: t('login.wrongUsernamePassword') })
        else
          setError({ message: res.statusText })
        return { Token: null }
      })
      .then(res => {
        localStorage.setItem('jwt', res.Token)
        if (res.Token)
          history.push('/admin')
      })
      .catch(error => setError(error));
  }


  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(t('login.requireUsername')),
    password: Yup.string().required(t('login.requirePassword')),
  });

  return (
    <div className="csc-default layout-0 d-block mt-5">
      <div className="container">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            login(values)
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row d-flex justify-content-center"><h3>{t('login.title')}</h3></div>
              <div className="form-group row d-flex justify-content-center">
                <label htmlFor="username" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left">{t('login.username')}</label>
                <div className="col-sm-10 col-lg-8 col-xl-6">
                  <Field
                    name="username"
                    type="text"
                    id="username"
                    placeholder={t('login.username')}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row d-flex justify-content-center">

                <label htmlFor="password" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left">{t('login.password')}</label>
                <div className="col-sm-10 col-lg-8 col-xl-6">
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    placeholder={t('login.password')}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group row d-flex justify-content-center">
                <label htmlFor="error-message" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left text-danger"><span></span></label>
                <div className="col-sm-10 col-lg-8 col-xl-6">
                <p className="text-danger">{error ? error.message : (touched.username && errors.username) ?  errors.username : touched.password && errors.password}&nbsp;</p>
                </div>
              </div>

              <div className="form-group row d-flex justify-content-center">
                <label htmlFor="error-message" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left text-danger"></label>
                <div className="col-sm-10 col-lg-8 col-xl-6">
                  <Field
                    name="submit"
                    type="submit"
                    className="btn-primary form-control mt-0"
                    value={t('login.title')}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
