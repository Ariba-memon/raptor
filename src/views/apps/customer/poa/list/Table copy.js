// ** React Imports
import { Fragment, useState, useEffect, useMemo } from "react";

// ** Table Columns
// import { columns } from "./columns";
import columns from "./columns";

// ** Store & Actions
import { getAllData, getData } from "../store";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
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
import { Typography } from "@mui/material";
import FormAuth from "./FormAuth";

const initialColumnVisibility = {
  customerName: true,
  customerEmail: true,
  customerMobileNo: true,
  otherCustomerName: false,
  otherCustomerEmail: false,
  otherCustomerMobileNo: false,
  poaTakerName: true,
  poaLanguage: true,
  dateOfIssue: false,
  expiryDate: false,
  dateOfReValidation: false,
  reValidationExpiry: false,
  typeOfPoa: true,
  nominated: true,
  buying: false,
  selling: false,
  gifting: false,
  renting: false,
  management: true,
  visa: false,
  specificReason: true,
  codePowerNo: false,
  codePowerBranch: false,
  numberOfPoaOriginalWithUs: false,
  poaDoneThruLawyerTypistSelf: false,
  amountPaidCourtFees: false,
  amountPaidServiceFees: false,
  attachment: true,
  createdBy: true,
  createdOn: false,
  updatedBy: true,
  updatedOn: false,
};

// ** Table Header
const PoaList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.Employees);
  const [data, setData] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handlePagination = (page) => {
    dispatch(
      getData({
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
      })
    );
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(
      getData({
        q: searchTerm,
        perPage: value,
        page: currentPage,
      })
    );
    setRowsPerPage(value);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        q: val,
        perPage: rowsPerPage,
        page: currentPage,
      })
    );
  };
  const [editData, setEditData] = useState(null); // To hold data for editing

  const handleEditClick = (row) => {
    setEditData(row.original); // Set the data for the row being edited
    toggleSidebar(); // Open the sidebar
  };

  // ** Define Columns with Actions
  const enhancedColumns = useMemo(() => [...columns], [handleEditClick]);

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

  return (
    <>
      <div className="d-flex justify-content-end pb-2">
        <Button variant="contained" color="primary" onClick={toggleSidebar}>
          POA +
        </Button>
      </div>
      <Card className="w-100">
        <MaterialReactTable table={table} />
        <FormAuth
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
          editData={editData}
        />
      </Card>
    </>
  );
};

const TableWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <PoaList />
  </LocalizationProvider>
);

export default TableWithLocalizationProvider;
