import { useState } from "react";
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
import countries from "react-select-country-list";
import currencyCodes from "currency-codes";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// Mock data for the select options
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
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const deleteForm = (e) => {
    e.preventDefault();
    const slideDownWrapper = e.target.closest(".react-slidedown"),
      form = e.target.closest("form");
    if (slideDownWrapper) {
      slideDownWrapper.remove();
    } else {
      form.remove();
    }
  };

  // Handle change in customer selection
  const handleCustomerChange = (selectedOption) => {
    const [firstName, lastName] = selectedOption.value.split(" ");
    const email = selectedOption.label.split(" | ")[1];
    const customer = customers.find(
      (customer) =>
        customer.firstName === firstName &&
        customer.lastName === lastName &&
        customer.email === email
    );
    setSelectedCustomer(customer);
  };

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  // Get currency data
  const currencies = currencyCodes.codes();

  // Map the currency data to options
  const currencyOptions = currencies.map((currency) => {
    const currencyDetails = currencyCodes.code(currency);
    console.log('currencyDetails', currencyDetails)
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

  return (
    <Card>
      <CardHeader>
        <h4 className="card-title">Add Bank Details</h4>
      </CardHeader>
      <CardBody>
        <Row className="mb-2">
          <Col sm="12">
            <Label for="customerSelect">Select Your Customer</Label>

            <Select
              id="customerSelect"
              options={customers.map((customer) => ({
                value: `${customer.firstName} ${customer.lastName}`,
                label: `${customer.firstName} ${customer.lastName} | ${customer.email}`,
              }))}
              placeholder="Select Your Customer"
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              // defaultValue={customers[0]}
              onChange={handleCustomerChange}
            />
          </Col>
        </Row>

        {selectedCustomer && (
          <Form>
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
          </Form>
        )}

        <Col sm={12}>
          <hr />
        </Col>

        <Form>
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Account Title</Label>
              <Input type="text" placeholder="Type your Account Title" />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Bank Name</Label>
              <Input type="text" placeholder="Type your Bank Name" />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Branch Name</Label>
              <Input type="text" placeholder="Type your Branch Name" />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Country</Label>
              <Select
                options={countryOptions}
                placeholder="Select Country"
                onChange={handleCountryChange}
                value={selectedCountry}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Branch Code</Label>
              <Input type="text" placeholder="Type your Branch Code" />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Swift Code</Label>
              <Input type="text" placeholder="Type your Swift Code" />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Account Number</Label>
              <Input type="text" placeholder="Type your Account Number" />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">Currency</Label>
              <Select
                options={currencyOptions}
                placeholder="Select Currency"
                onChange={handleCurrencyChange}
                value={selectedCurrency}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label">IBAN Number</Label>
              <Input type="text" placeholder="Type your IBAN Number" />
            </Col>
          </Row>
        </Form>

        <Repeater count={count}>
          {(i) => {
            const Tag = i === 0 ? "div" : SlideDown;
            return (
              <Tag key={i}>
                <Form>
                  <Row>
                    <Col sm="12" className="d-flex justify-content-end mb-1">
                      <Button
                        color="danger"
                        onClick={deleteForm}
                        outline
                        style={{ padding: 0, border: "none" }}
                      >
                        <Trash2 size={20} />
                      </Button>
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label
                        className="form-label"
                        for={`accountTitleMulti-${i}`}
                      >
                        Account Title
                      </Label>
                      <Input
                        type="text"
                        name="accountTitle"
                        id={`accountTitleMulti-${i}`}
                        placeholder="Type your Account Title"
                      />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`bankNameMulti-${i}`}>
                        Bank Name
                      </Label>
                      <Input
                        type="text"
                        name="bankName"
                        id={`bankNameMulti-${i}`}
                        placeholder="Type your Bank Name"
                      />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label
                        className="form-label"
                        for={`branchNameMulti-${i}`}
                      >
                        Branch Name
                      </Label>
                      <Input
                        type="text"
                        name="branchName"
                        id={`branchNameMulti-${i}`}
                        placeholder="Type your Branch Name"
                      />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`countryMulti-${i}`}>
                        Country
                      </Label>
                      <Select
                        options={countryOptions}
                        placeholder="Select Country"
                        id={`countryMulti-${i}`}
                      />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label
                        className="form-label"
                        for={`branchCodeMulti-${i}`}
                      >
                        Branch Code
                      </Label>
                      <Input
                        type="text"
                        name="branchCode"
                        id={`branchCodeMulti-${i}`}
                        placeholder="Type your Branch Code"
                      />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`swiftCodeMulti-${i}`}>
                        Swift Code
                      </Label>
                      <Input
                        type="text"
                        name="swiftCode"
                        id={`swiftCodeMulti-${i}`}
                        placeholder="Type your Swift Code"
                      />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label
                        className="form-label"
                        for={`accountNumberMulti-${i}`}
                      >
                        Account Number
                      </Label>
                      <Input
                        type="text"
                        name="accountNumber"
                        id={`accountNumberMulti-${i}`}
                        placeholder="Type your Account Number"
                      />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label className="form-label" for={`currencyMulti-${i}`}>
                        Currency
                      </Label>
                      <Select
                        options={currencyOptions}
                        placeholder="Select Currency"
                        id={`currencyMulti-${i}`}
                      />
                    </Col>
                    <Col md="6" sm="12" className="mb-1">
                      <Label
                        className="form-label"
                        for={`ibanNumberMulti-${i}`}
                      >
                        IBAN Number
                      </Label>
                      <Input
                        type="text"
                        name="ibanNumber"
                        id={`ibanNumberMulti-${i}`}
                        placeholder="Type your IBAN Number"
                      />
                    </Col>
                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>
                </Form>
              </Tag>
            );
          }}
        </Repeater>

        <div className="d-flex justify-content-end">
          <Button className="btn-icon" color="primary" onClick={increaseCount}>
            <Plus size={14} />
            <span className="align-middle ms-25">Add More Details</span>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default BankDetailForm;
