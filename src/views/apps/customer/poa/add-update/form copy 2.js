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

const PoaForm = () => {
  const [count, setCount] = useState(1);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedPurposes, setSelectedPurposes] = useState([]);

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
    { value: "Purpose1", label: "Purpose 1" },
    { value: "Purpose2", label: "Purpose 2" },
    { value: "Purpose3", label: "Purpose 3" },
    { value: "Purpose4", label: "Purpose 4" },
    { value: "Purpose5", label: "Purpose 5" },
  ];

  const poaOptions = useMemo(
    () =>
      poaOps.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    []
  );

  // Validation Schema
  const schema = yup.object().shape({
    selectedCustomers: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
      )
      .required("At least one customer must be selected"),
    dateOfIssue: yup.date().required(),
    expiry: yup.date().required(),
    dateOfReValidation: yup.date().required(),
    reValidationExpiry: yup.date().required(),
    typeOfPoa: yup.object().required(),
    specificReason: yup.string().required(),
    purposeOfPoa: yup.array().of(yup.string()).required(),
    codePowerNo: yup.string().required(),
    codePowerBranch: yup.string().required(),
    numberOfPoaWithUs: yup.string().required(),
    poaDoneThru: yup.string().required(),
    amountPaidCourtFees: yup.string().required(),
    amountPaidServiceFees: yup.string().required(),
    attachment: yup.mixed().required("Attachment is required"),
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

  const increaseCount = () => {
    trigger().then((isValid) => {
      if (isValid) {
        setCount(count + 1);
        setSelectedCustomers([...selectedCustomers, null]);
      } else {
        // Focus on the first invalid field if validation fails
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

  const handleCustomerChange = (option, index) => {
    const updatedCustomers = [...selectedCustomers];
    updatedCustomers[index] = option;
    setSelectedCustomers(updatedCustomers);
    setValue("selectedCustomers", updatedCustomers);
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
        <h4 className="card-title">Power of Attorney</h4>
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
                        Select Your Customer
                      </Label>
                      <Controller
                        name={`selectedCustomers[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            id={`customerSelect_${i}`}
                            options={customerOptions}
                            placeholder="Select Your Customer"
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
                      {errors.selectedCustomers?.[i] && (
                        <div className="invalid-feedback">
                          {errors.selectedCustomers[i]?.message}
                        </div>
                      )}
                    </Col>
                    <Col sm={12} className="d-flex mt-1 justify-content-end">
                      <Plus
                        size={20}
                        className="text-primary outline cursor-pointer border rounded"
                        onClick={increaseCount}
                        disabled={selectedCustomers.length === 0}
                      />
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
                    </Row>
                  )}
                </Tag>
              );
            }}
          </Repeater>

          {/* Add More Button */}
          {selectedCustomers.length > 0 && (
            <Button type="button" color="primary" onClick={increaseCount}>
              <Plus size={15} />
              <span className="align-middle ms-50">Add More</span>
            </Button>
          )}

          {/* Additional Fields */}
          <Row className="mb-2">
            <Col sm="6">
              <Label for="typeOfPoa">POA Type</Label>
              <Controller
                name="typeOfPoa"
                control={control}
                render={({ field }) => (
                  <Select
                    id="typeOfPoa"
                    options={poaOptions}
                    placeholder="Select POA Type"
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
              <Label for="specificReason">Specific Reason</Label>
              <Controller
                name="specificReason"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="specificReason"
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

          {/* Purpose of POA */}
          <Label for="purposeOfPoa">Purpose of POA</Label>
          <div className="d-flex flex-column">
            {purposeOptions.map((option) => (
              <div key={option.value} className="form-check">
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
            ))}
            {errors.purposeOfPoa && (
              <div className="invalid-feedback">
                {errors.purposeOfPoa.message}
              </div>
            )}
          </div>

          {/* Additional Fields */}
          <Row className="mb-2">
            <Col sm="6">
              <Label for="codePowerNo">Code Power No</Label>
              <Controller
                name="codePowerNo"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="codePowerNo"
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
              <Label for="codePowerBranch">Code Power Branch</Label>
              <Controller
                name="codePowerBranch"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="codePowerBranch"
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
              <Label for="numberOfPoaWithUs">Number of POA with Us</Label>
              <Controller
                name="numberOfPoaWithUs"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="numberOfPoaWithUs"
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
              <Label for="poaDoneThru">POA Done Thru</Label>
              <Controller
                name="poaDoneThru"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="poaDoneThru"
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
              <Label for="amountPaidCourtFees">Amount Paid Court Fees</Label>
              <Controller
                name="amountPaidCourtFees"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="amountPaidCourtFees"
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
                Amount Paid Service Fees
              </Label>
              <Controller
                name="amountPaidServiceFees"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    id="amountPaidServiceFees"
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
          <Row className="mb-2">
            <Col sm="12">
              <Label for="attachment">Attachment</Label>
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
          <Row>
            <Col sm="12" className="d-flex justify-content-between">
              <Button type="submit" color="success" disabled={!isValid}>
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
