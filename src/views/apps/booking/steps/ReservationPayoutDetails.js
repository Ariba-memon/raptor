import React, { useState } from "react";
import { Row, Col, Button, Input } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
import AdvancedForm from "../../../forms/advance";
import "./style.css";

const ReservationPayoutDetails = ({ control, errors, stepper }) => {
  const [switchStates, setSwitchStates] = useState({});

  const handleSwitchChange = (name) => (event) => {
    if (event && event.target) {
      setSwitchStates((prevState) => ({
        ...prevState,
        [name]: event.target.checked,
      }));
    } else {
      console.error("Event target is undefined");
    }
  };

  const payoutFields = [
    {
      name: "securityDepositAmount",
      type: "number",
      placeholder: "Security deposit amount",
    },
    { name: "totalPayout", type: "number", placeholder: "Total payout" },
    { name: "hostServiceFee", type: "number", placeholder: "Host service fee" },
    {
      name: "totalCollection",
      type: "number",
      placeholder: "Total collection",
      readOnly: true,
    },
    {
      name: "additionalFeesCleaningFee",
      type: "number",
      placeholder: "Cleaning fee",
    },
    {
      name: "totalAdditionalFee",
      type: "number",
      placeholder: "Total additional fee",
      readOnly: true,
    },
    {
      name: "totalRoomRentGMVAT",
      type: "number",
      placeholder: "Total room rent + GM+VAT",
      readOnly: true,
    },
    {
      name: "roomRentAmountInclPortalFee",
      type: "number",
      placeholder: "Room rent amount: (Incl. portal fee)",
      readOnly: true,
    },
    {
      name: "roomRentAmountHostPayable",
      type: "number",
      placeholder: "Room rent amount: (Host payable)",
      readOnly: true,
    },
    {
      name: "guestServiceFee",
      type: "number",
      placeholder: "Guest service fee",
    },
    {
      name: "guestManagementFee",
      type: "number",
      placeholder: "Guest management fee",
    },
    {
      name: "hostManagementFee",
      type: "number",
      placeholder: "Host management fee",
    },
    {
      name: "totalRoomRentAmountInclGMFee",
      type: "number",
      placeholder: "Total room rent amount (incl. GM fee)",
    },
  ];

  const switchFields = [
    { name: "customSwitch", placeholder: "VAT 5% on booking room rent" },
    { name: "vatServiceFee", placeholder: "VAT 5% on service fee" },
    { name: "vatCleaningFee", placeholder: "VAT 5% on cleaning fee" },
    {
      name: "vatGuestManagementFee",
      placeholder: "VAT 5% on guest management fee",
    },
    {
      name: "vatHostManagementFee",
      placeholder: "VAT 5% on host management fee",
    },
    { name: "totalPayoutVat", placeholder: "Total payout VAT" },
  ];

  return (
    <Row>
      {payoutFields.map((field, index) => (
        <Col sm="6" key={index} className="mb-2">
          <AdvancedForm
            id={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            readOnly={field.readOnly}
            control={control}
            errors={errors}
          />
        </Col>
      ))}
      <Row sm="12">
        {switchFields.map((field, index) => (
          <Col sm="6" key={index} className="mb-2">
            <div className="d-flex align-items-center">
              <div className="form-check form-switch me-2">
                <AdvancedForm
                  id={field.name}
                  type="switch"
                  name={field.name}
                  placeholder={field.placeholder}
                  control={control}
                  errors={errors}
                  onChange={handleSwitchChange(field.name)}
                />
              </div>
              {/* Conditionally render input field based on switch state */}
              {switchStates[field.name] && (
                <div className="w-25 ms-3">
                  <Input
                    id={`${field.name}`}
                    type="number"
                    name={`${field.name}`}
                    placeholder="20"
                    readOnly
                    control={control}
                    errors={errors}
                  />
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
      <Col sm="12">
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
      </Col>
    </Row>
  );
};

export default ReservationPayoutDetails;
