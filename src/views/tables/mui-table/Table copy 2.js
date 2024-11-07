import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for routing
import { Button, Card } from "reactstrap";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Edit, Trash } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TableList = ({
  data,
  dynamicColumns,
  FormAuth,
  initialColumnVisibility,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editData, setEditData] = useState(null); // To hold data for editing
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation
  const MySwal = withReactContent(Swal);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleCreate = () => {
    setTitle("Add");
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditClick = (row) => {
    setEditData(row.original); // Set the data for the row being edited
    toggleSidebar(); // Open the sidebar
  };

  const handleDeleteClick = (row, outerText, innerText) => {
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

  // ** Function to handle row click
  const handleRowClick = (row) => {
    const rowData = row.original; // Get row data
    console.log("Navigating to row details:", rowData);

    // Navigate to the details route with the row's data (e.g., row.id or any identifier)
    navigate(`/row-details/${rowData.id}`, { state: rowData });
  };

  const enhancedColumns = useMemo(
    () => dynamicColumns || [],
    [dynamicColumns, handleEditClick, handleDeleteClick]
  );

  // Use MaterialReactTable with row click enabled
  const table = useMaterialReactTable({
    columns: enhancedColumns,
    data,
    enableRowActions: true,
    enableRowSelection: false,
    enableColumnPinning: true,
    enableGrouping: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    initialState: {
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      showColumnFilters: false,
      columnVisibility: initialColumnVisibility,
    },
    renderRowActions: ({ row }) => (
      <div className="d-flex align-items-center">
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
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row), // Add the onClick event handler to the row
      style: { cursor: "pointer" }, // Add pointer cursor to indicate clickable row
    }),
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

export default TableList;
