import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Badge, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import SwiperGallery from "../../extensions/swiper/SwiperGallery";
import { Eye, FileText } from "react-feather";
import { useState } from "react";
// ** Styles
import "@styles/react/libs/swiper/swiper.scss";
import './style.css'; // Import the CSS file

// ** Third Party Components
import SwiperCore, {
  Grid,
  Lazy,
  Virtual,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
} from "swiper";

// ** Init Swiper Functions
SwiperCore.use([
  Navigation,
  Grid,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual,
]);

const statusToRoleMap = {
  active: "Pending",
  pending: "Completed",
  inactive: "Inactive",
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

const columns = [
  {
    id: "bookingDetails",
    header: (
      <Typography
        variant="h6"
        sx={{
          color: "white",
          backgroundColor: "#000000",
          padding: "6px",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        Booking Details
      </Typography>
    ),
    columns: [
      {
        accessorKey: "bookingNumber",
        header: "Booking Number",
        size: 150,
      },
      {
        accessorKey: "bookingStatus",
        header: "Booking Status",
        size: 150,
      },
      {
        accessorKey: "unitNo",
        header: "Unit No.",
        size: 100,
      },
      {
        accessorKey: "buildingName",
        header: "Building Name",
        size: 150,
      },
      {
        accessorKey: "floorLevel",
        header: "Floor Level",
        size: 100,
      },
      {
        accessorKey: "communityName",
        header: "Community Name",
        size: 150,
      },
      {
        accessorKey: "projectName",
        header: "Project Name",
        size: 150,
      },
      {
        accessorFn: (row) => `${row.ownerName}`,
        id: "ownerName",
        header: "Owner Name",
        size: 150,
      },
      {
        accessorKey: "guestName",
        header: "Guest Name",
        size: 150,
      },
      {
        accessorKey: "checkInType",
        header: "Check-in Type",
        size: 150,
      },
      {
        accessorKey: "nationality",
        header: "Nationality",
        size: 150,
      },
      {
        accessorKey: "passportNo",
        header: "Passport No.",
        size: 150,
      },
      {
        accessorKey: "mobileNumber",
        header: "Mobile Number",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "numOfAdults",
        header: "No. of Adults",
        size: 100,
      },
      {
        accessorKey: "numOfChildren",
        header: "No. of Children",
        size: 100,
      },
      {
        accessorKey: "numOfOccupants",
        header: "No. of Occupants",
        size: 150,
      },
      {
        accessorKey: "confirmationCode",
        header: "Confirmation Code",
        size: 200,
      },
      {
        accessorKey: "bookingDate",
        header: "Booking Date",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
      {
        accessorKey: "bookingAgent",
        header: "Booking Agent",
        size: 150,
      },
      {
        accessorKey: "modeOfPayment",
        header: "Mode of Payment",
        size: 150,
      },
      {
        accessorKey: "checkInDate",
        header: "Check-in Date",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
      {
        accessorKey: "checkOutDate",
        header: "Check-out Date",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
      {
        accessorKey: "numOfNights",
        header: "No. of Nights",
        size: 100,
      },
      {
        accessorKey: "tourismFee",
        header: "Tourism Fee / Unit",
        size: 150,
      },
      {
        accessorKey: "securityDepositAmount",
        header: "Security Deposit Amount",
        size: 150,
      },
      {
        accessorKey: "totalPayout",
        header: "TOTAL PAYOUT",
        size: 150,
      },
      {
        accessorKey: "hostServiceFee",
        header: "Host Service Fee (portal)",
        size: 150,
      },
      {
        accessorKey: "totalCollectionAllIncl",
        header: "Total Collection All incl.",
        size: 200,
      },
      {
        accessorKey: "cleaningFee",
        header: "Cleaning Fee",
        size: 150,
      },
      {
        accessorKey: "totalAdditionalFee",
        header: "TOTAL ADDITIONAL FEE",
        size: 150,
      },
      {
        accessorKey: "roomRentAmountIncl",
        header: "Room Rent Amount.",
        size: 200,
      },
      {
        accessorKey: "roomRentAmountHost",
        header: "Room Rent Amount: (Host Payable)",
        size: 200,
      },
      {
        accessorKey: "guestServiceFee",
        header: "Guest Service Fee",
        size: 150,
      },
      {
        accessorKey: "guestManagementFee",
        header: "Guest Management Fee",
        size: 150,
      },
      {
        accessorKey: "hostManagementFee",
        header: "Host Management Fee",
        size: 150,
      },
      {
        accessorKey: "totalRoomRentAmount",
        header: "Total Room Rent Amount.",
        size: 200,
      },
      {
        accessorKey: "vatRoomRent",
        header: "VAT 5% on Booking Room Rent",
        size: 150,
      },
      {
        accessorKey: "vatServiceFee",
        header: "VAT 5% on Service Fee",
        size: 150,
      },
      {
        accessorKey: "vatCleaningFee",
        header: "VAT 5% on Cleaning Fee",
        size: 150,
      },
      {
        accessorKey: "vatGuestManagementFee",
        header: "VAT 5% on Guest Management Fee",
        size: 200,
      },
      {
        accessorKey: "vatHostManagementFee",
        header: "VAT 5% On Host Management Fee",
        size: 200,
      },
      {
        accessorKey: "totalPayoutVat",
        header: "Total Payout VAT",
        size: 150,
      },
      {
        accessorKey: "totalRoomRentWithGMVAT",
        header: "Total Room Rent + GM + VAT",
        size: 200,
      },
      {
        accessorKey: "auditDifference",
        header: "Audit Difference",
        size: 150,
      },
      {
        accessorKey: "dtcmUploaded",
        header: "DTCM Uploaded",
        size: 150,
      },
      {
        accessorKey: "passportIdCollected",
        header: "Passport ID Collected",
        size: 200,
      },
      {
        accessorKey: "signatureVerified",
        header: "Signature Verified (as per Passport)",
        size: 200,
      },
      {
        accessorKey: "smartCodeProvided",
        header: "Smart Code Provided",
        size: 200,
      },
      {
        accessorKey: "paymentCollected",
        header: "Payment Collected",
        size: 150,
      },
    ],
  },
  {
    id: "metadata",
    header: (
      <Typography
        variant="h6"
        sx={{
          color: "white",
          backgroundColor: "#000000",
          padding: "6px",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        Metadata
      </Typography>
    ),
    columns: [
      {
        accessorKey: "createdBy",
        header: "Created By",
        size: 150,
      },
      {
        accessorKey: "createdOn",
        header: "Created On",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        size: 150,
      },
      {
        accessorKey: "updatedOn",
        header: "Updated On",
        size: 150,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
        },
      },
    ],
  },
];

export default columns;