import React, { useState } from "react";
import { Row, Col, Button, Label } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
import AdvancedForm from "../../../forms/advance";

const CustomerDetails = ({ control, errors, stepper }) => {
  const [customerType, setCustomerType] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const handleCustomerTypeChange = (value) => {
    setCustomerType(value);
    if (value !== "existing") {
      setSelectedCustomer("");
    }
  };

  const handleSelectCustomer = (selectedOption) => {
    setSelectedCustomer(selectedOption ? selectedOption.value : "");
  };

  const customerOptions = [
    { value: "customer1", label: "Customer 1" },
    { value: "customer2", label: "Customer 2" },
    { value: "customer3", label: "Customer 3" },
    // Add more options as needed
  ];

  const customerSelect = [
    {
      name: "customerType",
      type: "radio",
      value: "existing",
      placeholder: "Existing Customer",
    },
    {
      name: "customerType",
      type: "radio",
      value: "new",
      placeholder: "New Customer",
    },
  ];

  const existingCustomerFields = [
    {
      name: "customers",
      type: "select",
      placeholder: "Select existing customer",
      options: customerOptions,
    },
    {
      name: "guestName",
      type: "text",
      placeholder: "Guest Name",
      defaultValue: "Fatma Gulbin",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      defaultValue: "gulbin@lensfilmsdubai.com",
    },
    {
      name: "mobileNumber",
      type: "text",
      placeholder: "Mobile Number",
      defaultValue: "554289541",
    },
    {
      name: "passportNo",
      type: "text",
      placeholder: "Passport No",
      defaultValue: "784198030695088",
    },
    {
      name: "nationality",
      type: "text",
      placeholder: "Nationality",
      defaultValue: "Turkey",
    },
    { name: "passportFile", type: "file", placeholder: "Passport PDF/PNG/JPG" },
  ];

  const newCustomerFields = [
    { name: "guestName", type: "text", placeholder: "Type your Guest Name" },
    { name: "email", type: "email", placeholder: "Email" },
    {
      name: "mobileNumber",
      type: "text",
      placeholder: "Type your Mobile Number",
    },
    { name: "passportNo", type: "text", placeholder: "Type your Passport No" },
    { name: "nationality", type: "select", placeholder: "Select..." },
    {
      name: "passportFile",
      type: "file",
      placeholder: "Choose a file or drop it here...",
    },
  ];

  return (
    <Row>
      <Col sm="12">
        <Label className="mb-2">Customer Type</Label>
        {customerSelect.map((field, index) => (
          <div key={index} className="d-flex align-items-center mb-1">
            <AdvancedForm
              name={field.placeholder}
              type={field.type}
              control={control}
              errors={errors}
              onChange={() => handleCustomerTypeChange(field.value)}
              defaultValue={field.value}
              checked={customerType === field.value}
            />
            <Label for={field.placeholder} className="ms-2">
              {field.placeholder}
            </Label>
          </div>
        ))}
      </Col>

      {customerType === "existing" && (
        <>
          <Col sm="12" className="mb-2">
            <AdvancedForm
              name="customers"
              type="select"
              control={control}
              errors={errors}
              options={customerOptions}
              placeholder="Select existing customer"
              onChange={handleSelectCustomer}
            />
          </Col>
          {selectedCustomer &&
            existingCustomerFields.slice(1).map((field, index) => (
              <Col sm="6" key={index} className="mb-2">
                <AdvancedForm
                  name={field.name}
                  type={field.type}
                  control={control}
                  errors={errors}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                />
              </Col>
            ))}
        </>
      )}

      {customerType === "new" &&
        newCustomerFields.map((field, index) => (
          <Col sm="6" key={index} className="mb-2">
            <AdvancedForm
              name={field.name}
              type={field.type}
              control={control}
              errors={errors}
              placeholder={field.placeholder}
            />
          </Col>
        ))}

      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
          <span className="align-middle d-sm-inline-block d-none">
            Previous
          </span>
        </Button>
        <Button
          color="primary"
          className="btn-next"
          onClick={() => stepper.next()}
        >
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0" />
        </Button>
      </div>
    </Row>
  );
};

export default CustomerDetails;
