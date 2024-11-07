import Table from "../../tables/mui-table/Table";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useEffect, useState } from "react";
import { columns, initialColumnVisibility } from "./columns";
import FormAuth from "./FormAuth";
import { useGetCompanies } from "../../../api/query";

const Companies = () => {
  const [data, setData] = useState([]);

  //** API Handling
  const [allCompanies, setAllCompanies] = useState([]);
  const [allCompanyLength, setAllCompaniesLength] = useState([]);

  const { data: companies, isLoading, isError } = useGetCompanies(0, 100);

  console.log("Companies<><>", companies);
  console.log("dataFinal??", data);

  useEffect(() => {
    if (companies) {
      setAllCompanies(companies);
      setAllCompaniesLength(companies?.totalLength);
    }
  }, [companies]);

  return (
    <div className="app-user-list">
      <Table
        data={allCompanies}
        dynamicColumns={columns}
        FormAuth={FormAuth}
        initialColumnVisibility={initialColumnVisibility}
        none={false}
      />
    </div>
  );
};

export default Companies;
