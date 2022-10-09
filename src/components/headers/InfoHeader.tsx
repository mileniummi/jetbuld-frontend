import React from "react";
// import arrow_up_left from "../../images/icons/arrow-up-right-from-square-solid.svg";
// import gear from "../../images/icons/gear-solid.svg";
import PlaceIcon from "@mui/icons-material/Place";
import "./header.css";
import { useAppSelector } from "../../lib/hooks/redux";
import { selectSelectedCompany } from "../../redux/reducers/selectedCompanyReducer";

const InfoHeader = () => {
  const company = useAppSelector(selectSelectedCompany);
  return (
    <div className="info-header">
      <div className="project-info-header">
        <img src="" alt="" />
        <h1 className="default-header">{company.name}</h1>
        {/*TODO: add share and manage buttons*/}
        {/*<button>*/}
        {/*  <img src={arrow_up_left} alt="" />*/}
        {/*  <span>Share</span>*/}
        {/*</button>*/}
        {/*<button>*/}
        {/*  <img src={gear} alt="" />*/}
        {/*  <span>Manage</span>*/}
        {/*</button>*/}
      </div>
      <div className="project-info-description">
        <div className="project-info-description__item">
          <PlaceIcon />
          <a href="#" className="project-info-info__location">
            {company.address}
          </a>
        </div>
        <div className="project-info-description__item">{company.description}</div>
      </div>
    </div>
  );
};

export default InfoHeader;
