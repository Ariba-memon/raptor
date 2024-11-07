import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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
    header: (
      <Typography
        variant="h6"
        sx={{
          color: "white",
          backgroundColor: "#000000",
          padding: "6px",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        Customer Information
      </Typography>
    ),
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
            {/* <span>{renderedCellValue}</span> */}

            <div className="d-flex justify-content-left align-items-center">
              {/* {renderClient(row)} */}
              <div className="d-flex flex-column">
                <Link
                  to={`/apps/user/view/${row.id}`}
                  className="user_name text-truncate text-body"
                  onClick={() => store.dispatch(getUser(row.id))}
                >
                  <span className="fw-bolder">{renderedCellValue}</span>
                </Link>
              </div>
            </div>
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
      {
        accessorKey: "whatsAppNumber",
        header: "WhatsApp Number",
        size: 150,
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
      {
        accessorKey: "nationality",
        header: "Nationality",
        size: 150,
      },
      {
        accessorKey: "passportIdNo",
        header: "Passport ID No",
        size: 150,
      },
      {
        accessorKey: "passportIssueDate",
        header: "Passport Issue Date",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
      {
        accessorKey: "passportExpiryDate",
        header: "Passport Expiry Date",
        size: 250,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
      {
        accessorKey: "residentStatus",
        header: "Resident Status",
        size: 150,
      },
      {
        accessorKey: "assignedAgent",
        header: "Assigned Agent",
        size: 150,
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        size: 150,
      },
      {
        accessorKey: "createdOn",
        header: "Created On",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        size: 150,
      },
      {
        accessorKey: "updatedOn",
        header: "Updated On",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
    ],
  },
  {
    id: "attachments",
    header: (
      <Typography
        variant="h6"
        sx={{
          color: "white",
          backgroundColor: "#000000",
          padding: "6px",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        Attachments
      </Typography>
    ),
    columns: [
      {
        accessorKey: "passportPdf",
        header: "Passport PDF",
        size: 150,
        Cell: ({ cell }) => {
          const fileUrl = cell.getValue();
          return fileUrl ? (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              View
            </a>
          ) : (
            "N/A"
          );
        },
      },
      {
        accessorKey: "emiratesIdAttachment",
        header: "Emirates ID Attachment",
        size: 250,
        Cell: ({ cell }) => {
          const fileUrl = cell.getValue();
          return fileUrl ? (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              View
            </a>
          ) : (
            "N/A"
          );
        },
      },
      {
        accessorKey: "nationalIdPdf",
        header: "National ID PDF",
        size: 150,
        Cell: ({ cell }) => {
          const fileUrl = cell.getValue();
          return fileUrl ? (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              View
            </a>
          ) : (
            "N/A"
          );
        },
      },
    ],
  },
];

export default columns;
