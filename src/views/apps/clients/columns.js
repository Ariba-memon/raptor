const columns = [
  {
    accessorKey: "role", // Accessor for the field in the data
    header: "Role",
    size: 200,
  },
  {
    accessorKey: "email", // Accessor for the field in the data
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "country", // Accessor for the field in the data
    header: "Country",
    size: 200,
  },

  {
    accessorKey: "firstName", // Accessor for the field in the data
    header: "FirstName",
    size: 200,
  },
  {
    accessorKey: "lastName", // Accessor for the field in the data
    header: "Last Name",
    size: 200,
  },
  {
    accessorKey: "status", // Accessor for the field in the data
    header: "Status",
    type: "select",
    size: 200,
  },
];

const initialColumnVisibility = {
  company: true,
};

export { columns, initialColumnVisibility };
