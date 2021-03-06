import { Link } from "react-router-dom";
import React from "react";
import { LONG_DATE_FORMAT } from "../../types/App";
import { IProject } from "../../types/Project";

interface IProjectPreviewProps {
  project: IProject;
}

const ProjectPreview: React.FC<IProjectPreviewProps> = ({ project }) => {
  return (
    <Link to="/points" state={{ from: "ProjectPreview", project }}>
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
};

export default ProjectPreview;
