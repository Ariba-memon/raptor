import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
import AdvancedForm from "../../../forms/advance";

const PropertyDetails = ({ control, errors, stepper }) => {
  const [selectedProperty, setSelectedProperty] = useState("");

  // Define your property options here
  const propertyOptions = [
    { value: "property1", label: "Property 1" },
    { value: "property2", label: "Property 2" },
    { value: "property3", label: "Property 3" },
    // Add more properties as needed
  ];

  const propertyDetails = [
    {
      name: "property",
      type: "select",
      placeholder: "Property Name",
      options: propertyOptions,
    },
  ];

  const propertyDetailsFields = [
    { name: "unit", type: "number", placeholder: "Unit number" },
    { name: "communityName", type: "text", placeholder: "Community name" },
    { name: "projectName", type: "text", placeholder: "Project name" },
    { name: "buildingName", type: "text", placeholder: "Building name" },
    { name: "floorLevel", type: "number", placeholder: "Floor Level" },
  ];

  const handlePropertyChange = (selectedOption) => {
    setSelectedProperty(selectedOption ? selectedOption.value : "");
  };

  return (
    <Row>
      {propertyDetails.map((field, index) => (
        <Col sm="12" key={index} className="mb-2">
          <AdvancedForm
            name={field.name}
            type={field.type}
            control={control}
            errors={errors}
            placeholder={field.placeholder}
            options={field.options}
            onChange={handlePropertyChange}
          />
        </Col>
      ))}
      
      {selectedProperty && (
        <>
          {propertyDetailsFields.map((field, index) => (
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
        </>
      )}

      <div className="d-flex justify-content-between">
        <Button color="secondary" className="btn-prev" outline disabled>
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

export default PropertyDetails;
