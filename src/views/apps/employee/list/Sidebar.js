import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import Sidebar from "@components/sidebar";
import Select from "react-select";
import classnames from "classnames";
import { selectThemeColors } from "@utils";
import { Eye, EyeOff } from "react-feather";
import { uploadEmployeeImageProfile } from "../../../../api/mutations";

const SidebarNewUsers = ({
  open,
  toggleSidebar,
  onSubmit,
  formData,
  handleProfilePicChange,
  profilePic,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProfilePicClick = () => {
    document.getElementById("profilePicInput").click();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  return (
    <Sidebar
      size="lg"
      open={open}
      title={formData.editData ? "Edit Employee" : "New Employee"}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="profilePic">
            Profile Picture
          </Label>
          <div className="d-flex align-items-center">
            <img
              src={profilePic}
              alt="Profile Preview"
              className="rounded-circle"
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={handleProfilePicClick}
            />
            <Input
              type="file"
              id="profilePicInput"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* Other Form Fields */}
        {formData.fields.map((field, index) => (
          <div key={index} className="mb-1">
            <Label className="form-label" for={field.name}>
              {field.label}{" "}
              {field.required && <span className="text-danger">*</span>}
            </Label>
            <Controller
              name={field.name}
              control={control}
              rules={{
                required: field.required ? `${field.label} is required` : false,
                pattern:
                  field.type === "email"
                    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    : undefined,
                minLength:
                  field.type === "password"
                    ? {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      }
                    : undefined,
              }}
              render={({ field: controllerField }) =>
                field.type === "select" ? (
                  <Select
                    {...controllerField}
                    id={field.name}
                    options={field.options}
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    placeholder={field.placeholder}
                    className={classnames("react-select", {
                      "is-invalid": errors[field.name],
                    })}
                  />
                ) : field.type === "password" ? (
                  <InputGroup>
                    <Input
                      {...controllerField}
                      type={showPassword ? "text" : "password"}
                      id={field.name}
                      placeholder={field.placeholder}
                      invalid={errors[field.name] && true}
                    />
                    <InputGroupText onClick={togglePasswordVisibility}>
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </InputGroupText>
                    {errors[field.name] && (
                      <FormFeedback>{errors[field.name].message}</FormFeedback>
                    )}
                  </InputGroup>
                ) : (
                  <>
                    <Input
                      {...controllerField}
                      type={field.type || "text"}
                      id={field.name}
                      placeholder={field.placeholder}
                      invalid={errors[field.name] && true}
                    />
                    {errors[field.name] && (
                      <FormFeedback>{errors[field.name].message}</FormFeedback>
                    )}
                  </>
                )
              }
            />
          </div>
        ))}
        <Button type="submit" className="me-1" color="primary">
          Submit
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
