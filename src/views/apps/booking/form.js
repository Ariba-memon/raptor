import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "reactstrap";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import { FileText } from "react-feather";
import { useLocation } from "react-router-dom";
import { propertySchema } from "../../forms/shemas";
import PropertyDetails from "./steps/PropertyDetails";
import ConfirmDetails from "./steps/ConfirmDetails";
import CustomerDetails from "./steps/CustomerDetails";
import ReservationDetail from "./steps/ReservationDetail";
import ReservationPayoutDetails from "./steps/ReservationPayoutDetails";
import WizardWithoutCardVertical from "../../forms/wizard/WizardWithoutCardVertical";

const MyForm = () => {
  const [stepper, setStepper] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(propertySchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
  };

  const steps = [
    {
      id: "property-details",
      title: "Property Details",
      subtitle: "Enter Your Property Details.",
      icon: <FileText size={18} />,
      content: (
        <PropertyDetails
          control={control}
          errors={errors}
          stepper={stepper}
          type="modern-vertical"
          trigger={trigger}
        />
      ),
    },
    {
      id: "customer-details",
      title: "Customer Details",
      subtitle: "Enter Customer Details.",
      icon: <FileText size={18} />,
      content: (
        <CustomerDetails
          control={control}
          errors={errors}
          stepper={stepper}
          type="modern-vertical"
          trigger={trigger}
        />
      ),
    },
    {
      id: "reservation-layout",
      title: "Reservation Details",
      subtitle: "Enter Reservation Details.",
      icon: <FileText size={18} />,
      content: (
        <ReservationDetail
          control={control}
          errors={errors}
          stepper={stepper}
          type="modern-vertical"
          trigger={trigger}
        />
      ),
    },
    {
      id: "reservation-payout-details",
      title: "Reservation Payout Details",
      subtitle: "Enter Reservation Payout Details.",
      icon: <FileText size={18} />,
      content: (
        <ReservationPayoutDetails
          control={control}
          errors={errors}
          stepper={stepper}
          type="modern-vertical"
          trigger={trigger}
        />
      ),
    },

    {
      id: "confirm-details",
      title: "Confirm Details",
      subtitle: "Checked your Confirm Details.",
      icon: <FileText size={18} />,
      content: (
        <ConfirmDetails
          control={control}
          errors={errors}
          stepper={stepper}
          type="modern-vertical"
          trigger={trigger}
        />
      ),
    },
  ];

  const location = useLocation();
  console.log("location??", location.state.title);

  return (
    <>
      <BreadCrumbs
        title={`${location.state.title} Booking`}
        data={[{ title: "Bookings" }, { title: location.state.title }]}
        link="/apps/booking/list"
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <WizardWithoutCardVertical
          control={control}
          errors={errors}
          setStepper={setStepper}
          steps={steps}
          trigger={trigger}
        />
      </Form>
    </>
  );
};

export default MyForm;
