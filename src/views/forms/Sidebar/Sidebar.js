import React, { useEffect } from "react";
import { Button, Form, Label, Input, FormFeedback } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import Sidebar from "@components/sidebar";
import Select from "react-select";

const SidebarNewCompany = ({
  open,
  toggleSidebar,
  onSubmit,
  formData,
  editData,
  title,
}) => {
  const defaultValues = formData?.fields?.reduce((acc, field) => {
    if (field?.name) {
      acc[field?.name] = editData ? editData[field?.name] || "" : "";
    }
    return acc;
  }, {}) || {};

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handleReset = () => {
    reset();
    toggleSidebar();
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={title || "Form"}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formData?.fields?.map((field) => (
          <div key={field.name} className="mb-1">
            <Label className="form-label" for={field.name}>
              {field.label}{" "}
              {field.required && <span className="text-danger">*</span>}
            </Label>
            <Controller
              name={field.name}
              control={control}
              rules={{
                required: field.required ? `${field.label} is required` : false,
              }}
              render={({ field: controllerField }) => {
                switch (field.type) {
                  case "select":
                    return (
                      <Select
                        {...controllerField}
                        id={field.name}
                        options={field.options}
                        classNamePrefix="select"
                        placeholder={field.placeholder}
                        className={errors[field.name] ? "is-invalid" : ""}
                      />
                    );
                  case "password":
                    return (
                      <Input
                        {...controllerField}
                        type="password"
                        id={field.name}
                        placeholder={field.placeholder}
                        invalid={!!errors[field.name]}
                      />
                    );
                  default:
                    return (
                      <Input
                        {...controllerField}
                        type={field.type || "text"}
                        id={field.name}
                        placeholder={field.placeholder}
                        invalid={!!errors[field.name]}
                      />
                    );
                }
              }}
            />
            {errors[field.name] && (
              <FormFeedback>{errors[field.name]?.message}</FormFeedback>
            )}
          </div>
        ))}

        <Button type="submit" className="me-1" color="primary">
          Submit
        </Button>
        <Button type="reset" color="secondary" outline onClick={handleReset}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewCompany;
