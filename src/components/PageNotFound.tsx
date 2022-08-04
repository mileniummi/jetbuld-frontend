import React from "react";
import NothingToShow from "./utils/nothingToShow";

const PageNotFound = () => {
  return (
    <main>
      <div className="nothing-to-show">
        <NothingToShow message="Oops... This page is not found." />
      </div>
    </main>
  );
};

export default PageNotFound;
