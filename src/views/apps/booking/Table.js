// ** React Imports
import { useState, useMemo } from "react";

// ** Table Columns
import columns from "./columns";

import { Edit, Trash, Plus } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";
// Date Picker Imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// ** Reactstrap Imports
import { Row, Col, Card, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import mockData from "./data";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../@core/components/breadcrumbs";

// ** Table Header
const CustomHeader = ({
  handleAddBooking,
  isSelectedRowsData,
  handleDeleteClick,
}) => {
  return (
    <>
      <div className="d-flex">
        {isSelectedRowsData && (
          <>
            <Button
              variant="contained"
              color="danger"
              onClick={handleDeleteClick}
            >
              Cancel Booking
            </Button>
          </>
        )}
        <Col style={{ margin: "auto", textAlign: "end" }}>
          <Button
            // className="me-3"
            variant="contained"
            color="primary"
            onClick={handleAddBooking}
          >
            Booking <Plus className="font-medium-2" />
          </Button>
        </Col>
      </div>
    </>
  );
};

const EmployeesList = () => {
  const [data, setData] = useState(mockData);
  const [editData, setEditData] = useState(null); // To hold data for editing
  const [isSelectedRowsData, setSelectedRowsData] = useState(false); // Store selected rows data
  const [rowData, setSelectedRows] = useState([]);

  const navigate = useNavigate();

  const initialColumnVisibility = {
    bookingNumber: true,
    bookingStatus: true,
    unitNo: true,
    buildingName: false, // Hidden
    floorLevel: true,
    communityName: true,
    projectName: true,
    ownerName: true,
    guestName: true,
    checkInType: true,
    nationality: false, // Hidden
    passportNo: false, // Hidden
    mobileNumber: true,
    email: true,
    numOfAdults: true,
    numOfChildren: false, // Hidden
    numOfOccupants: false, // Hidden
    confirmationCode: false, // Hidden
    bookingDate: true,
    bookingAgent: true,
    modeOfPayment: true,
    checkInDate: true,
    checkOutDate: true,
    numOfNights: true,
    tourismFee: false, // Hidden
    securityDepositAmount: false, // Hidden
    totalPayout: true,
    hostServiceFee: false, // Hidden
    totalCollectionAllIncl: true,
    cleaningFee: false, // Hidden
    totalAdditionalFee: false, // Hidden
    roomRentAmountIncl: true,
    roomRentAmountHost: false, // Hidden
    guestServiceFee: false, // Hidden
    guestManagementFee: false, // Hidden
    hostManagementFee: false, // Hidden
    totalRoomRentAmount: true,
    vatRoomRent: false, // Hidden
    vatServiceFee: false, // Hidden
    vatCleaningFee: false, // Hidden
    vatGuestManagementFee: false, // Hidden
    vatHostManagementFee: false, // Hidden
    totalPayoutVat: false, // Hidden
    totalRoomRentWithGMVAT: false, // Hidden
    auditDifference: false, // Hidden
    dtcmUploaded: false, // Hidden
    passportIdCollected: false, // Hidden
    signatureVerified: false, // Hidden
    smartCodeProvided: false, // Hidden
    paymentCollected: false, // Hidden
    createdBy: true,
    createdOn: true,
    updatedBy: true,
    updatedOn: false, // Hidden
  };

  const AddBooking = () => {
    navigate("/apps/booking/add", {
      state: { title: "Add " }, // Replace with your actual state
    });
  };

  const MySwal = withReactContent(Swal);

  const handleDeleteClick = (row, outerText, innerText) => {
    console.log("row????", row);
    const itemId = row?.original?.id;

    MySwal.fire({
      title: "Are you sure?",
      text: `Do you want to ${outerText} this item?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${outerText} it!`,
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
        MySwal.fire({
          icon: "success",
          title: `${innerText}!`,
          text: `The item has been ${innerText}.`,
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: `The item was not ${innerText}.`,
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const handleEditClick = (row) => {
    setEditData(row.original);
    navigate("/apps/booking/update", {
      state: { title: "Update " }, // Replace with your actual state
    });
  };

  // ** Define Columns with Actions
  const enhancedColumns = useMemo(
    () => [...columns],
    [handleEditClick, handleDeleteClick]
  );

  const table = useMaterialReactTable({
    columns: enhancedColumns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true, // Ensure this is enabled
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      columnVisibility: initialColumnVisibility,
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderTopToolbar: ({ table }) => {
      const selectedRows = table
        .getSelectedRowModel()
        .flatRows.map((row) => row.original);
      console.log("Selected Rows:", selectedRows);
      const hasSelectedRows = selectedRows.length > 0;

      if (hasSelectedRows !== isSelectedRowsData) {
        setSelectedRowsData(hasSelectedRows);
        setSelectedRows(selectedRows);
      }

      return null;
    },
    renderRowActions: ({ row }) => (
      <div className="d-flex align-items-center permissions-actions">
        <Button
          size="sm"
          color="transparent"
          className="btn btn-icon"
          onClick={() => handleEditClick(row)}
        >
          <Edit className="font-medium-2" />
        </Button>
        <Button
          size="sm"
          color="transparent"
          className="btn btn-icon"
          onClick={() => handleDeleteClick(row, "delete", "Deleted")}
        >
          <Trash className="font-medium-2" />
        </Button>
      </div>
    ),
  });

  return (
    <>
      <Row className="mb-1">
        <CustomHeader
          handleAddBooking={AddBooking}
          handleDeleteClick={() =>
            handleDeleteClick(rowData, "cancel booking", "Booking Canceled")
          }
          isSelectedRowsData={isSelectedRowsData}
        />
      </Row>

      <Card className="w-100">
        <MaterialReactTable table={table} />
      </Card>
    </>
  );
};

const TableWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <EmployeesList />
  </LocalizationProvider>
);

export default TableWithLocalizationProvider;
