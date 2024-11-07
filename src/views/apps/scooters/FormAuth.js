import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useCreateScooter, useUpdateScooter } from "../../../api/mutations";
import SidebarNewCompany from "../../forms/Sidebar/Sidebar";
import { useGetCompanyNames } from "../../../api/query";

const FormAuth = ({ open, toggleSidebar, title, reset, editData }) => {
  // State to store scooter data
  const [companyNames, setCompanyNames] = useState(null);

  // Fetch scooter data based on ID
  const { data: companyNamesOptions } = useGetCompanyNames();

  useEffect(() => {
    if (companyNamesOptions) {
      setCompanyNames(companyNamesOptions);
    }
  }, [companyNamesOptions]);
  console.log("companyNames", companyNames);

  const formattedOptions = companyNames
    ? companyNames.map((item) => ({
        value: item.name,
        label: item._id,
      }))
    : [];

    console.log('formattedOptions', formattedOptions)

  const formData = {
    fields: [
      {
        name: "model",
        label: "Model",
        placeholder: "Select Model",
        // required: true,
        type: "select",
        options: [
          { value: "ez_lines", label: "EzLines" },
          { value: "Tallin", label: "Tallin_Omini" },
          { value: "test", label: "test" },
        ],
      },
      { name: "area", label: "Area", placeholder: "Ezlines" },
      {
        name: "company",
        label: "Company",
        placeholder: "Company Name",
        type: "select",
        options: formattedOptions,
        // required: true,
      },
      {
        name: "number",
        label: "Number",
        placeholder: "Number",
        required: true,
      },
      {
        name: "imei",
        label: "UID (IMEI)",
        placeholder: "IMEI",
        required: true,
      },
      { name: "sim", label: "Sim", placeholder: "Sim" },
      { name: "iccid", label: "ICCID", placeholder: "ICCID" },
      {
        name: "status",
        label: "Status",
        placeholder: "Select Status",
        required: true,
        type: "select",
        options: [
          { value: "Available", label: "Available" },
          { value: "Discharge", label: "Discharge" },
          { value: "No GSM", label: "No GSM" },
          { value: "No GPS", label: "No GPS" },
          { value: "Need Investigation", label: "Need Investigation" },
          { value: "Transportation", label: "Transportation" },
          { value: "Charging", label: "Charging" },
          { value: "Maintenance", label: "Maintenance" },
          { value: "Stolen", label: "Stolen" },
          { value: "Storage", label: "Storage" },
          { value: "not_ready", label: "Not Ready" },
        ],
      },
    ],
  };

  const { mutateAsync: createScooter } = useCreateScooter();
  const { mutateAsync: updateScooter } = useUpdateScooter();
  const queryClient = useQueryClient();

  const handleFormSubmit = async (data) => {
    try {
      if (editData) {
        await updateScooter({ id: editData._id, body: data });
      } else {
        await createScooter(data);
      }
      queryClient.invalidateQueries("scooters");
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
