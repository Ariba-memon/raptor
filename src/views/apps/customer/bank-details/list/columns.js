import { Box } from "@mui/material";
import { Badge } from "reactstrap";

// Helper function to get initials
const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

const columns = [
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "customer_name",
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
    accessorKey: "customer_email",
    header: "Customer Email",
    size: 200,
    enableClickToCopy: true,
    filterVariant: "autocomplete",
  },
  {
    accessorKey: "customer_mobile_no",
    header: "Customer Mobile No.",
    size: 200,
  },
  {
    accessorKey: "account_title",
    header: "Account Title",
    size: 200,
  },
  {
    accessorKey: "bank_name",
    header: "Bank Name",
    size: 200,
  },
  {
    accessorKey: "branch_name",
    header: "Branch Name",
    size: 200,
  },
  {
    accessorKey: "country",
    header: "Country",
    size: 200,
  },
  {
    accessorKey: "branch_code",
    header: "Branch Code",
    size: 150,
  },
  {
    accessorKey: "swift_code",
    header: "Swift Code",
    size: 200,
  },
  {
    accessorKey: "account_number",
    header: "Account Number",
    size: 200,
  },
  {
    accessorKey: "currency_name",
    header: "Currency Name",
    size: 200,
  },
  {
    accessorKey: "iban_number",
    header: "IBAN Number",
    size: 250,
  },
  {
    accessorKey: "created_on",
    header: "Created On",
    size: 200,
    filterVariant: "date",
    filterFn: "lessThan",
    sortingFn: "datetime",
    Cell: ({ cell }) => {
      const dateValue = new Date(cell.getValue());
      return dateValue ? dateValue.toLocaleDateString() : "";
    },
  },
  {
    accessorKey: "updated_on",
    header: "Updated On",
    size: 200,
    filterVariant: "date",
    filterFn: "lessThan",
    sortingFn: "datetime",
    Cell: ({ cell }) => {
      const dateValue = new Date(cell.getValue());
      return dateValue ? dateValue.toLocaleDateString() : "";
    },
  },
];

export default columns;
