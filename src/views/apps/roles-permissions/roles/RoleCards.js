import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Modal, Button } from "reactstrap";
import { Copy } from "react-feather";
import { useForm } from "react-hook-form";
import { ReactSortable } from "react-sortablejs";
import AvatarGroup from "@components/avatar-group";
import PermissionsModal from "./permissionModal";

// ** Vars
const data = [
  {
    totalUsers: 4,
    title: "Administrator",
    users: [
      {
        size: "sm",
        title: "Vinnie Mostowy",
        img: require("@src/assets/images/avatars/2.png").default,
      },
      {
        size: "sm",
        title: "Allen Rieske",
        img: require("@src/assets/images/avatars/12.png").default,
      },
      {
        size: "sm",
        title: "Julee Rossignol",
        img: require("@src/assets/images/avatars/6.png").default,
      },
      {
        size: "sm",
        title: "Kaith Dsouza",
        img: require("@src/assets/images/avatars/11.png").default,
      },
    ],
  },
  {
    totalUsers: 7,
    title: "Lead Generate",
    users: [
      {
        size: "sm",
        title: "Jimmy Ressula",
        img: require("@src/assets/images/avatars/4.png").default,
      },
      {
        size: "sm",
        title: "John Doe",
        img: require("@src/assets/images/avatars/1.png").default,
      },
      {
        size: "sm",
        title: "Kristi Lawker",
        img: require("@src/assets/images/avatars/2.png").default,
      },
      {
        size: "sm",
        title: "Kaith D",
        img: require("@src/assets/images/avatars/5.png").default,
      },
      {
        size: "sm",
        title: "Danny Paul",
        img: require("@src/assets/images/avatars/7.png").default,
      },
    ],
  },
  {
    totalUsers: 5,
    title: "Employees",
    users: [
      {
        size: "sm",
        title: "Andrew Tye",
        img: require("@src/assets/images/avatars/6.png").default,
      },
      {
        size: "sm",
        title: "Rishi Swaat",
        img: require("@src/assets/images/avatars/9.png").default,
      },
      {
        size: "sm",
        title: "Rossie Kim",
        img: require("@src/assets/images/avatars/2.png").default,
      },
      {
        size: "sm",
        title: "Kim Merchent",
        img: require("@src/assets/images/avatars/10.png").default,
      },
      {
        size: "sm",
        title: "Sam Dsouza",
        img: require("@src/assets/images/avatars/8.png").default,
      },
    ],
  },
  {
    totalUsers: 3,
    title: "Photographer",
    users: [
      {
        size: "sm",
        title: "Kim Karlos",
        img: require("@src/assets/images/avatars/3.png").default,
      },
      {
        size: "sm",
        title: "Katy Turner",
        img: require("@src/assets/images/avatars/9.png").default,
      },
      {
        size: "sm",
        title: "Peter Adward",
        img: require("@src/assets/images/avatars/12.png").default,
      },
      {
        size: "sm",
        title: "Kaith Dsouza",
        img: require("@src/assets/images/avatars/10.png").default,
      },
      {
        size: "sm",
        title: "John Parker",
        img: require("@src/assets/images/avatars/11.png").default,
      },
    ],
  },
  {
    totalUsers: 2,
    title: "RAPTOR Supplies",
    users: [
      {
        size: "sm",
        title: "Kim Merchent",
        img: require("@src/assets/images/avatars/10.png").default,
      },
      {
        size: "sm",
        title: "Sam Dsouza",
        img: require("@src/assets/images/avatars/6.png").default,
      },
      {
        size: "sm",
        title: "Nurvi Karlos",
        img: require("@src/assets/images/avatars/3.png").default,
      },
      {
        size: "sm",
        title: "Andrew Tye",
        img: require("@src/assets/images/avatars/8.png").default,
      },
      {
        size: "sm",
        title: "Rossie Kim",
        img: require("@src/assets/images/avatars/9.png").default,
      },
    ],
  },
];

const RoleCards = () => {
  // ** States
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  const [modalType, setModalType] = useState("Add New");

  const [roles, setRoles] = useState(data); // State for sortable roles

  // ** Hooks
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { roleName: "" } });

  const onSubmit = (data) => {
    if (data.roleName.length) {
      setShow(false);
    } else {
      setError("roleName", { type: "manual" });
    }
  };

  const onReset = () => {
    setShow(false);
    reset({ roleName: "" });
  };

  const handleModalClosed = () => {
    setModalType("Add New");
    setValue("roleName");
  };

  return (
    <Fragment>
      <ReactSortable
        list={roles}
        setList={setRoles}
        className="sortable-role-cards row m-0 p-0" // Added padding and gap
        group="roles-group"
        animation={200}
        direction={"horizontal"}
      >
        {roles.map((item, index) => (
          <Col key={index} md={4} className="d-flex align-items-stretch">
            <Card className="w-100">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <span>{`Total ${item.totalUsers} users`}</span>
                  <AvatarGroup data={item.users} />
                </div>
                <div className="d-flex justify-content-between align-items-end mt-1 pt-25">
                  <div className="role-heading">
                    <h4 className="fw-bolder">{item.title}</h4>
                    <Link
                      to="/"
                      className="role-edit-modal"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalType("Edit");
                        setShow(true);
                      }}
                    >
                      <small className="fw-bolder">Edit Role</small>
                    </Link>
                  </div>
                  <Link
                    to=""
                    className="text-body"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Copy className="font-medium-5" />
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </ReactSortable>

      <PermissionsModal isOpen={show} toggle={toggleModal} />
    </Fragment>
  );
};

export default RoleCards;
