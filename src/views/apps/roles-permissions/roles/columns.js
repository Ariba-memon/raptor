import { Box } from "@mui/material";
import { Badge } from "reactstrap";

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
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.avatar || "https://via.placeholder.com/30"}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "email",
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Email",
        size: 250,
      },
    ],
  },
  {
    id: "id",
    columns: [
      {
        accessorKey: "status",
        header: "Roles",
        size: 250,
        Cell: ({ cell }) => {
          const status = cell.getValue();
          const roles = Array.isArray(status) ? status : [status];

          return (
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              {roles.map((statusItem, index) => (
                <Badge
                  key={index}
                  className="text-capitalize"
                  color={statusObj[statusItem] || "#ccc"}
                  pill
                >
                  {statusToRoleMap[statusItem] || statusItem}
                </Badge>
              ))}
            </Box>
          );
        },
      },
      {
        accessorKey: "jobTitle",
        header: "Designation",
        size: 250,
      },
      {
        accessorFn: (row) => new Date(row.startDate),
        id: "startDate",
        header: "Assign Date",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? dateValue.toLocaleString() : "";
        },
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
        muiFilterTextFieldProps: {
          sx: {
            minWidth: "250px",
          },
        },
      },
      {
        accessorFn: (row) => new Date(row.updateDate),
        id: "updateDate",
        header: "Update Date",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 250,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? dateValue.toLocaleString() : "";
        },
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
        muiFilterTextFieldProps: {
          sx: {
            minWidth: "250px",
          },
        },
      },
      {
        accessorFn: (row) => `${row.createdByName} <br /> ${row.createdByEmail}`,
        id: "createdBy",
        header: "Created By",
        Cell: ({ renderedCellValue }) => (
          <Box>
            <span>{renderedCellValue.split("<br />")[0]}</span>
            <br />
            <span style={{ fontSize: "0.85em", color: "#666" }}>
              {renderedCellValue.split("<br />")[1]}
            </span>
          </Box>
        ),
        size: 250,
      },
      {
        accessorFn: (row) => `${row.updatedByName} <br /> ${row.updatedByEmail}`,
        id: "updatedBy",
        header: "Updated By",
        Cell: ({ renderedCellValue }) => (
          <Box>
            <span>{renderedCellValue.split("<br />")[0]}</span>
            <br />
            <span style={{ fontSize: "0.85em", color: "#666" }}>
              {renderedCellValue.split("<br />")[1]}
            </span>
          </Box>
        ),
        size: 250,
      },
    ],
  },
];

export default columns;
