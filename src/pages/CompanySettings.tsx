import React from "react";
import PageNotFound from "@/components/PageNotFound";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";
import { CompanySettings } from "@/components/settings/CompanySettings/CompanySettings";


export default function CompanySettingsPage() {
  const company = useAppSelector(selectSelectedCompany);

  if (!company) {
    return <PageNotFound />;
  }

  return <CompanySettings company={company} />;
};