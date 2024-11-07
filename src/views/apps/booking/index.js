// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

const BookingList = () => {
  return (
    <div className="app-user-list">
      <Row>
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Bookings"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Bookings"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active Bookings"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  );
};

export default BookingList;
