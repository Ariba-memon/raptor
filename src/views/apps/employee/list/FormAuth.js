import { useEffect, useState } from "react";
import SidebarNewUsers from "./Sidebar";
import { uploadEmployeeImageProfile } from "../../../../api/mutations";

const FormAuth = ({ open, toggleSidebar, allPermissionsWithRolesNames }) => {
  const [responseFile, setResponseFile] = useState("");

  console.log("responseFile<><>", responseFile);
  const roleNameOptions = allPermissionsWithRolesNames.map(
    ({ _id, rolename }) => ({
      label: rolename,
      value: _id,
    })
  );

  const formData = {
    editData: "New Employee",
    profilePic: responseFile || "", // Set this to the existing profile picture URL if editing
    fields: [
      {
        name: "email",
        label: "Email",
        placeholder: "admin@gmail.com",
        required: true,
        type: "email",
      },
      {
        name: "firstname",
        label: "First Name",
        placeholder: "Jack",
        required: true,
      },
      {
        name: "lastname",
        label: "Last Name",
        placeholder: "Abbasi",
        required: true,
      },
      {
        name: "password",
        label: "Password",
        placeholder: "securepassword123",
        required: true,
        type: "password",
      },
      {
        name: "designation",
        label: "Designation",
        placeholder: "CEO",
        required: true,
      },
      // {
      //   name: "profilePic",
      //   label: "Profile Picture",
      //   required: false,
      //   type: "file", // This field will trigger the image upload component
      // },
      {
        name: "employee_number",
        label: "Employee Number",
        placeholder: "123456",
        required: true,
      },
      {
        name: "mobileno",
        label: "Mobile Number",
        placeholder: "+1234567890",
        required: true,
      },
      {
        name: "contactno",
        label: "Contact Number",
        placeholder: "+097187654321",
        required: true,
      },
      {
        name: "rolename",
        label: "Role Name",
        required: true,
        type: "select",
        options: roleNameOptions || [],
      },
      {
        name: "joiningdate",
        label: "Joining Date",
        placeholder: "2024-08-23",
        required: true,
        type: "date",
      },
      {
        name: "visaexpirydate",
        label: "Visa Expiry Date",
        placeholder: "2025-08-23",
        required: true,
        type: "date",
      },
      {
        name: "contractexpirydate",
        label: "Contract Expiry Date",
        placeholder: "2026-08-23",
        required: true,
        type: "date",
      },
      {
        name: "date_of_birth",
        label: "Date of Birth",
        placeholder: "1990-08-23",
        required: true,
        type: "date",
      },
      {
        name: "gender",
        label: "Gender",
        required: true,
        type: "select",
        options: [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ],
      },
      {
        name: "employment_type",
        label: "Employment Type",
        placeholder: "Full-Time",
        required: true,
      },
      {
        name: "company",
        label: "Company",
        placeholder: "TechCorp",
        required: true,
      },
    ],
  };

  const [profilePic, setProfilePic] = useState(
    formData.defaultProfilePic || "https://via.placeholder.com/150"
  );

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleProfilePicChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("selectedFile", selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  console.log("file<><>", file);

  useEffect(() => {
    const uploadImage = async () => {
      if (file) {
        try {
          setUploadStatus("Uploading...");
          const formData = new FormData();
          formData.append("file", file);
          const { fileUrl } = await uploadEmployeeImageProfile(formData);
          console.log("resFile", fileUrl);
          setResponseFile(fileUrl);
          setUploadStatus("Upload successful!");
        } catch (error) {
          setUploadStatus(
            "Upload failed: " +
              (error.response?.data?.message || "Unknown error")
          );
        }
      }
    };

    uploadImage();
  }, [file]);

  const handleFormSubmit = (data) => {
    const finalData = {
      ...data,
      profilepic: responseFile,
      permissions: [data.rolename.value],
      dateofbirth: data.date_of_birth,
      gender: data.gender.value,
      employmenttype: data.employment_type,
      profilecompletion: 100,
    };
    delete finalData.profilePic;
    delete finalData.rolename;

    console.log("Submitted Data: ", finalData);
  };

  return (
    <>
      <SidebarNewUsers
        open={open}
        toggleSidebar={toggleSidebar}
        onSubmit={handleFormSubmit}
        formData={formData}
        handleProfilePicChange={handleProfilePicChange}
        profilePic={profilePic}
      />
    </>
  );
};

export default FormAuth;
