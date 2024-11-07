// ** React Imports
import { Link, Navigate } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

// ** Logo
import logoSource from "../../../@core/assets/images/Raptor-logo.svg";

const ForgotPassword = () => {
  // ** Hooks
  const { skin } = useSkin();

  const illustration = skin === "dark" ? "Scooter.svg" : "Scooter.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  if (!isUserLoggedIn()) {
    return (
      <div className="auth-wrapper auth-cover">
        <Row className="auth-inner m-0">
          {/* <Link
            className="brand-logo"
            to="/"
            onClick={(e) => e.preventDefault()}
          >
            <div className="position-absolute top-0 start-0 m-3">
                <img
                  src={logoSource}
                  alt="Logo"
                  className="img-fluid"
                  style={{ height: "50px", width: "auto" }}
                />
              </div>
          </Link> */}
          <Col
            className="d-none d-lg-flex align-items-center p-0 cover-bg"
            lg="8"
            sm="12"
          >
            <div className="w-100 d-lg-flex align-items-center justify-content-center position-relative">
              <div className="position-absolute top-0 start-0 m-3">
                <img
                  src={logoSource}
                  alt="Logo"
                  className="img-fluid"
                  style={{ height: "50px", width: "auto" }}
                />
              </div>
              <img
                className="img-fluid"
                src={source}
                alt="Login Cover"
                style={{ height: "90vh" }}
              />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="fw-bold mb-1">
                Forgot Password? 🔒
              </CardTitle>
              <CardText className="mb-2">
                Enter your email and we'll send you instructions to reset your
                password
              </CardText>
              <Form
                className="auth-forgot-password-form mt-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="login-email"
                    placeholder="john@example.com"
                    autoFocus
                  />
                </div>
                <Button color="primary" block>
                  Send reset link
                </Button>
              </Form>
              <p className="text-center mt-2">
                <Link to="/login">
                  <ChevronLeft className="rotate-rtl me-25" size={14} />
                  <span className="align-middle">Back to login</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ForgotPassword;
