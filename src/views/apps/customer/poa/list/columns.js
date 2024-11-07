import { Box } from "@mui/material";
import { Badge } from "reactstrap";

// Helper function to get initials
const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ""}${
    lastName?.charAt(0) || ""
  }`.toUpperCase();
};

const columns = [
  {
    id: "customer",
    columns: [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "customerName",
        header: "Customer Name",
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
        accessorKey: "customerEmail",
        header: "Customer Email",
        size: 200,
      },
      {
        accessorKey: "customerMobileNo",
        header: "Customer Mobile No.",
        size: 200,
      },
    ],
  },
  {
    id: "otherCustomer",
    columns: [
      {
        accessorKey: "otherCustomerName",
        header: "Other Customer Name",
        size: 200,
      },
      {
        accessorKey: "otherCustomerEmail",
        header: "Other Customer Email",
        size: 200,
      },
      {
        accessorKey: "otherCustomerMobileNo",
        header: "Other Customer Mobile No.",
        size: 200,
      },
    ],
  },
  {
    id: "poa",
    columns: [
      {
        accessorKey: "poaTakerName",
        header: "POA Taker Name",
        size: 200,
      },
      {
        accessorKey: "poaLanguage",
        header: "POA Language",
        size: 150,
      },
      {
        accessorKey: "dateOfIssue",
        header: "Date of Issue",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
      },
      {
        accessorKey: "expiryDate",
        header: "Expiry Date",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
      },
      {
        accessorKey: "dateOfReValidation",
        header: "Date of Re-Validation",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
      },
      {
        accessorKey: "reValidationExpiry",
        header: "Re-Validation Expiry",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
      },
      {
        accessorKey: "typeOfPoa",
        header: "Type of POA",
        size: 150,
      },
      {
        accessorKey: "nominated",
        header: "Nominated",
        size: 150,
      },
      {
        accessorKey: "buying",
        header: "Buying",
        size: 100,
      },
      {
        accessorKey: "selling",
        header: "Selling",
        size: 100,
      },
      {
        accessorKey: "gifting",
        header: "Gifting",
        size: 100,
      },
      {
        accessorKey: "renting",
        header: "Renting",
        size: 100,
      },
      {
        accessorKey: "management",
        header: "Management",
        size: 150,
      },
      {
        accessorKey: "visa",
        header: "Visa",
        size: 100,
      },
      {
        accessorKey: "specificReason",
        header: "Specific Reason",
        size: 200,
      },
      {
        accessorKey: "codePowerNo",
        header: "Code Power No.",
        size: 200,
      },
      {
        accessorKey: "codePowerBranch",
        header: "Code Power Branch",
        size: 200,
      },
      {
        accessorKey: "numberOfPoaOriginalWithUs",
        header: "No. of POA (Original) With Us",
        size: 200,
      },
      {
        accessorKey: "poaDoneThruLawyerTypistSelf",
        header: "POA Done Thru Lawyer/Typist/Self",
        size: 200,
      },
      {
        accessorKey: "amountPaidCourtFees",
        header: "Amount Paid (AED) | Court Fees",
        size: 200,
      },
      {
        accessorKey: "amountPaidServiceFees",
        header: "Amount Paid (AED) | Service Fees",
        size: 200,
      },
      {
        accessorKey: "attachment",
        header: "Attachment (PDF/PNG/JPG)",
        size: 200,
      },
    ],
  },
  {
    id: "metadata",
    columns: [
      {
        accessorKey: "createdBy",
        header: "Created By",
        size: 200,
      },
      {
        accessorKey: "createdOn",
        header: "Created On",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        size: 200,
      },
      {
        accessorKey: "updatedOn",
        header: "Updated On",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = new Date(cell.getValue());
          return dateValue ? dateValue.toLocaleDateString() : "";
        },
      },
    ],
  },
];

export default columns;
