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
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";

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

const PoaForm = () => {
  const [count, setCount] = useState(1);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

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
          <Repeater count={count}>
            {(i) => {
              const Tag = i === 0 ? "div" : SlideDown;
              return (
                <Tag key={i}>
                  <Row className="mb-2">
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
                    <Col sm="12">
                      <Button
                        color="danger"
                        outline
                        onClick={() => deleteForm(i)}
                      >
                        <Trash2 size={15} />
                        <span className="align-middle ms-50">Delete</span>
                      </Button>
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

export default PoaForm;
