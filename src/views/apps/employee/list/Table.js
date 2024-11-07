// ** React Imports
import { Fragment, useState, useEffect, useMemo } from "react";

// ** Table Columns
// import { columns } from "./columns";
import columns from "./columns";

// ** Store & Actions
import { getAllData, getData } from "../store";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import { useGetPermissionWithRoles } from "../../../../api/query";
import { Messages } from "../../../../utility/Utils";
import message from "../../../../assets/images/message/error-message.png";

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
  name: true,
  email: false,
  dateOfBirth: false,
  createdBy: true,
  updatedBy: true,
  // Add other keys from your columns configuration
  jobTitle: true,
  employee_number: true,
  phoneNumber: true,
  contactno: true,
  address: false,
  department: false,
  joiningDate: false,
  visaExpiryDate: false,
  contractExpiryDate: true,
  gender: true,
  employmentType: true,
  company: true,
  createdByName: true,
  updatedByName: true,
};

// ** Table Header
const EmployeesList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.Employees);
  const [data, setData] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [allPermissions, setAllPermissions] = useState([]);
  const [allPermissionsLength, setAllPermissionsLength] = useState([]);
  const [page, setPage] = useState(10);
  const [limit, setLimit] = useState(10);

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

  //   ** Function to handle loadmore
  const handleBlock = () => {
    setBlock(true);
    // Increase Limit if need, how many load cards
    setPage((prevPage) => prevPage + 2);
    setTimeout(() => {
      setBlock(false);
    }, 2000);
  };

  // All Permission For Select RoleNames

  // ** Variables
  const {
    data: permissions,
    isLoading,
    isError,
  } = useGetPermissionWithRoles(page, limit);

  console.log("allPermissions<><>", allPermissions);

  useEffect(() => {
    if (permissions) {
      setAllPermissions(permissions);
      setAllPermissionsLength(permissions?.totalLength);
    }
  }, [permissions]);

  const error = permissions?.request?.status === 404;

  if ((isLoading && page === 1) || isError || error) {
    return (
      <Messages
        isLoading={isLoading}
        isError={isError || error}
        message={message}
      />
    );
  }

  const isMore = length !== page;

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
          Add Employee +
        </Button>
      </div>
      <Card className="w-100">
        <MaterialReactTable table={table} />
        <FormAuth
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
          editData={editData}
          allPermissionsWithRolesNames={allPermissions}
        />
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
