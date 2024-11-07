// ** React Imports
import { Fragment, useState, useEffect, useMemo } from "react";

// ** Table Columns
// import { columns } from "./columns";
import columns from "./columns";

// ** Store & Actions
import { getAllData, getData } from "../store";
import { useDispatch, useSelector } from "react-redux";

import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Edit,
  Trash,
} from "react-feather";

// Date Picker Imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import mockData from "./data";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const initialColumnVisibility = {
  customer_name: true,
  customer_email: false,
  customer_mobile_no: true,
  account_title: true,
  bank_name: true,
  branch_name: true,
  country: true,
  branch_code: true,
  swift_code: true,
  account_number: true,
  currency_name: true,
  iban_number: true,
  created_on: true,
  updated_on: true,
};

// ** Table Header
const BankDetails = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.Employees);
  const navigate = useNavigate();

  const [data, setData] = useState(mockData);

  const [editData, setEditData] = useState(null); // To hold data for editing

  const handleEditClick = (row) => {
    setEditData(row.original); // Set the data for the row being edited
    navigate("/apps/customer/update-bank-details", {
      state: { title: "Edit " }, // Replace with your actual state
    });
  };

  const MySwal = withReactContent(Swal);

  const handleDeleteClick = (row) => {
    // Assuming each row has a unique ID, which you use to identify the item to delete
    const itemId = row.original.id; // Adjust this line to match your actual data structure

    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
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
          title: "Deleted!",
          text: "The item has been deleted.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "The item was not deleted.",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
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
    enableRowActions: true, // Keep default row actions enabled
    enableRowSelection: false,
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
          onClick={() => handleDeleteClick(row)}
        >
          <Trash className="font-medium-2" />
        </Button>
      </div>
    ),
    // renderTopToolbarCustomActions: () => (
    //   <CustomHeader
    //     store={store}
    //     toggleSidebar={toggleSidebar}
    //     handlePerPage={handlePerPage}
    //     rowsPerPage={rowsPerPage}
    //     handleFilter={handleFilter}
    //     searchTerm={searchTerm}
    //   />
    // ),
  });

  const handleBankDetails = () => {
    navigate("/apps/customer/add-bank-details", {
      state: { title: "Add " }, // Replace with your actual state
    });
  };

  return (
    <>
      <div className="d-flex justify-content-end pb-2">
        <Button variant="contained" color="primary" onClick={handleBankDetails}>
          Bank Details +
        </Button>
      </div>
      <Card className="w-100">
        <MaterialReactTable table={table} />
      </Card>
    </>
  );
};

const TableWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BankDetails />
  </LocalizationProvider>
);

export default TableWithLocalizationProvider;
