// ** React Imports
import { useState, useEffect, useMemo } from "react";

// ** Third Party Components

import { Edit, Trash } from "react-feather";

// Date Picker Imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// ** Reactstrap Imports
import { Card, Button } from "reactstrap";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
// import mockData from "./data";
import { useGetPermissionWithRoles } from "../../../api/query";
import { useQueryClient } from "react-query";

// ** Table Header
const TableList = ({
  data,
  dynamicColumns,
  FormAuth,
  initialColumnVisibility,
  none,
  setTitle,
  title,
  updateScooter,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCreate = () => {
    setTitle("Add");
    setSidebarOpen(!sidebarOpen);
  };

  const [editData, setEditData] = useState(null); // To hold data for editing

  console.log("editData", editData);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleEditClick = (row) => {
    console.log(row.original, "Taimoor");
    setTitle("Edit");
    setEditData(row.original); // Set the data for the row being edited
    toggleSidebar(); // Open the sidebar
  };

  console.log("dataFinal", data);
  const MySwal = withReactContent(Swal);
  const queryClient = useQueryClient();

  const handleDeleteClick = async (row, outerText, innerText) => {
    const itemId = row?.original?._id;
    console.log("itemId", itemId);

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
    }).then(async (result) => {
      if (result.value) {
        try {
          await updateScooter({ id: itemId, body: { active: false } });
          queryClient.invalidateQueries("scooters");
          MySwal.fire({
            icon: "success",
            title: `${innerText}!`,
            text: `The item has been ${innerText}.`,
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        } catch (error) {
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: "There was a problem processing your request.",
            customClass: {
              confirmButton: "btn btn-danger",
            },
          });
        }
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

  // ** Define Columns with Actions
  // const enhancedColumns = useMemo(() => [...dynamicColumns], [handleEditClick]);
  const enhancedColumns = useMemo(
    () => dynamicColumns || [],
    [dynamicColumns, handleEditClick, handleDeleteClick]
  );

  console.log("none", none);

  const table = useMaterialReactTable({
    columns: enhancedColumns, // Use 'columns' instead of 'dynamicColumns'
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
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
        <>
          <Button
            size="sm"
            color="transparent"
            className="btn btn-icon"
            onClick={() => handleEditClick(row)}
          >
            <Edit className="font-medium-2" />
          </Button>
        </>

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
      <div className="d-flex justify-content-end pb-2">
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create +
        </Button>
      </div>

      <Card className="w-100">
        <MaterialReactTable table={table} />
        <FormAuth
          open={sidebarOpen}
          title={title}
          toggleSidebar={toggleSidebar}
          editData={editData}
        />
      </Card>
    </>
  );
};

const TableWithLocalizationProvider = ({
  data,
  dynamicColumns,
  FormAuth,
  initialColumnVisibility,
  setTitle,
  title,
  updateScooter,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TableList
      data={data}
      setTitle={setTitle}
      title={title}
      dynamicColumns={dynamicColumns}
      FormAuth={FormAuth}
      updateScooter={updateScooter}
      initialColumnVisibility={initialColumnVisibility}
    />
  </LocalizationProvider>
);

export default TableWithLocalizationProvider;
