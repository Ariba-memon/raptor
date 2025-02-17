const mockData = [
  {
    bookingNumber: "BN123456",
    bookingStatus: "active",
    unitNo: "A102",
    buildingName: "Sky Tower",
    floorLevel: 10,
    communityName: "Downtown",
    projectName: "Skyline Heights",
    ownerName: "Jack Abbasi",
    guestName: "John Doe",
    checkInType: "Self Check-In",
    nationality: "Pakistani",
    passportNo: "AB1234567",
    mobileNumber: "+971501234567",
    email: "john.doe@example.com",
    numOfAdults: 2,
    numOfChildren: 1,
    numOfOccupants: 3,
    confirmationCode: "CONF123456",
    bookingDate: "2023-07-15T00:00:00",
    bookingAgent: "Agent XYZ",
    modeOfPayment: "Credit Card",
    checkInDate: "2023-07-20T00:00:00",
    checkOutDate: "2023-07-25T00:00:00",
    numOfNights: 5,
    tourismFee: "AED 50",
    securityDepositAmount: "AED 1000",
    totalPayout: "AED 5000",
    hostServiceFee: "AED 500",
    totalCollectionAllIncl: "AED 5500",
    cleaningFee: "AED 300",
    totalAdditionalFee: "AED 300",
    roomRentAmountIncl: "AED 4500",
    roomRentAmountHost: "AED 4000",
    guestServiceFee: "AED 200",
    guestManagementFee: "AED 150",
    hostManagementFee: "AED 100",
    totalRoomRentAmount: "AED 4950",
    vatRoomRent: "AED 225",
    vatServiceFee: "AED 25",
    vatCleaningFee: "AED 15",
    vatGuestManagementFee: "AED 7.5",
    vatHostManagementFee: "AED 5",
    totalPayoutVat: "AED 277.5",
    totalRoomRentWithGMVAT: "AED 5227.5",
    auditDifference: "AED 0",
    dtcmUploaded: true,
    passportIdCollected: true,
    signatureVerified: true,
    smartCodeProvided: true,
    paymentCollected: true,
    createdBy: "Admin User",
    createdOn: "2014-03-20T12:34:56",
    updatedBy: "Super Admin",
    updatedOn: "2019-06-11T10:20:30",
    propertyImages: [
      "https://salesforce-images-bucket.s3.me-central-1.amazonaws.com/Watermarked/img_20240708_wa0039_a1m7Q000001jk7PQAQ.jpg",
      "https://watermark.lovepik.com/photo/40143/6442.jpg_wh1200.jpg",
      "https://www.propertyfinder.ae/property/f53250a4067a30ec208b0303978a8c17/416/272/MODE/9a09a6/12253433-84b9co.webp?ctr=ae"
    ],
    YoutubeVideo: [
      "https://www.youtube.com/watch?v=example1",
      "https://www.youtube.com/watch?v=example2"
    ],
    floorPlanImages: "path/to/floor_plan.pdf",
    unitPlanAttachment: "path/to/unit_plan.pdf",
    plotPlanAttachment: "path/to/plot_plan.pdf",
  },
  {
    bookingNumber: "BN654321",
    bookingStatus: "pending",
    unitNo: "B201",
    buildingName: "Trade Center",
    floorLevel: 12,
    communityName: "Business Bay",
    projectName: "Business Towers",
    ownerName: "Rahima Khalid",
    guestName: "Jane Smith",
    checkInType: "Manual Check-In",
    nationality: "American",
    passportNo: "XY9876543",
    mobileNumber: "+971502345678",
    email: "jane.smith@example.com",
    numOfAdults: 1,
    numOfChildren: 0,
    numOfOccupants: 1,
    confirmationCode: "CONF654321",
    bookingDate: "2023-06-10T00:00:00",
    bookingAgent: "Agent ABC",
    modeOfPayment: "Bank Transfer",
    checkInDate: "2023-06-15T00:00:00",
    checkOutDate: "2023-06-20T00:00:00",
    numOfNights: 5,
    tourismFee: "AED 75",
    securityDepositAmount: "AED 1500",
    totalPayout: "AED 6000",
    hostServiceFee: "AED 600",
    totalCollectionAllIncl: "AED 6600",
    cleaningFee: "AED 400",
    totalAdditionalFee: "AED 400",
    roomRentAmountIncl: "AED 5000",
    roomRentAmountHost: "AED 4500",
    guestServiceFee: "AED 300",
    guestManagementFee: "AED 200",
    hostManagementFee: "AED 150",
    totalRoomRentAmount: "AED 5450",
    vatRoomRent: "AED 250",
    vatServiceFee: "AED 30",
    vatCleaningFee: "AED 20",
    vatGuestManagementFee: "AED 10",
    vatHostManagementFee: "AED 7.5",
    totalPayoutVat: "AED 317.5",
    totalRoomRentWithGMVAT: "AED 5767.5",
    auditDifference: "AED 50",
    dtcmUploaded: true,
    passportIdCollected: true,
    signatureVerified: true,
    smartCodeProvided: false,
    paymentCollected: true,
    createdBy: "John Doe",
    createdOn: "2018-06-11T15:30:00",
    updatedBy: "Jane Smith",
    updatedOn: "2019-06-11T14:25:00",
    propertyImages: [
      "https://keyone.s3.me-south-1.amazonaws.com/watermark/2023-10-12/6527ee9a7df5b-2023-10-12/6527ee9a7df5b-2023-10-12-1-1.jpg",
      "https://watermark.lovepik.com/photo/40143/6442.jpg_wh1200.jpg"
    ],
    YoutubeVideo: [
      "https://www.youtube.com/watch?v=example3",
      "https://www.youtube.com/watch?v=example4"
    ],
    floorPlanImages: "path/to/floor_plan2.pdf",
    unitPlanAttachment: "path/to/unit_plan2.pdf",
    plotPlanAttachment: "path/to/plot_plan2.pdf",
  },
  {
    bookingNumber: "BN789012",
    bookingStatus: "inactive",
    unitNo: "C303",
    buildingName: "Warehouse 5",
    floorLevel: 1,
    communityName: "Industrial Area",
    projectName: "Industrial Park",
    ownerName: "Foster Willms",
    guestName: "Michelle Kim",
    checkInType: "Self Check-In",
    nationality: "Canadian",
    passportNo: "CA1122334",
    mobileNumber: "+971503456789",
    email: "michelle.kim@example.com",
    numOfAdults: 3,
    numOfChildren: 2,
    numOfOccupants: 5,
    confirmationCode: "CONF789012",
    bookingDate: "2023-05-10T00:00:00",
    bookingAgent: "Agent DEF",
    modeOfPayment: "Cash",
    checkInDate: "2023-05-15T00:00:00",
    checkOutDate: "2023-05-20T00:00:00",
    numOfNights: 5,
    tourismFee: "AED 100",
    securityDepositAmount: "AED 2000",
    totalPayout: "AED 7000",
    hostServiceFee: "AED 700",
    totalCollectionAllIncl: "AED 7700",
    cleaningFee: "AED 500",
    totalAdditionalFee: "AED 500",
    roomRentAmountIncl: "AED 6000",
    roomRentAmountHost: "AED 5500",
    guestServiceFee: "AED 400",
    guestManagementFee: "AED 250",
    hostManagementFee: "AED 200",
    totalRoomRentAmount: "AED 6650",
    vatRoomRent: "AED 300",
    vatServiceFee: "AED 50",
    vatCleaningFee: "AED 25",
    vatGuestManagementFee: "AED 12.5",
    vatHostManagementFee: "AED 10",
    totalPayoutVat: "AED 397.5",
    totalRoomRentWithGMVAT: "AED 7047.5",
    auditDifference: "AED 75",
    dtcmUploaded: true,
    passportIdCollected: false,
    signatureVerified: false,
    smartCodeProvided: true,
    paymentCollected: true,
    createdBy: "David Lee",
    createdOn: "2020-08-19T11:22:33",
    updatedBy: "Michelle Kim",
    updatedOn: "2021-06-11T09:00:00",
    propertyImages: [
      "https://img.squareyards.com/secondaryPortal/371676_gltr1262_133453520208904161?aio=crop;",
      "https://watermark.lovepik.com/photo/40143/6442.jpg_wh1200.jpg"
    ],
    YoutubeVideo: [
      "https://www.youtube.com/watch?v=example5",
      "https://www.youtube.com/watch?v=example6"
    ],
    floorPlanImages: "path/to/floor_plan3.pdf",
    unitPlanAttachment: "path/to/unit_plan3.pdf",
    plotPlanAttachment: "path/to/plot_plan3.pdf",
  },
];

export default mockData;
