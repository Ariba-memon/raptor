// ** React Import
import { useEffect, useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from "reactstrap";

// ** Store & Actions
import { addUser } from "../store";
import { useDispatch } from "react-redux";

const defaultValues = {
  email: "",
  contact: "",
  designation: "",
  fullName: "",
  lastname: "",
  country: null,
};

const countryOptions = [
  { label: "Australia", value: "Australia" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Belarus", value: "Belarus" },
  { label: "Brazil", value: "Brazil" },
  { label: "Canada", value: "Canada" },
  { label: "China", value: "China" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Japan", value: "Japan" },
  { label: "Korea", value: "Korea" },
  { label: "Mexico", value: "Mexico" },
  { label: "Philippines", value: "Philippines" },
  { label: "Russia", value: "Russia" },
  { label: "South", value: "South" },
  { label: "Thailand", value: "Thailand" },
  { label: "Turkey", value: "Turkey" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States", value: "United States" },
];

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar, editData }) => {
  const [data, setData] = useState(editData || null);
  const [role, setRole] = useState("subscriber");
  const [plan, setPlan] = useState("basic");

  const dispatch = useDispatch();

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: editData || defaultValues });

  const onSubmit = (formData) => {
    if (checkIsValid(formData)) {
      toggleSidebar();
      dispatch(
        addUser({
          role,
          avatar: "",
          status: "active",
          ...formData,
          country: formData.country.value,
        })
      );
    } else {
      // Handle validation errors
    }
  };

  const handleSidebarClosed = () => {
    setValue("fullName", "");
    setValue("lastname", "");
    setValue("email", "");
    setValue("contact", "");
    setValue("designation", "");
    setValue("country", null);
    setRole("subscriber");
    setPlan("basic");
  };

  useEffect(() => {
    if (editData) {
      setData(editData);
      setValue("fullName", editData.fullName || "");
      setValue("lastname", editData.lastname || "");
      setValue("email", editData.email || "");
      setValue("contact", editData.contact || "");
      setValue("designation", editData.designation || "");
      setValue("country", editData.country || null);
    }
  }, [editData, setValue]);

  return (
    <Sidebar
      size="lg"
      open={open}
      title={editData ? "Edit Employee" : "New Employee"}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="fullName">
            Full Name <span className="text-danger">*</span>
          </Label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input
                id="fullName"
                placeholder="John Doe"
                invalid={errors.fullName && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="lastname">
            Username <span className="text-danger">*</span>
          </Label>
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <Input
                id="lastname"
                placeholder="johnDoe99"
                invalid={errors.lastname && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            Email <span className="text-danger">*</span>
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="userEmail"
                placeholder="john.doe@example.com"
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color="muted">
            You can use letters, numbers & periods
          </FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="contact">
            Contact <span className="text-danger">*</span>
          </Label>
          <Controller
            name="contact"
            control={control}
            render={({ field }) => (
              <Input
                id="contact"
                placeholder="(397) 294-5153"
                invalid={errors.contact && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="designation">
            Designation <span className="text-danger">*</span>
          </Label>
          <Controller
            name="designation"
            control={control}
            render={({ field }) => (
              <Input
                id="designation"
                placeholder="Adminstrator"
                invalid={errors.designation && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="country">
            Country <span className="text-danger">*</span>
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.country === null,
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="user-role">
            User Role
          </Label>
          <Input
            type="select"
            id="user-role"
            name="user-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="subscriber">Subscriber</option>
            <option value="editor">Editor</option>
            <option value="maintainer">Maintainer</option>
            <option value="author">Author</option>
            <option value="admin">Admin</option>
          </Input>
        </div>
        <div
          className="mb-1"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <Label className="form-label" for="select-plan">
            Gender
          </Label>
          <Input type="select" id="select-plan" name="select-plan">
            <option value="basic">Male</option>
            <option value="enterprise">Female</option>
          </Input>
        </div>
        <Button type="submit" className="me-1" color="primary">
          Submit
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
