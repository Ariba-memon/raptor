const mockData = [
  {
    firstName: "Jack",
    lastName: "Smith",
    email: "jack.smith@example.com",
    jobTitle: "CEO",
    status: ["active", "pending"], // Example of multiple statuses
    startDate: "2014-03-20T12:34:56",
    updateDate: "2019-06-11T10:20:30",
    createdByName: "Admin User",
    createdByEmail: "admin@example.com",
    updatedByName: "Super Admin",
    updatedByEmail: "superadmin@example.com",
    // New keys and data
    address: "123 Main St, Cityville, Country",
    phoneNumber: "(123) 456-7890",
    department: "Executive",
  },
  {
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    jobTitle: "Senior Property Consultant",
    status: "pending",
    startDate: "2018-06-11T15:30:00",
    updateDate: "2019-06-11T14:25:00",
    createdByName: "John Doe",
    createdByEmail: "john.doe@example.com",
    updatedByName: "Jane Smith",
    updatedByEmail: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    // New keys and data
    address: "456 Elm St, Townsville, Country",
    phoneNumber: "(987) 654-3210",
    department: "Consulting",
  },
  {
    firstName: "Oliver",
    lastName: "Brown",
    email: "oliver.brown@example.com",
    jobTitle: "Lead Brand Assistant",
    status: "inactive",
    startDate: "2020-08-19T11:22:33",
    updateDate: "2021-06-11T09:00:00",
    createdByName: "David Lee",
    createdByEmail: "david.lee@example.com",
    updatedByName: "Michelle Kim",
    updatedByEmail: "michelle.kim@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    // New keys and data
    address: "789 Oak St, Village, Country",
    phoneNumber: "(555) 678-9012",
    department: "Branding",
  },
];

export default mockData;
