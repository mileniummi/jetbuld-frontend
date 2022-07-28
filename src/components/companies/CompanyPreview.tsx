import React, { memo } from "react";
import { Link } from "react-router-dom";
import { ICompany } from "../../types/Company";
import { LONG_DATE_FORMAT } from "../../types/App";

interface ICompanyPreviewProps {
  company: ICompany;
}

const CompanyPreview: React.FC<ICompanyPreviewProps> = memo(({ company }) => {
  return (
    <Link to={"/projects"} state={{ from: "CompanyPreview", company }}>
      <div className="preview">
        <div className="preview__description">
          <h3 className="preview__name">{company.name}</h3>
          <h4 className="preview__location">{company.address} </h4>
          <p className="preview__last-update-time">
            {new Intl.DateTimeFormat("en-GB", LONG_DATE_FORMAT).format(new Date(company.timeCreated))}
          </p>
        </div>
        <div className="preview__attribute">
          <h3 className="preview__title">Description</h3>
          <h4>{company.description}</h4>
        </div>
        <div className="preview__attribute">
          <h3 className="preview__title">City</h3>
          <h4>{company.city}</h4>
        </div>
        <div className="preview__attribute">
          <h3 className="preview__title">Country</h3>
          <h4>{company.country}</h4>
        </div>
      </div>
    </Link>
  );
});

export default CompanyPreview;
