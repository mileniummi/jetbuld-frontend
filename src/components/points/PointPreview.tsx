import { Link } from "react-router-dom";
import React from "react";
import "./point.css";
import { IPoint } from "../../types/Point";
import { LONG_DATE_FORMAT } from "../../types/App";
import PreviewPhotos from "./PreviewPhotos";

const PointPreview: React.FC<{ point: IPoint }> = ({ point }) => {
  return (
    <div className="preview">
      <Link style={{ width: "100%" }} to="/photos" state={{ from: "Point Preview", point }}>
        <div className="preview__description__container">
          <div>
            <h3 className="preview__name">{point.name}</h3>
            <h4 className="preview__location">{point.description} </h4>
            <p className="preview__last-update-time">
              {new Intl.DateTimeFormat("en-GB", LONG_DATE_FORMAT).format(new Date(point.timeCreated))}
            </p>
          </div>
          <div className="preview__photos">
            <PreviewPhotos point={point} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PointPreview;
