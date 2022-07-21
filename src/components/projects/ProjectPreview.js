import { Link } from "react-router-dom";
import React from "react";
import { LONG_DATE_FORMAT } from "../../redux/constants/app";

export default function ProjectPreview({ project, companyId, companyName }) {
  return (
    <Link to="/points" state={{ from: "ProjectPreview", project, companyId, companyName }}>
      <div className="preview">
        <div className="preview__description">
          <h3 className="preview__name">{project.name}</h3>
          <h4 className="preview__location">{project.description} </h4>
          <p className="preview__last-update-time">
            {new Intl.DateTimeFormat("en-GB", LONG_DATE_FORMAT).format(new Date(project.timeCreated))}
          </p>
        </div>
      </div>
    </Link>
  );
}
