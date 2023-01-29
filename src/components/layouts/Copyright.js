import React from "react";
import { useTranslation } from "react-i18next";
import { CONTACT_INFORS } from "../../infos/contacts";

const Copyright = ({contact}) => {
    const {i18n} = useTranslation('common')
  return (
    <div className="copyright">
      <div className="csc-default layout-0">
        <div className="ce-textpic ce-right ce-intext">
          <div className="ce-bodytext">
            <p>
              ©&nbsp;Vietcom<span>&nbsp;</span>·<span> {i18n.language.includes('vi') ? contact?.Address_vi : contact?.Address_en}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
