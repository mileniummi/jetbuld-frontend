import React from "react";
import { Link } from "react-router-dom";

const CompanyPreview = ({ company }) => {
  return (
    <Link to="/projects" state={{ from: "CompanyPreview", company }}>
      <div className="preview">
        <div className="preview__description">
          <h3 className="preview__name">{company.name}</h3>
          <h4 className="preview__location">{company.address} </h4>
          <p className="preview__last-update-time">
            {new Date(company.timeCreated).toUTCString()}
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
};

export default CompanyPreview;
