import React from "react";
import { useQueryClient } from "react-query";
import { useCreateCompany, useUpdateCompany } from "../../../api/mutations";
import SidebarNewCompany from "../../forms/Sidebar/Sidebar";

const FormAuth = ({ open, toggleSidebar, title, reset, editData }) => {
  const formData = {
    fields: [
      {
        name: "name",
        label: "Company Name",
        placeholder: "TechCorp",
        required: true,
      },
      { name: "city", label: "City", placeholder: "Bradford", required: true },
      {
        name: "publicKey",
        label: "CityLiqPay Public Key",
        placeholder: "Enter Public Key",
        required: true,
      },
      {
        name: "privateKey",
        label: "CityLiqPay Private Key",
        placeholder: "Enter Private Key",
        required: true,
      },
    ],
  };

  const { mutateAsync: createCompany, isLoading, isError } = useCreateCompany();
  const { mutateAsync: updateCompany } = useUpdateCompany();
  const queryClient = useQueryClient();

  const handleFormSubmit = async (data) => {
    console.log(data.name, "Submit");

    try {
      if (editData) {
        const body = { name: data.name };
        await updateCompany({ id: editData._id, body });
      } else {
        await createCompany(data);
      }
      queryClient.invalidateQueries("companies");
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
