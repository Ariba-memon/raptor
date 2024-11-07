import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { ArrowLeft, ArrowRight } from 'react-feather';
import AdvancedForm from '../../../forms/advance';
import "./style.css";

const ReservationDetail = ({ control, errors, stepper }) => {
  const layoutFields = [
    { name: 'checkInType', type: 'select', placeholder: 'Check in Type' },
    { name: 'noOfAdults', type: 'number', placeholder: 'Type your no of Adults' },
    { name: 'noOfChildren', type: 'number', placeholder: 'Type your No. of Children' },
    { name: 'confirmationCode', type: 'text', placeholder: 'Type your Confirmation Code/ Ref' },
    { name: 'bookingAgent', type: 'select', placeholder: 'Select Booking Agent' },
    { name: 'reservationDate', type: 'date', placeholder: 'Select Reservation Date' },
    { name: 'modeOfPayment', type: 'select', placeholder: 'Select Mode of Payment' },
    { name: 'arrivalCheckInDate', type: 'date', placeholder: 'Select Arrival Check-In Date' },
    { name: 'departureCheckOutDate', type: 'date', placeholder: 'Select Departure Check-Out Date' }
  ];

  return (
    <Row>
      {layoutFields.map((field, index) => (
        <Col sm="6" key={index} className="mb-2">
          <AdvancedForm
            name={field.name}
            type={field.type}
            control={control}
            errors={errors}
            placeholder={field.placeholder}
            options={field.options}
          />
        </Col>
      ))}
      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0" />
        </Button>
      </div>
    </Row>
  );
};

export default ReservationDetail;
