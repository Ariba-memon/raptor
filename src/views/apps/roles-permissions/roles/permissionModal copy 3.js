import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Label,
  Row,
  Col,
  UncontrolledTooltip,
  FormGroup,
} from "reactstrap";
import moduleaccess from "./modules";
import { Info } from "react-feather";
import { useCreatePermissions } from "../../../../api/mutations";

const PermissionsModal = ({
  isOpen,
  toggle,
  mode,
  title,
  rolename,
  userLoginId,
}) => {
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const { handleSubmit, control, setValue, watch, reset } = useForm({
    defaultValues: {
      rolename: rolename || "",
      moduleaccess: moduleaccess.reduce(
        (acc, module) => ({
          ...acc,
          [module.name]: {
            modulename: module.name.toLowerCase().replace(/\s+/g, "_"),
            checked: false,
            read: false,
            edit: false,
            write: false,
            delete: false,
          },
        }),
        {}
      ),
    },
  });

  const moduleValues = watch("moduleaccess");

  useEffect(() => {
    if (mode === "edit" && rolename) {
      setValue("rolename", rolename);
    }
  }, [mode, rolename, setValue]);

  const handleCheckboxChange = (moduleName, permissionType) => {
    const module = moduleValues[moduleName];
    if (module.checked) {
      setValue(
        `moduleaccess.${moduleName}.${permissionType}`,
        !module[permissionType]
      );
    }
  };

  const handleModuleCheckboxChange = (moduleName) => (e) => {
    const checked = e.target.checked;
    setValue(`moduleaccess.${moduleName}.checked`, checked);
    ["read", "edit", "write", "delete"].forEach((perm) => {
      setValue(`moduleaccess.${moduleName}.${perm}`, checked);
    });
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setIsSelectAllChecked(checked);
    moduleaccess.forEach((module) => {
      setValue(`moduleaccess.${module.name}.checked`, checked);
      ["read", "edit", "write", "delete"].forEach((perm) => {
        setValue(`moduleaccess.${module.name}.${perm}`, checked);
      });
    });
  };

  const handleResetAll = () => {
    setIsSelectAllChecked(false);
    moduleaccess.forEach((module) => {
      setValue(`moduleaccess.${module.name}.checked`, false);
      ["read", "edit", "write", "delete"].forEach((perm) => {
        setValue(`moduleaccess.${module.name}.${perm}`, false);
      });
    });
  };

  const onSubmit = async (data) => {
    const transformedModuleAccess = Object.keys(data.moduleaccess).map(
      (moduleName) => {
        const moduleData = data.moduleaccess[moduleName];
        return {
          moduleview: moduleData.modulename,
          create: moduleData.write,
          read: moduleData.read,
          update: moduleData.edit,
          delete: moduleData.delete,
        };
      }
    );

    const finalData = {
      rolename: data.rolename,
      moduleaccess: transformedModuleAccess,
      columnrestrictions: [], // Add column restrictions if needed
      createdby: userLoginId, // Replace with actual user data
      updatedby: userLoginId, // Replace with actual user data
    };

    console.log('finalData', finalData)
    try {
      await useCreatePermissions(finalData);
      console.log(finalData, "Transformed Data");
      toggle(); // Close the modal after submission
      reset();
    } catch (error) {
      // Handle the error if necessary, e.g., show a notification
      console.error("Error during submission:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody
        style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}
      >
        <Row className="p-0 m-0">
          <Col xs={12}>
            <FormGroup className="p-0 m-0">
              <Label for="rolename">Role Name</Label>
              <Controller
                name="rolename"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="rolename"
                    {...field}
                    placeholder="Enter role name"
                  />
                )}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <table className="table">
              <tbody>
                <tr>
                  <td className="text-nowrap fw-bolder">
                    <span className="me-50">Administrator Access</span>
                    <Info size={14} id="info-tooltip" />
                    <UncontrolledTooltip placement="top" target="info-tooltip">
                      Allows full access to the system
                    </UncontrolledTooltip>
                  </td>
                  <td>
                    {!isSelectAllChecked ? (
                      <div className="form-check">
                        <Input
                          type="checkbox"
                          id="select-all"
                          onChange={handleSelectAll}
                          checked={isSelectAllChecked}
                        />
                        <Label className="form-check-label" for="select-all">
                          Select All
                        </Label>
                      </div>
                    ) : (
                      <Button color="warning" onClick={handleResetAll}>
                        Reset All
                      </Button>
                    )}
                  </td>
                </tr>
                {moduleaccess.map((module) => (
                  <tr key={module.name}>
                    <td className="text-nowrap fw-bolder">
                      <Controller
                        name={`moduleaccess.${module.name}.checked`}
                        control={control}
                        render={({ field }) => (
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              {...field}
                              onChange={handleModuleCheckboxChange(module.name)}
                              checked={
                                moduleValues[module.name]?.checked || false
                              }
                            />
                            <Label
                              className="form-check-label"
                              for={`module-${module.name}`}
                            >
                              {module.name}
                            </Label>
                          </div>
                        )}
                      />
                    </td>
                    <td>
                      <div className="d-flex">
                        {["read", "edit", "write", "delete"].map((perm) => (
                          <FormGroup check className="me-3 me-lg-5" key={perm}>
                            <Controller
                              name={`moduleaccess.${module.name}.${perm}`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="checkbox"
                                  {...field}
                                  disabled={!moduleValues[module.name]?.checked}
                                  onChange={() =>
                                    handleCheckboxChange(module.name, perm)
                                  }
                                  checked={
                                    moduleValues[module.name]?.[perm] || false
                                  }
                                />
                              )}
                            />
                            <Label
                              className="form-check-label"
                              for={`module-${module.name}-${perm}`}
                            >
                              {perm.charAt(0).toUpperCase() + perm.slice(1)}
                            </Label>
                          </FormGroup>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center" xs={12}>
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
            <Button color="secondary" onClick={toggle} className="ms-2">
              Cancel
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default PermissionsModal;
