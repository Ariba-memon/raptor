import { useMemo, useState } from "react";

// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// Material UI Imports
import { Card, Button } from "reactstrap";
import modules from "./modules";
import "./style.css";

import mockData from "./data";
import columns from "./columns";
import { Delete, Edit, Trash } from "react-feather";
import { useForm } from "react-hook-form";
import PermissionsModal from "./permissionModal";

// Date Picker Imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import { useSelector } from "react-redux";
import { useGetPermissionByParam } from "../../../../api/query";
import { Messages } from "../../../../utility/Utils";
import message from "../../../../assets/images/message/error-message.png";

const Table = () => {
  // ** States
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("Add");
  const [selectedRole, setSelectedRole] = useState("");
  const [modulePermissions, setModulePermissions] = useState(
    modules.map((module) => ({
      name: module.name,
      read: false,
      write: false,
      create: false,
      delete: false,
    }))
  );

  const { userData } = useSelector((state) => state.auth);
  const userLoginId = userData?._id;
  console.log("auth???", userLoginId);

  const defaultValues = {
    confirmCheckbox: false,
  };

  const MySwal = withReactContent(Swal);

  const toggleModal = () => setShow(!show);

  const handleConfirmDelete = () => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "Are you sure you would like to deactivate your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your account has been deactivated.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Deactivation Cancelled!!",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { permissionName: "" } });

  // ** Function to close modal and reset modalType
  const handleModalClosed = () => {
    setModalType("Add");
    setShow(false);
    setModulePermissions(
      modules.map((module) => ({
        name: module.name,
        read: false,
        write: false,
        create: false,
        delete: false,
      }))
    );
  };

  const [data, setData] = useState(mockData);

  const onSubmit = (data) => {
    if (data.confirmCheckbox === true) {
      handleConfirmDelete();
    } else {
      setError("confirmCheckbox", { type: "manual" });
    }

    if (data.roleName.length) {
      const permissions = modulePermissions;
      if (modalType === "Edit") {
        // Perform the update logic here
      } else {
        // Perform the add new logic here
      }
      console.log(permissions); // Logging the permissions array
      setShow(false);
    } else {
      setError("roleName", {
        type: "manual",
      });
    }
  };

  const handleEditClick = (row) => {
    setModalType("Edit");
    setSelectedRole(row.original.name); // Assuming row.original.name is the role's name
    setShow(true);
  };

  const handleDeleteClick = (row) => {
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

  // ** Add new Permission
  const handleAddClick = () => {
    setModalType("Add");
    setSelectedRole(""); // Clear any selected role
    setShow(true);
  };

  // Table Settings
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
    // ** Variables
    const { data: permissions, isLoading, isError } = useGetPermissionByParam(100);

    const error = permissions?.request?.status === 404;
  
    if (isLoading || isError || error) {
      return (
        <Messages
          isLoading={isLoading}
          isError={isError || error}
          message={message}
        />
      );
    }
  

  return (
    <>
      <div className="d-flex justify-content-end pb-2">
        <Button color="primary" onClick={handleAddClick}>
          Add Role +
        </Button>
      </div>
      <Card className="w-100">
        <MaterialReactTable table={table} />
        <div>
          <PermissionsModal
            isOpen={show}
            toggle={toggleModal}
            mode={modalType}
            title={modalType === "Edit" ? "Edit Permission" : "Add Permission"}
            userLoginId={userLoginId}
            roleName={selectedRole}
            modulePermissions={modulePermissions}
            setModulePermissions={setModulePermissions}
            onModalClose={handleModalClosed}
          />
        </div>
      </Card>
    </>
  );
};

const TableWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Table />
  </LocalizationProvider>
);

export default TableWithLocalizationProvider;
