import BankDetailForm from "./form";

const FormAuth = () => {
  const formData = {
    editData: "New Employee",
    profilePic: "", // Set this to the existing profile picture URL if editing
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
        options: [
          { label: "Admin", value: "admin" },
          { label: "Super Admin", value: "superAdmin" },
        ],
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

  const handleFormSubmit = (data) => {
    console.log("Submitted Data: ", data);
  };

  return (
    <>
      <BankDetailForm 
        onSubmit={handleFormSubmit} 
        formData={formData} 
        defaultValues={{
          // Initialize default values for the form if any
          email: "",
          firstname: "",
          lastname: "",
          password: "",
          designation: "",
          employee_number: "",
          mobileno: "",
          contactno: "",
          rolename: "",
          joiningdate: "",
          visaexpirydate: "",
          contractexpirydate: "",
          date_of_birth: "",
          gender: "",
          employment_type: "",
          company: "",
        }}
      />
    </>
  );
};

export default FormAuth;
