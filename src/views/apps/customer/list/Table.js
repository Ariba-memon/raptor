// ** React Imports
import { Fragment, useState, useEffect, useMemo } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

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
  Plus,
} from "react-feather";

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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

// ** Table Header

const CustomHeader = ({
  store,
  toggleSidebar,
  handleAddCustomer,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  return (
    <Button variant="contained" color="primary" onClick={handleAddCustomer}>
      Customer <Plus className="font-medium-2" />
    </Button>
  );
};

const EmployeesList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.Employees);
  const [data, setData] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editData, setEditData] = useState(null); // To hold data for editing

  const navigate = useNavigate();

  const initialColumnVisibility = {
    name: true,
    email: false,
    whatsAppNumber: false,
    dateOfBirth: false, // Hidden by default
    nationality: false,
    passportIdNo: false, // Hidden by default
    passportIssueDate: true,
    passportExpiryDate: false, // Hidden by default
    residentStatus: false,
    assignedAgent: false,
    createdBy: true,
    createdOn: true,
    updatedBy: true,
    updatedOn: true,
    passportPdf: true,
    emiratesIdAttachment: true,
    nationalIdPdf: false,
  };
  const AddCustomer = () => {
    navigate("/apps/customer/add");
  };

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

  const handleEditClick = (row) => {
    setEditData(row.original); // Set the data for the row being edited
    // toggleSidebar(); // Open the sidebar
    navigate("/apps/customer/add");
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
  });

  return (
    <>
      <Row className="mb-1">
        <Col className="d-flex justify-content-end">
          <CustomHeader
            store={store}
            toggleSidebar={toggleSidebar}
            handleAddCustomer={AddCustomer}
            handlePerPage={handlePerPage}
            rowsPerPage={rowsPerPage}
            handleFilter={handleFilter}
            searchTerm={searchTerm}
          />
        </Col>
      </Row>

      <Card className="w-100">
        <MaterialReactTable table={table} />
        <Sidebar
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
    <EmployeesList />
  </LocalizationProvider>
);

export default TableWithLocalizationProvider;
