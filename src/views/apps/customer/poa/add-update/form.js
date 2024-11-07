import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Repeater from "@components/repeater";
import { Trash2, Plus } from "react-feather";
import { SlideDown } from "react-slidedown";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  Input as CustomInput,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";
import { useLocation } from "react-router-dom";

const PoaForm = () => {
  const [count, setCount] = useState(1);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const location = useLocation();

  console.log('location', location.state.title)

  // Mock Data for the select options
  const customers = [
    { firstName: "Dhruv", lastName: "Gujarati", email: "dhruv@gmail.com" },
    { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
    { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com" },
    { firstName: "Emily", lastName: "Jones", email: "emily.jones@example.com" },
    {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
    },
  ];

  const poaOps = [
    { value: "Type1", label: "Type 1" },
    { value: "Type2", label: "Type 2" },
    { value: "Type3", label: "Type 3" },
  ];

  const purposeOptions = [
    { value: "Purpose1", label: "Buying" },
    { value: "Purpose2", label: "Selling" },
    { value: "Purpose3", label: "Gifting" },
    { value: "Purpose4", label: "Renting" },
    { value: "Purpose5", label: "Management" },
    { value: "Purpose6", label: "Visa" },
  ];

  const poaOptions = useMemo(
    () =>
      poaOps.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    []
  );

  const schema = yup.object().shape({
    // typeOfPoa: yup.string().required("POA type is required"),
    specificReason: yup.string().required("Specific reason is required"),
    codePowerNo: yup.string().required("Code Power No is required"),
    codePowerBranch: yup.string().required("Code Power Branch is required"),
    numberOfPoaWithUs: yup
      .string()
      .required("Number of POA with us is required"),
    poaDoneThru: yup.string().required("POA Done Thru is required"),
    amountPaidCourtFees: yup
      .string()
      .required("Amount Paid Court Fees is required"),
    amountPaidServiceFees: yup
      .string()
      .required("Amount Paid Service Fees is required"),
    attachment: yup.mixed().required("Attachment is required"),
    selectedCustomers: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
      )
      .required("At least one customer must be selected"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      selectedCustomers: [],
      dateOfIssue: "",
      expiry: "",
      dateOfReValidation: "",
      reValidationExpiry: "",
      typeOfPoa: null,
      specificReason: "",
      purposeOfPoa: [],
      codePowerNo: "",
      codePowerBranch: "",
      numberOfPoaWithUs: "",
      poaDoneThru: "",
      amountPaidCourtFees: "",
      amountPaidServiceFees: "",
      attachment: null,
    },
  });

  // const increaseCount = () => {
  //   trigger().then((isValid) => {
  //     console.log("isValid", isValid);
  //     if (isValid) {
  //       setCount(count + 1);
  //       setSelectedCustomers([...selectedCustomers, null]);
  //     }
  //   });
  //   // trigger().then((isValid) => {
  //   //   if (isValid) {
  //   //     setCount(count + 1);
  //   //     setSelectedCustomers([...selectedCustomers, null]);
  //   //   } else {
  //   //     // Focus on the first invalid field if validation fails
  //   //     const firstErrorField = Object.keys(errors).find(
  //   //       (field) => errors[field]?.[0]
  //   //     );
  //   //     if (firstErrorField) {
  //   //       const element = document.querySelector(`[name="${firstErrorField}"]`);
  //   //       if (element) {
  //   //         element.focus();
  //   //       }
  //   //     }
  //   //   }
  //   // });
  // };

  const increaseCount = () => {
    // Check if the form is valid for customer fields
    trigger("selectedCustomers").then((isValid) => {
      if (isValid) {
        setCount(count + 1);
        setSelectedCustomers([...selectedCustomers, null]);
      } else {
        // Handle validation errors if needed
        console.log("Customer fields are not valid");
        const firstErrorField = Object.keys(errors).find(
          (field) => errors[field]?.[0]
        );
        if (firstErrorField) {
          const element = document.querySelector(`[name="${firstErrorField}"]`);
          if (element) {
            element.focus();
          }
        }
      }
    });
  };

  const deleteForm = (index) => {
    setCount(count - 1);
    setSelectedCustomers(selectedCustomers.filter((_, i) => i !== index));
  };

  // const handleCustomerChange = (option, index) => {
  //   const updatedCustomers = [...selectedCustomers];
  //   updatedCustomers[index] = option;
  //   setSelectedCustomers(updatedCustomers);
  //   setValue("selectedCustomers", updatedCustomers);
  // };
  const handleCustomerChange = (option, index) => {
    const updatedCustomers = [...selectedCustomers];
    updatedCustomers[index] = option;
    setSelectedCustomers(updatedCustomers);
    setValue("selectedCustomers", updatedCustomers);

    // Trigger validation for the customer fields only
    trigger("selectedCustomers");
  };

  const handlePurposeChange = (e) => {
    const { value, checked } = e.target;
    const updatedPurposes = checked
      ? [...selectedPurposes, value]
      : selectedPurposes.filter((purpose) => purpose !== value);

    setSelectedPurposes(updatedPurposes);
    setValue("purposeOfPoa", updatedPurposes);
  };

  // Memoized Options for Select
  const customerOptions = useMemo(
    () =>
      customers.map((customer) => ({
        value: `${customer.firstName} ${customer.lastName}`,
        label: `${customer.firstName} ${customer.lastName} | ${customer.email}`,
      })),
    []
  );

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <h4 className="card-title">{location.state.title} Power of Attorney</h4>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Customer Selection */}
          <Repeater count={count}>
            {(i) => {
              const Tag = i === 0 ? "div" : SlideDown;
              return (
                <Tag key={i}>
                  <Row className="mb-2">
                    <Col sm="12" className="d-flex justify-content-end">
                      <Trash2
                        size={18}
                        className="text-danger outline cursor-pointer"
                        onClick={() => deleteForm(i)}
                      />
                    </Col>
                    <Col sm="12">
                      <Label for={`customerSelect_${i}`}>
                        Select your customer
                      </Label>
                      <Controller
                        name={`selectedCustomers[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            id={`customerSelect_${i}`}
                            options={customerOptions}
                            placeholder="Select your customer"
                            isClearable={true}
                            className="react-select"
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            {...field}
                            onChange={(option) => {
                              handleCustomerChange(option, i);
                              field.onChange(option);
                            }}
                            value={
                              field.value
                                ? customerOptions.find(
                                    (option) =>
                                      option.value === field.value.value
                                  )
                                : null
                            }
                          />
                        )}
                      />
                      {/* {console.log(
                        errors?.selectedCustomers?.length  &&
                          errors?.selectedCustomers[i]?.value?.message,
                        "Errors"
                      )} */}
                      {errors.selectedCustomers?.[i] && (
                        <div className="invalid-feedback">
                          {errors.selectedCustomers[i]?.message}
                        </div>
                      )}
                    </Col>
                  </Row>
                  {selectedCustomers[i] && (
                    <Row>
                      <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label">Customer Name</Label>
                        <Input
                          type="text"
                          value={`${
                            selectedCustomers[i]?.value.split(" ")[0]
                          } ${selectedCustomers[i]?.value.split(" ")[1]}`}
                          readOnly
                        />
                      </Col>
                      <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label">Customer Email</Label>
                        <Input
                          type="text"
                          value={selectedCustomers[i]?.label.split(" | ")[1]}
                          readOnly
                        />
                      </Col>
                      <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label">
                          Customer Mobile Number
                        </Label>
                        <Input
                          type="text"
                          value={
                            selectedCustomers[i]?.mobileNumber ||
                            "Not Available"
                          }
                          readOnly
                        />
                      </Col>
                      <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label">
                          Customer Passport No
                        </Label>
                        <Input
                          type="text"
                          value={
                            selectedCustomers[i]?.passportNumber ||
                            "Not Available"
                          }
                          readOnly
                        />
                      </Col>
                      <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label">
                          Customer Nationality
                        </Label>
                        <Input
                          type="text"
                          value={
                            selectedCustomers[i]?.nationality || "Not Available"
                          }
                          readOnly
                        />
                      </Col>
                      <Col md="6" sm="12" className="mb-1">
                        <Label className="form-label">
                          Customer Passport PDF/PNG/JPG
                        </Label>
                        {/* {selectedCustomers[i]?.passportFile ? (
                          <a
                            href={selectedCustomers[i]?.passportFile || "Not Available"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Passport File
                          </a>
                        ) : (
                          <span>No file uploaded</span>
                        )} */}
                        {
                          <div>
                            <a
                              href={
                                selectedCustomers[i]?.passportFile ||
                                "Not Available"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Input
                                type="text"
                                value={
                                  selectedCustomers[i]?.passportFile ||
                                  "Not Available"
                                }
                                readOnly
                              />
                            </a>
                          </div>
                        }
                      </Col>
                    </Row>
                  )}
                </Tag>
              );
            }}
          </Repeater>

          <div className="mt-1">
            {/* Add More Button */}
            {selectedCustomers.length > 0 && (
              <Button
                type="button"
                color="primary"
                onClick={increaseCount}
                className="mb-1"
                disabled={isValid} // Ensure other fields are valid if required
              >
                <Plus size={20} />
                <span className="align-middle ms-50">Add More</span>
              </Button>
            )}
          </div>

          {/* Section Divider */}
          <hr />

          {/* Input Fields */}
          <Row className="mb-2">
            <Col sm="6">
              <Label for="typeOfPoa">Type of POA</Label>
              <Controller
                name="typeOfPoa"
                control={control}
                render={({ field }) => (
                  <Select
                    id="typeOfPoa"
                    options={poaOptions}
                    placeholder="Select POA type"
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    {...field}
                  />
                )}
              />
              {errors.typeOfPoa && (
                <div className="invalid-feedback">
                  {errors.typeOfPoa.message}
                </div>
              )}
            </Col>
            <Col sm="6">
              <Label for="specificReason">Specific reason</Label>
              <Controller
                name="specificReason"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="specificReason"
                    placeholder="reason"
                    {...field}
                    invalid={!!errors.specificReason}
                  />
                )}
              />
              {errors.specificReason && (
                <div className="invalid-feedback">
                  {errors.specificReason.message}
                </div>
              )}
            </Col>
          </Row>

          {/* Section Divider */}
          <hr />

          {/* Date Fields */}
          <Row className="mb-2">
            <Col sm="6">
              <Label for="dateOfIssue">Date of issue</Label>
              <Controller
                name="dateOfIssue"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="date"
                    id="dateOfIssue"
                    {...field}
                    invalid={!!errors.dateOfIssue}
                  />
                )}
              />
              {errors.dateOfIssue && (
                <div className="invalid-feedback">
                  {errors.dateOfIssue.message}
                </div>
              )}
            </Col>
            <Col sm="6">
              <Label for="expiry">Expiry</Label>
              <Controller
                name="expiry"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="date"
                    id="expiry"
                    {...field}
                    invalid={!!errors.expiry}
                  />
                )}
              />
              {errors.expiry && (
                <div className="invalid-feedback">{errors.expiry.message}</div>
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm="6">
              <Label for="dateOfReValidation">Date of re-validation</Label>
              <Controller
                name="dateOfReValidation"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="date"
                    id="dateOfReValidation"
                    {...field}
                    invalid={!!errors.dateOfReValidation}
                  />
                )}
              />
              {errors.dateOfReValidation && (
                <div className="invalid-feedback">
                  {errors.dateOfReValidation.message}
                </div>
              )}
            </Col>
            <Col sm="6">
              <Label for="reValidationExpiry">Re-validation expiry</Label>
              <Controller
                name="reValidationExpiry"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="date"
                    id="reValidationExpiry"
                    {...field}
                    invalid={!!errors.reValidationExpiry}
                  />
                )}
              />
              {errors.reValidationExpiry && (
                <div className="invalid-feedback">
                  {errors.reValidationExpiry.message}
                </div>
              )}
            </Col>
          </Row>

          {/* Section Divider */}
          <hr />

          {/* Checkbox Fields */}
          <Label for="purposeOfPoa" className="mt-1">
            Purpose of POA
          </Label>
          <Row className="mb-2">
            {purposeOptions.map((option) => (
              <Col sm="4" key={option.value}>
                <div className="form-check">
                  <Input
                    type="checkbox"
                    id={option.value}
                    value={option.value}
                    onChange={handlePurposeChange}
                    checked={selectedPurposes.includes(option.value)}
                  />
                  <Label
                    for={option.value}
                    className="form-check-label"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    {option.label}
                  </Label>
                </div>
              </Col>
            ))}
            {errors.purposeOfPoa && (
              <div className="invalid-feedback">
                {errors.purposeOfPoa.message}
              </div>
            )}
          </Row>

          {/* Section Divider */}
          <hr />

          {/* Additional Fields */}
          <Row className="mb-2">
            <Col sm="6">
              <Label for="codePowerNo">Code power no.</Label>
              <Controller
                name="codePowerNo"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="codePowerNo"
                    placeholder="Code power no."
                    {...field}
                    invalid={!!errors.codePowerNo}
                  />
                )}
              />
              {errors.codePowerNo && (
                <div className="invalid-feedback">
                  {errors.codePowerNo.message}
                </div>
              )}
            </Col>
            <Col sm="6">
              <Label for="codePowerBranch">Code power branch</Label>
              <Controller
                name="codePowerBranch"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="codePowerBranch"
                    placeholder="Code power branch"
                    {...field}
                    invalid={!!errors.codePowerBranch}
                  />
                )}
              />
              {errors.codePowerBranch && (
                <div className="invalid-feedback">
                  {errors.codePowerBranch.message}
                </div>
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm="6">
              <Label for="numberOfPoaWithUs">
                No. of POA (original) with us
              </Label>
              <Controller
                name="numberOfPoaWithUs"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="numberOfPoaWithUs"
                    placeholder="No. of POA (original) with us"
                    {...field}
                    invalid={!!errors.numberOfPoaWithUs}
                  />
                )}
              />
              {errors.numberOfPoaWithUs && (
                <div className="invalid-feedback">
                  {errors.numberOfPoaWithUs.message}
                </div>
              )}
            </Col>
            <Col sm="6">
              <Label for="poaDoneThru">POA done thru lawyer/typist/self</Label>
              <Controller
                name="poaDoneThru"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="poaDoneThru"
                    placeholder="POA done thru lawyer/typist/self"
                    {...field}
                    invalid={!!errors.poaDoneThru}
                  />
                )}
              />
              {errors.poaDoneThru && (
                <div className="invalid-feedback">
                  {errors.poaDoneThru.message}
                </div>
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm="6">
              <Label for="amountPaidCourtFees">
                Amount paid (AED) | Court fees
              </Label>
              <Controller
                name="amountPaidCourtFees"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="amountPaidCourtFees"
                    placeholder="Amount paid (AED) | Court fees"
                    {...field}
                    invalid={!!errors.amountPaidCourtFees}
                  />
                )}
              />
              {errors.amountPaidCourtFees && (
                <div className="invalid-feedback">
                  {errors.amountPaidCourtFees.message}
                </div>
              )}
            </Col>
            <Col sm="6">
              <Label for="amountPaidServiceFees">
                Amount paid (AED) | Service fees
              </Label>
              <Controller
                name="amountPaidServiceFees"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="amountPaidServiceFees"
                    placeholder="Amount paid (AED) | Service fees"
                    {...field}
                    invalid={!!errors.amountPaidServiceFees}
                  />
                )}
              />
              {errors.amountPaidServiceFees && (
                <div className="invalid-feedback">
                  {errors.amountPaidServiceFees.message}
                </div>
              )}
            </Col>
          </Row>

          {/* Section Divider */}
          <hr />

          {/* File Attachment */}
          <Row className="mb-2">
            <Col sm="12">
              <Label for="attachment">Attachment (PDF/PNG/JPG)</Label>
              <Controller
                name="attachment"
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    id="attachment"
                    {...field}
                    invalid={!!errors.attachment}
                  />
                )}
              />
              {errors.attachment && (
                <div className="invalid-feedback">
                  {errors.attachment.message}
                </div>
              )}
            </Col>
          </Row>

          {/* Submit Button */}
          <Row>
            <Col sm="12" className="d-flex justify-content-end">
              <Button type="submit" color="primary" disabled={isValid}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default PoaForm;
