import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import JsxParser from 'react-jsx-parser';
import { Link, useLocation } from 'react-router-dom';
import useHelper, { TITLE_PREFIX } from '../../common';

export default function Page({ link }) {
  const [page, setPage] = useState({ Content: '', Title: '' });
  const location = useLocation();
  const { fetchData, goToTop } = useHelper();

  function replaceLink(str) {
    return str
      .replace(/<a\s+href=/g, '<Link class="showMenu" to=')
      .replace(/<\/a>/g, '</Link>');
  }

  const { i18n } = useTranslation('common');

  useEffect(() => {
    fetchData(link, setPage, undefined, goToTop);
  }, [location.pathname, i18n.language]);

  return (
    <JsxParser
      className="contentSurr"
      jsx={replaceLink(page?.Content || '')}
      components={{ Link }}
    />
  );
}
