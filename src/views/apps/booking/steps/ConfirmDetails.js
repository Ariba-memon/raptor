import React from "react";
import { Row, Col, Button } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
import AdvancedForm from '../../../forms/advance';

const ConfirmDetails = ({ control, errors, stepper, onSubmit }) => {
  const confirmDetails = [
    { name: "dtcmUploaded", type: "switch", placeholder: "DTCM Uploaded" },
    { name: "passportIDCollected", type: "switch", placeholder: "Passport & ID Collected" },
    { name: "signatureVerified", type: "switch", placeholder: "Signature Verified as per Passport" },
    { name: "smartCodeProvided", type: "switch", placeholder: "Smart Code Provided" },
    { name: "paymentCollected", type: "switch", placeholder: "Payment Collected" },
    { name: "paymentReceived", type: "switch", placeholder: "Payment Received" },
  ];

  return (
    <Row>
      {confirmDetails.map((field, index) => (
        <Col sm="6" key={index} className="mb-2">
          <div className="d-flex align-items-center">
            <div className="form-check form-switch me-2">
              <AdvancedForm
                id={field.name}
                type={field.type}
                name={field.name}
                control={control}
                errors={errors}
                placeholder={field.placeholder}
                // onChange={() => handleSwitchChange(field.name)}
              />
            </div>
          </div>
        </Col>
      ))}
      <div className="footer-buttons d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button
          color="success"
          className="btn-submit"
          onClick={() => onSubmit()} // Trigger final submission
        >
          Submit
        </Button>
      </div>
    </Row>
  );
};

export default ConfirmDetails;
