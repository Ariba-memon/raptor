// ** React Imports
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Button, Col } from "reactstrap";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Styles
import "@styles/base/pages/page-misc.scss";

import logoSource from "../../../@core/assets/images/Raptor-logo.svg";

const Error = () => {
  // ** Hooks
  const { skin } = useSkin();

  const illustration = skin === "dark" ? "Scooter.svg" : "Scooter.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  return (
    <div className="misc-wrapper">
      <a className="brand-logo" href="/">
        <h2 className="brand-text text-primary ms-1">
          {" "}
          <img
            src={logoSource}
            alt="Logo"
            className="img-fluid"
            style={{ height: "50px", width: "auto" }}
          />
        </h2>
      </a>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">Page Not Found 🕵🏻‍♀️</h2>
          <p className="mb-2">
            Oops! 😖 The requested URL was not found on this server.
          </p>
          <Button
            tag={Link}
            to="/"
            color="primary"
            className="btn-sm-block mb-2"
          >
            Back to home
          </Button>

          <img
            style={{ height: "70vh" }}
            className="img-fluid"
            src={source}
            alt="Not authorized page"
          />
        </div>
      </div>
    </div>
  );
};
export default Error;
