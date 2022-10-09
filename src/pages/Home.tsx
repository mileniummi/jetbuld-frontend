import React, { useState } from "react";
import ChooseCompanyForm from "@/components/home/chooseCompanyForm";

const Home = () => {
  const [hasNoCompany, setHasNoCompany] = useState(true);

  return (
    <div>
      <h3 style={{ marginLeft: 10 }}>Companies feed</h3>
      {hasNoCompany && <ChooseCompanyForm />}
    </div>
  );
};

export default Home;
