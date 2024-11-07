const columns = [
  {
    accessorKey: "name", // Accessor for the field in the data
    header: "Name",
    size: 300,
  },
  {
    accessorKey: "city", // Accessor for the field in the data
    header: "City",
    size: 700,
  },
];

const initialColumnVisibility = {
  name: true,
};

export { columns, initialColumnVisibility };
