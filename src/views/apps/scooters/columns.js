import { LinearProgress, Box } from "@mui/material";
import { Badge } from "reactstrap"; // Reactstrap Badge component
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation

const columns = [
  {
    accessorKey: "area", // Accessor for Area field
    header: "Area",
    size: 150,
    Cell: ({ cell }) => {
      const area = cell.getValue();
      return area ? area : "-";
    },
  },
  {
    accessorKey: "number", // Accessor for Number field
    header: "Number",
    size: 150,
    Cell: ({ row }) => {
      const number = row.original.number; // Update to use `number` field
      return number ? (
        <Link
          to={`/details/${number}`} // Navigate to the desired route with the number as a parameter
          style={{ fontWeight: "bold", textDecoration: "none" }} // Apply bold style
        >
          {number}
        </Link>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "sim",
    header: "Sim",
    size: 180,
    Cell: ({ cell }) => {
      const sim = cell.getValue();
      return sim ? sim : "-";
    },
  },
  // {
  //   accessorKey: "imei", // Accessor for UID (imei) field
  //   header: "UID (imei)",
  //   size: 180,
  //   Cell: ({ row }) => {
  //     const imei = row.original.imei; // Update to use `imei` field
  //     return imei ? (
  //       <Link
  //         to={`/details/${imei}`} // Navigate to the desired route with the imei as a parameter
  //         style={{ fontWeight: "bold", textDecoration: "none" }} // Apply bold style
  //       >
  //         {imei}
  //       </Link>
  //     ) : (
  //       "-"
  //     );
  //   },
  // },

  {
    accessorKey: "imei", // Accessor for ID field
    header: "UID (imei)",
    size: 180,
    Cell: ({ row }) => {
      const navigate = useNavigate();
      const id = row.original._id; // Update to use `_id` field
      const imei = row.original.imei;
      const handleClick = () => {
        navigate("/apps/scooter/devices/show", { state: { id } }); // Navigate to /details and pass the ID in the state
      };

      return imei ? (
        <span
          onClick={handleClick} // Use onClick to trigger navigation
          style={{ fontWeight: "bold", cursor: "pointer" }} // Apply bold style and pointer cursor
        >
          {imei}
        </span>
      ) : (
        "-"
      );
    },
  },

  {
    accessorKey: "scooterModel", // Accessor for Scooter Model field
    header: "Scooter Model",
    size: 150,
    Cell: ({ cell }) => {
      const model = cell.getValue();
      return model ? model : "-";
    },
  },
  {
    accessorKey: "currentZone", // Accessor for Current Zone field
    header: "Current Zone",
    size: 150,
    Cell: ({ cell }) => {
      const zone = cell.getValue();
      let color = "";
      let bgColor = "";

      switch (zone) {
        case "Bonus":
          color = "#E2E600";
          bgColor = "rgb(251, 255, 0, 0.1)";
          break;
        case "Paid Parking":
          color = "#0D4D7D";
          bgColor = "lightblue";
          break;
        case "No Parking":
          color = "#3BA1F0";
          bgColor = "lightblue";
          break;
        case "Neutral":
          color = "#B5B5B5";
          bgColor = "lightgray";
          break;
        default:
          color = "black";
          bgColor = "white"; // Default color for undefined zones
      }

      return zone ? (
        <Badge
          className="bg-transparent"
          style={{ color, background: bgColor }}
          pill
        >
          {zone}
        </Badge>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "status", // Accessor for Status field
    header: "Status",
    size: 150,
    Cell: ({ cell }) => {
      const status = cell.getValue();
      return status ? status : "-";
    },
  },
  {
    accessorKey: "okaiStatus", // Accessor for Okai Status field
    header: "Okai Status",
    size: 150,
    Cell: ({ cell }) => {
      const okaiStatus = cell.getValue();
      return okaiStatus ? okaiStatus : "-";
    },
  },
  {
    accessorKey: "okaiLockStatus", // Accessor for Locked Status field
    header: "Locked Status",
    size: 150,
    Cell: ({ cell }) => {
      const lockStatus = cell.getValue();
      return lockStatus ? lockStatus : "-";
    },
  },
  {
    accessorKey: "okaiBattery", // Accessor for Battery field
    header: "Battery",
    size: 200,
    Cell: ({ row }) => {
      const batteryLevel = row.original.okaiBattery;
      let color;

      if (batteryLevel >= 85) {
        color = "green";
      } else if (batteryLevel >= 35) {
        color = "yellow";
      } else {
        color = "red";
      }

      return batteryLevel !== undefined ? (
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress
              variant="determinate"
              value={batteryLevel}
              sx={{
                padding: "3px",
                borderRadius: "10px",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: color,
                },
              }}
            />
          </Box>
          <Box minWidth={35}>
            <span>{`(${batteryLevel}%)`}</span>
          </Box>
        </Box>
      ) : (
        "-"
      );
    },
  },
];

// Initial column visibility settings
const initialColumnVisibility = {
  area: true,
  number: true,
  sim: true,
  imei: true,
  scooterModel: true,
  currentZone: true,
  status: true,
  okaiStatus: true,
  okaiLockStatus: true,
  okaiBattery: true,
};

export { columns, initialColumnVisibility };
