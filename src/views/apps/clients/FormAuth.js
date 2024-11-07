import React from "react";
import { useQueryClient } from "react-query";
import {
  useCreateScooter,
  useUpdateClients,
  useUpdateScooter,
} from "../../../api/mutations";
import SidebarNewCompany from "../../forms/Sidebar/Sidebar";

const FormAuth = ({ open, toggleSidebar, title, reset, editData }) => {
  const formData = {
    fields: [
      {
        company: "company",
        label: "Company",
        placeholder: "TechCorp",
        required: true,
      },
      { name: "imei", label: "Imei", placeholder: "Imei", required: true },
      {
        name: "sim",
        label: "xyz",
        placeholder: "Enter Sim",
        required: true,
      },
      {
        name: "iccid",
        label: "Iccid",
        placeholder: "Enter Iccid",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        placeholder: "Enter status",
        required: true,
      },
    ],
  };

  // const { mutateAsync: create, isLoading, isError } = useCreateClients();
  const { mutateAsync: updateClients } = useUpdateClients();
  const queryClient = useQueryClient();

  const handleFormSubmit = async (data) => {
    console.log(data.name, "Submit");

    try {
      if (editData) {
        const body = { name: data.name };
        await updateClients({ id: editData._id, body });
      } else {
        console.log("Noo");
        // await createClients(data);
      }
      queryClient.invalidateQueries("clients");
      toggleSidebar();
      reset();
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <SidebarNewCompany
      open={open}
      toggleSidebar={toggleSidebar}
      onSubmit={handleFormSubmit}
      formData={formData}
      editData={editData}
      title={title}
    />
  );
};

export default FormAuth;
