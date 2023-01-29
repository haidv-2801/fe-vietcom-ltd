import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useHelper, { controllers } from '../../common';
import { CONTACT_INFORS } from '../../infos/contacts';

export default function Footer({ contact }) {
  const [profile, setProfile] = useState({ Url: '' });

  const { fetchData } = useHelper();
  useEffect(() => {
    fetchData(controllers.links + 'profile', setProfile);
  }, []);

  const { t, i18n } = useTranslation('common');
  return (
    <div className="footer">
      <div className="wideInner">
        <div className="csc-default layout-0">
          <div className="ce-textpic ce-right ce-intext">
            <div className="ce-bodytext">
              <table summary="" className="contenttable">
                <tbody>
                  <tr>
                    <td>
                      <b>Vietcom</b>
                    </td>
                    <td>
                      <b>{t('footer.t')}</b>
                    </td>

                    <td>{contact?.Phone}</td>
                    {profile?.Url ? (
                      <td>
                        <a
                          href={profile?.Url}
                          title={t('footer.downloadProfile')}
                          className="download"
                        >
                          {t('footer.downloadProfile')}
                        </a>
                      </td>
                    ) : null}
                  </tr>
                  <tr>
                    <td>
                      <b></b>
                    </td>
                    <td>
                      <b>H</b>
                    </td>
                    <td>{contact?.Hotline}</td>
                  </tr>
                  <tr>
                    <td>
                      {i18n.language.includes('vi')
                        ? contact?.Address_vi
                        : contact?.Address_en}
                    </td>
                    <td>
                      <b>E</b>
                    </td>
                    <td>
                      <a
                        href={'mailto:' + contact?.Email}
                        title={t('footer.sendMail')}
                      >
                        {contact?.Email}
                      </a>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
