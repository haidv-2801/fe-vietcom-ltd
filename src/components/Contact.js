import { Field, Form, Formik, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useHelper, { TITLE_PREFIX } from '../common'
import { controllers } from '../common'
import { CONTACT_INFORS } from '../infos/contacts'

import{ init, send } from 'emailjs-com';
init("user_qNCtmba5dpEbgitzGRGXw");

export default function Contact({contact}) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const {t, i18n} = useTranslation('common')
    var emails
    useEffect(() => {document.title = TITLE_PREFIX + t('contact.title')}, [i18n.language])

    async function sendEmail(data) {
        
        try {
            const emails = await fetch('/api/email').then(res => res.json())
            const toEmails = emails.Emails.split('\n')
            setIsSending(true)
            setError(false)
            setSuccess(false)

            await Promise.all(toEmails.map(email => {
                data.to_email = email.trim()
                return send('service_tb8lsnz', 'template_gb3z697', data)
            }))
            setSuccess(true)
            
        }
        catch (err) {
            setError(t("contact.Error"))
        }
        finally {
            setIsSending(false)
        }
    }

    return (
        <div className="contentSurr">
            <div className="m-4"></div>
            <div className="csc-default layout-1">
                    <div className="ce-textpic ce-right ce-intext">
                        <div className="ce-bodytext">
                            <h2>{t('contact.howReach')}</h2>
                            <h3>{t('contact.hearing')}.</h3>
                            <p>VIETCOMTLD</p>
                            <p>{i18n.language.includes('vi') ? contact?.Address_vi : contact?.Address_en}</p>
                            <p>{t('footer.t')}    {contact?.Phone}</p>
                            <p>H	{contact?.Hotline}</p>
                            <p>E	<a href={"mailto:" + contact?.Email} title={t('footer.sendMail')}>{contact?.Email}</a></p>
                        </div>
                    </div>
            </div>
            <div className="csc-default layout-0 d-block">
                <div className="container">
                    <Formik
                        initialValues={{ name: '', email: '', phone: '', company: '', street: '', city: '', zip: '', country: '', subject: '', message: '' }}
                        validate={
                            values => {
                                const errors = {}
                                if (!values.name) {
                                    errors.name = 'text-danger';
                                }
                                if (!values.email) {
                                    errors.email = 'text-danger';
                                }
                                if (!values.subject) {
                                    errors.subject = 'text-danger';
                                }
                                if (!values.message) {
                                    errors.message = 'text-danger';
                                }

                                return errors;
                            }
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true)
                            sendEmail(values)
                            setSubmitting(false)
                        }}
                    >
                        {({ isSubmitting, errors, touched}) => (
                            <Form>
                                <div className="row d-flex justify-content-center"><h3>{t('contact.title')}</h3></div>
                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="company" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left">{t('contact.company')}</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="company"
                                            name="company"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="street" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left">{t('contact.street')}</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="street"
                                            name="street"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="city" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left">{t('contact.city')}</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            name="city"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="zip" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left">{t('contact.zip')}</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="zip"
                                            name="zip"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="country" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left">{t('contact.country')}</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            name="country"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="name" className={"col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left " + (touched.name && errors.name)}>{t('contact.name')}*</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            required="" />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="phone" className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left">{t('contact.phone')}</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="email" className={"col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left " + (touched.email && errors.email)}>Email*</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            required=""
                                        />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="subject" className={"col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left " + (touched.subject && errors.subject)}>{t('contact.subject')}*</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            name="subject"
                                            required=""
                                        />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label htmlFor="message" className={"col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left " + (touched.message && errors.message)}>{t('contact.message')}*</label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        <Field
                                            component="textarea"
                                            className="form-control"
                                            name="message"
                                            id="message"
                                            rows="5"
                                            required=""
                                        />
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-center">

                                    <label className=" col-xs-2 col-sm-2 col-md-2 col-lg-1 form-field text-left"></label>
                                    <div className="col-sm-10 col-lg-8 col-xl-6">
                                        {
                                            isSending ?
                                                <button type="submit" disabled className="btn-primary form-control">
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> {" "}
                                                    {t('contact.submitting')}
                                                </button>
                                                : <button type="submit" className="btn-primary form-control" onClick={() => { setSuccess(false); if (errors) setError( t('contact.errorRequireFields') + '!'); else setError(false)}}>{t('contact.submit')}</button>
                                        }
                                        {
                                            error && <p className="text-danger">{error}</p>
                                        }

                                        {
                                            success && <p className="text-success">{t('contact.hasSubmited')}</p>
                                        }

                                    </div>
                                </div>

                            </Form>
                        )}
                    </Formik>
                    <form>


                    </form>

                </div>
            </div>
        </div>
    )
}