import { Box } from "@mui/material";
import { Badge } from "reactstrap";

// Helper function to get initials
const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

const statusToRoleMap = {
  active: "Administrator",
  pending: "Employees",
  inactive: "Photographer",
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

const columns = [
  {
    id: "employee",
    columns: [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "name",
        header: "Name",
        size: 200,
        Cell: ({ renderedCellValue, row }) => {
          const { firstName, lastName, avatar } = row.original;
          const initials = getInitials(firstName, lastName);

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: avatar ? "transparent" : "#ccc",
                  overflow: "hidden",
                }}
              >
                {avatar ? (
                  <img
                    alt="avatar"
                    height={30}
                    src={avatar}
                    loading="lazy"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <span style={{ color: "#fff", fontSize: "16px" }}>
                    {initials}
                  </span>
                )}
              </Box>
              <span>{renderedCellValue}</span>
            </Box>
          );
        },
      },
      {
        accessorKey: "email",
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Email",
        size: 200,
      },
    ],
  },
  {
    id: "details",
    columns: [
      {
        accessorKey: "jobTitle",
        header: "Designation",
        size: 200,
      },
      {
        accessorKey: "employee_number",
        header: "Employee Number",
        size: 150,
      },
      {
        accessorKey: "phoneNumber",
        header: "Mobile Number",
        size: 200,
      },
      {
        accessorKey: "contactno",
        header: "Contact Number",
        size: 200,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 250,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value ? value : "N/A";
        },
      },
      {
        accessorKey: "department",
        header: "Department",
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value ? value : "N/A";
        },
      },
      {
        accessorKey: "joiningDate",
        header: "Joining Date",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
        muiFilterTextFieldProps: {
          sx: {
            minWidth: "250px",
          },
        },
      },
      {
        accessorKey: "visaExpiryDate",
        header: "Visa Expiry Date",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
        muiFilterTextFieldProps: {
          sx: {
            minWidth: "250px",
          },
        },
      },
      {
        accessorKey: "contractExpiryDate",
        header: "Contract Expiry Date",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
        muiFilterTextFieldProps: {
          sx: {
            minWidth: "250px",
          },
        },
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
        muiFilterTextFieldProps: {
          sx: {
            minWidth: "250px",
          },
        },
      },
      {
        accessorKey: "gender",
        header: "Gender",
        size: 150,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value ? value : "N/A";
        },
      },
      {
        accessorKey: "employmentType",
        header: "Employment Type",
        size: 200,
      },
      {
        accessorKey: "company",
        header: "Company",
        size: 200,
      },
      {
        accessorKey: "createdByName",
        header: "Created By",
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value ? value : "N/A";
        },
      },
      {
        accessorKey: "updatedByName",
        header: "Updated By",
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value ? value : "N/A";
        },
      },
    ],
  },
];

export default columns;
