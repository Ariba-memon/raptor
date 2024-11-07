import { useState, useEffect, useMemo } from "react";
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
  CardFooter,
} from "reactstrap";
import Select from "react-select";
import countries from "react-select-country-list";
import currencyCodes from "currency-codes";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";
import { useLocation } from "react-router-dom";

// ** Mock Data for the select options
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

const BankDetailForm = () => {
  const [count, setCount] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const location = useLocation();
  console.log('location', location?.state?.title)

  // ** Validation Schema
  const schema = yup.object().shape({
    selectedCustomer: yup
      .object()
      .nullable()
      .required("Customer selection is required"),
    accountTitleMulti: yup
      .array()
      .of(yup.string().required("Account Title is required")),
    bankNameMulti: yup
      .array()
      .of(yup.string().required("Bank Name is required")),
    branchNameMulti: yup
      .array()
      .of(yup.string().required("Branch Name is required")),
    countryMulti: yup.array().of(
      yup.object().shape({
        value: yup.string().required("Country is required"),
      })
    ),

    branchCodeMulti: yup
      .array()
      .of(yup.string().required("Branch Code is required")),
    swiftCodeMulti: yup
      .array()
      .of(yup.string().required("Swift Code is required")),
    accountNumberMulti: yup
      .array()
      .of(yup.string().required("Account Number is required")),
    currencyMulti: yup.array().of(
      yup.object().shape({
        value: yup.string().required("Currency is required"),
      })
    ),
    ibanNumberMulti: yup
      .array()
      .of(yup.string().required("IBAN Number is required")),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      accountTitleMulti: [""],
      bankNameMulti: [""],
      branchNameMulti: [""],
      countryMulti: [{}], // Adjust to an empty object if it's an object array
      branchCodeMulti: [""],
      swiftCodeMulti: [""],
      accountNumberMulti: [""],
      currencyMulti: [{}], // Adjust similarly
      ibanNumberMulti: [""],
    },
  });

  const increaseCount = () => {
    // Trigger validation for all current form fields
    trigger().then((isValid) => {
      if (isValid) {
        setCount(count + 1);
        // Initialize the new set of fields
        setValue(`accountTitleMulti[${count}]`, "");
        setValue(`bankNameMulti[${count}]`, "");
        setValue(`branchNameMulti[${count}]`, "");
        setValue(`countryMulti[${count}]`, "");
        setValue(`branchCodeMulti[${count}]`, "");
        setValue(`swiftCodeMulti[${count}]`, "");
        setValue(`accountNumberMulti[${count}]`, "");
        setValue(`currencyMulti[${count}]`, "");
        setValue(`ibanNumberMulti[${count}]`, "");
      } else {
        // If validation fails, focus on the first invalid field
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

  useEffect(() => {
    trigger(); // Re-validate the form when a new set of fields is added
  }, [count, trigger]);

  const deleteForm = (index) => {
    setCount(count - 1);
    const updatedFields = (fieldName) =>
      getValues(fieldName).filter((_, i) => i !== index);

    setValue("accountTitleMulti", updatedFields("accountTitleMulti"));
    setValue("bankNameMulti", updatedFields("bankNameMulti"));
    setValue("branchNameMulti", updatedFields("branchNameMulti"));
    setValue("countryMulti", updatedFields("countryMulti"));
    setValue("branchCodeMulti", updatedFields("branchCodeMulti"));
    setValue("swiftCodeMulti", updatedFields("swiftCodeMulti"));
    setValue("accountNumberMulti", updatedFields("accountNumberMulti"));
    setValue("currencyMulti", updatedFields("currencyMulti"));
    setValue("ibanNumberMulti", updatedFields("ibanNumberMulti"));
  };

  const handleCustomerChange = (selectedOption) => {
    if (selectedOption) {
      const [firstName, lastName] = selectedOption.value.split(" ");
      const email = selectedOption.label.split(" | ")[1];
      const customer = customers.find(
        (customer) =>
          customer.firstName === firstName &&
          customer.lastName === lastName &&
          customer.email === email
      );
      setSelectedCustomer(customer);
    } else {
      setSelectedCustomer(null);
    }
  };

  // ** Memoized Options for Select
  const customerOptions = useMemo(
    () =>
      customers.map((customer) => ({
        value: `${customer.firstName} ${customer.lastName}`,
        label: `${customer.firstName} ${customer.lastName} | ${customer.email}`,
      })),
    []
  );

  // ** Currency and Country Data
  const currencies = currencyCodes.codes();
  const currencyOptions = currencies.map((currency) => {
    const currencyDetails = currencyCodes.code(currency);
    return {
      value: currency,
      label: `${currency} (${currencyDetails.currency})`,
    };
  });

  const countryOptions = countries()
    .getData()
    .map((country) => ({
      value: country.code,
      label: country.label,
    }));

  const onSubmit = (data) => {
    const transformedData = data.accountTitleMulti.map((_, index) => ({
      accountTitle: data.accountTitleMulti[index],
      bankName: data.bankNameMulti[index],
      branchName: data.branchNameMulti[index],
      country: data.countryMulti[index],
      branchCode: data.branchCodeMulti[index],
      swiftCode: data.swiftCodeMulti[index],
      accountNumber: data.accountNumberMulti[index],
      currency: data.currencyMulti[index],
      ibanNumber: data.ibanNumberMulti[index],
    }));

    console.log(transformedData, "AAAAAAAAAAAA");
  };

  return (
    <Card>
      <CardHeader>
        <h4 className="card-title">{location?.state?.title}Bank Details</h4>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-2">
            <Col sm="12">
              <Label for="customerSelect">Select Your Customer</Label>
              <Controller
                name="selectedCustomer"
                control={control}
                render={({ field }) => (
                  <Select
                    id="customerSelect"
                    options={customerOptions}
                    placeholder="Select Your Customer"
                    isClearable={true}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    {...field}
                    onChange={(option) => {
                      handleCustomerChange(option);
                      field.onChange(option);
                    }}
                    value={
                      field.value
                        ? customerOptions.find(
                            (option) => option.value === field.value.value
                          )
                        : null
                    }
                  />
                )}
              />

              {errors.selectedCustomer && (
                <div className="invalid-feedback">
                  {errors.selectedCustomer.message}
                </div>
              )}
            </Col>
          </Row>

          {selectedCustomer && (
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">Customer Name</Label>
                <Input
                  type="text"
                  value={`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}
                  readOnly
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">Customer Email</Label>
                <Input type="text" value={selectedCustomer.email} readOnly />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">Customer Mobile Number</Label>
                <Input type="text" value="971562385664" readOnly />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">Customer Passport No</Label>
                <Input type="text" value="Not Available" readOnly />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">Customer Nationality</Label>
                <Input type="text" value="Not Available" readOnly />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">
                  Customer Passport PDF/PNG/JPG
                </Label>
                <Input type="text" value="Not Available" readOnly />
              </Col>
            </Row>
          )}

          <Col sm={12}>
            <hr />
          </Col>

          <Repeater count={count}>
            {(i) => {
              const Tag = i === 0 ? "div" : SlideDown;
              return (
                <Tag key={i}>
                  <Row className="justify-content-between align-items-center">
                    <Col sm="12" className="d-flex justify-content-end mb-1">
                      <Button
                        color="danger"
                        onClick={() => deleteForm(i)}
                        outline
                        style={{ padding: 0, border: "none" }}
                      >
                        <Trash2 size={20} />
                      </Button>
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`accountTitle-${i}`}>
                        Account Title
                      </Label>
                      <Controller
                        name={`accountTitleMulti[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <Input {...field} placeholder="Account Title" />
                            {errors.accountTitleMulti?.[i] && (
                              <div className="invalid-feedback">
                                {errors.accountTitleMulti[i]?.message}
                              </div>
                            )}
                          </>
                        )}
                      />
                    </Col>

                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`bankName-${i}`}>
                        Bank Name
                      </Label>
                      <Controller
                        name={`bankNameMulti[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Bank Name" />
                        )}
                      />
                      {errors.bankNameMulti?.[i] && (
                        <div className="invalid-feedback">
                          {errors.bankNameMulti[i]?.message}
                        </div>
                      )}
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`branchName-${i}`}>
                        Branch Name
                      </Label>
                      <Controller
                        name={`branchNameMulti[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Branch Name" />
                        )}
                      />
                      {errors.branchNameMulti?.[i] && (
                        <div className="invalid-feedback">
                          {errors.branchNameMulti[i]?.message}
                        </div>
                      )}
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`country-${i}`}>
                        Country
                      </Label>
                      <Controller
                        name={`countryMulti[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            id={`country-${i}`}
                            options={countryOptions}
                            placeholder="Select Your Country"
                            className="react-select"
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            {...field}
                            isClearable
                          />
                        )}
                      />

                      {errors.countryMulti?.[i]?.value && (
                        <div className="invalid-feedback">
                          {errors.countryMulti[i]?.value.message}
                        </div>
                      )}
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`branchCode-${i}`}>
                        Branch Code
                      </Label>
                      <Controller
                        name={`branchCodeMulti[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Branch Code" />
                        )}
                      />
                      {errors.branchCodeMulti?.[i] && (
                        <div className="invalid-feedback">
                          {errors.branchCodeMulti[i]?.message}
                        </div>
                      )}
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`swiftCode-${i}`}>
                        Swift Code
                      </Label>
                      <Controller
                        name={`swiftCodeMulti[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Swift Code" />
                        )}
                      />
                      {errors.swiftCodeMulti?.[i] && (
                        <div className="invalid-feedback">
                          {errors.swiftCodeMulti[i]?.message}
                        </div>
                      )}
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`accountNumber-${i}`}>
                        Account Number
                      </Label>
                      <Controller
                        name={`accountNumberMulti[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Account Number" />
                        )}
                      />
                      {errors.accountNumberMulti?.[i] && (
                        <div className="invalid-feedback">
                          {errors.accountNumberMulti[i]?.message}
                        </div>
                      )}
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`currency-${i}`}>
                        Currency
                      </Label>
                      <Controller
                        name={`currencyMulti[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            id={`currency-${i}`}
                            options={currencyOptions}
                            placeholder="Select Your Currency"
                            className="react-select"
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            {...field}
                            isClearable
                          />
                        )}
                      />
                      {errors.currencyMulti?.[i]?.value && (
                        <div className="invalid-feedback">
                          {errors.currencyMulti[i]?.value.message}
                        </div>
                      )}
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`ibanNumber-${i}`}>
                        IBAN Number
                      </Label>
                      <Controller
                        name={`ibanNumberMulti[${i}]`}
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="IBAN Number" />
                        )}
                      />
                      {errors.ibanNumberMulti?.[i] && (
                        <div className="invalid-feedback">
                          {errors.ibanNumberMulti[i]?.message}
                        </div>
                      )}
                    </Col>

                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>
                </Tag>
              );
            }}
          </Repeater>
          <Row>
            <Col sm="6">
              <Button color="primary" outline onClick={increaseCount}>
                <Plus size={15} />
                <span className="align-middle ms-50">Add More</span>
              </Button>
            </Col>
            <Col sm="6" className="text-end">
              <Button type="submit" color="primary" disabled={!isValid}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BankDetailForm;
