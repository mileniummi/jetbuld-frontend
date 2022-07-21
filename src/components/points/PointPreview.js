import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import UploadFileForm from "../photos/UploadFileForm";
import "./point.css";
import { LONG_DATE_FORMAT } from "../../redux/constants/app";

export default function PointPreview({ point, companyId }) {
  const [showUploadFileForm, setShowUploadFileForm] = useState(false);

  function hideForm() {
    setShowUploadFileForm(false);
  }

  return (
    <div className="preview">
      <Link style={{ width: "100%" }} to="/point-photos" state={{ from: "Point Preview", pointId: point.id }}>
        <div className="preview__description__container">
          <div>
            <h3 className="preview__name">{point.name}</h3>
            <h4 className="preview__location">{point.description} </h4>
            <p className="preview__last-update-time">
              {new Intl.DateTimeFormat("en-GB", LONG_DATE_FORMAT).format(new Date(point.timeCreated))}
            </p>
          </div>
          <div className="preview__photos">
            {point.photos.slice(0, 6).map((photo) => (
              <img key={nanoid()} className="preview__photo" src={photo.s3Url} alt="point" />
            ))}
          </div>
        </div>
      </Link>
      <CSSTransition in={showUploadFileForm} classNames="fade" timeout={300} unmountOnExit>
        <UploadFileForm
          key={nanoid()}
          pointId={point.id}
          pointName={point.name}
          hideForm={hideForm}
          companyId={companyId}
        />
      </CSSTransition>
    </div>
  );
}
