import React from "react";
import { Controller } from "react-hook-form";
import { Input, Label } from "reactstrap";
import Select from "react-select";

const AdvancedForm = ({
  name,
  type,
  options = [],
  control,
  errors = {},
  placeholder,
  isDisabled,
  onChange,
  defaultValue,
  checked,
  readOnly,
}) => {
  return (
    <>
      <Label for={name}>{placeholder}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
         type === "select" ? (
            <Select
              id={name}
              options={options}
              {...field}
              placeholder={`Select ${placeholder}`}
              className="react-select"
              classNamePrefix="select"
              onChange={(option) => onChange && onChange(option)}
              isClearable
              isDisabled={isDisabled}
            />
          ) : type === "radio" ? (
            <Input
              type="radio"
              id={name}
              {...field}
              onChange={() => onChange && onChange()}
              checked={checked}
            />
          ) : (
            <Input
              type={type}
              id={name}
              placeholder={placeholder}
              {...field}
              invalid={!!errors[name]}
              disabled={isDisabled}
              readOnly={readOnly}
              defaultValue={defaultValue}
              onChange={(event) => onChange && onChange(event)}
            />
          )
        }
      />
      {errors[name] && (
        <div className="invalid-feedback">{errors[name].message}</div>
      )}
    </>
  );
};

export default AdvancedForm;
