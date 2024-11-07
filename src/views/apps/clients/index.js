import Table from "../../tables/mui-table/Table";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useEffect, useState } from "react";
import { columns, initialColumnVisibility } from "./columns";
import FormAuth from "./FormAuth";
import { useGetClients } from "../../../api/query";

const Clients = () => {
  const [data, setData] = useState([]);

  //** API Handling
  const [allClients, setAllClients] = useState([]);
  const [allCompanyLength, setAllClientsLength] = useState([]);

  const { data: clients, isLoading, isError } = useGetClients(0, 100);

  console.log("Clients<><>", clients);
  console.log("dataFinal??", data);

  useEffect(() => {
    if (clients) {
      setAllClients(clients);
      setAllClientsLength(clients?.totalLength);
    }
  }, [clients]);

  return (
    <div className="app-user-list">
      <Table
        data={allClients}
        dynamicColumns={columns}
        FormAuth={FormAuth}
        initialColumnVisibility={initialColumnVisibility}
        none={false}
      />
    </div>
  );
};

export default Clients;
