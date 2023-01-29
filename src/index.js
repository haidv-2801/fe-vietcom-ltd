import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import LanguageDetector from 'i18next-browser-languagedetector';

import common_vi from "./translations/vi/common.json";
import common_en from "./translations/en/common.json";

import "bootstrap";
import "popper.js";

// set default language to vietnamese
if (localStorage.getItem('i18nextLng') === null) {
  localStorage.setItem('i18nextLng', 'vi')
}

i18next.use(LanguageDetector).init({
  interpolation: { escapeValue: false }, // React already does escaping
  fallbackLng: 'vi', // language to use
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
    vi: {
      common: common_vi,
    },
  },
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
