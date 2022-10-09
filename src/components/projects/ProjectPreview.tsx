import { Link } from "react-router-dom";
import React from "react";
import { LONG_DATE_FORMAT } from "@/models/App";
import { IProject } from "@/models/Project";
// @ts-ignore
import styles from "./projects.module.scss";
import cn from "classnames";

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
        <div className={cn(styles.state, styles[project.stage.toLowerCase()])}>{project.stage}</div>
      </div>
    </Link>
  );
};

export default ProjectPreview;
