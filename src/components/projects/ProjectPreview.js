import { Link } from "react-router-dom";
import React from "react";

export default function ProjectPreview({ project, companyId, companyName }) {
  return (
    <Link to="/points" state={{ from: "ProjectPreview", project, companyId, companyName }}>
      <div className="preview">
        <div className="preview__description">
          <h3 className="preview__name">{project.name}</h3>
          <h4 className="preview__location">{project.description} </h4>
          <p className="preview__last-update-time">
            Created at {new Date(project.timeCreated).toLocaleTimeString("en-US")}
          </p>
        </div>
      </div>
    </Link>
  );
}
