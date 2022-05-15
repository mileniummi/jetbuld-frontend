import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import UploadFileForm from "./popup/UploadFileDropzoneForm";

export default function PointPreview({ point, companyId }) {
  const [showUploadFileForm, setShowUploadFileForm] = useState(false);

  function hideForm() {
    setShowUploadFileForm(false);
  }

  return (
    <div className="preview">
      <div className="preview__description">
        <Link to="/point-photos" state={{ from: "Point Preview", pointId: point.id }}>
          <h3 className="preview__name">{point.name}</h3>
          <h4 className="preview__location">{point.description} </h4>
          <p className="preview__last-update-time">
            Last Updated {new Date(point.timeCreated).toLocaleTimeString("en-US")}
          </p>
        </Link>
        <button
          className="header__button"
          onClick={() => {
            setShowUploadFileForm(true);
          }}
        >
          Upload photo
        </button>
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
    </div>
  );
}
