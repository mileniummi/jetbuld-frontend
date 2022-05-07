import React from "react";
import arrow_up_left from "../images/icons/arrow-up-right-from-square-solid.svg";
import gear from "../images/icons/gear-solid.svg";
import location_dot from "../images/icons/location-dot-solid.svg";

const InfoHeader = ({ name, address }) => {
  return (
    <div className="info-header">
      <div className="project-info-header">
        <img src="" alt="" />
        <h1 className="default-header">{name}</h1>
        <button>
          <img src={arrow_up_left} alt="" />
          <span>Share</span>
        </button>
        <button>
          <img src={gear} alt="" />
          <span>Manage</span>
        </button>
      </div>
      <div className="project-info-description">
        <div className="project-info-description__item">
          <img src={location_dot} alt="location-dot-icon" />
          <a href="" className="project-info-info__location">
            {address}
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoHeader;
