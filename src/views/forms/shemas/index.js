import * as yup from "yup";

// Property
const propertySchema = yup.object().shape({
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  unitNumber: yup.string().required("Unit number is required"),
  floor: yup.string().required("Floor is required"),
  communityName: yup.string().required("Community name is required"),
  projectName: yup.string().required("Project name is required"),
  buildingName: yup.string().required("Building name is required"),
  usage: yup.string().required("Usage is required"),
  category: yup.string().required("Category is required"),
  managedBy: yup.string().required("Managed by is required"),
  transactionType: yup.string().required("Transaction type is required"),
  typeLayout: yup.string().required("Type layout is required"),
  buildUpArea: yup
    .number()
    .required("Build-Up area is required")
    .positive()
    .integer(),
  measuringUnitArea: yup.string().required("Measuring unit area is required"),
  propertyView: yup.string().required("Property view is required"),
  unitFloorPlan: yup.mixed().required("Unit floor plan is required"),
  typeOfBalcony: yup.string().required("Type of balcony is required"),
  streetNo: yup
    .number()
    .required("Street number is required")
    .positive()
    .integer(),
  subCategory: yup.string().required("Sub category is required"),
  totalBedroom: yup
    .number()
    .required("Total bedroom is required")
    .positive()
    .integer(),
  fullBathroom: yup
    .number()
    .required("Full bathroom is required")
    .positive()
    .integer(),
  halfBathroom: yup
    .number()
    .required("Half bathroom is required")
    .positive()
    .integer(),
  totalNoOfBathroom: yup
    .number()
    .required("Total number of bathrooms is required")
    .min(0)
    .integer(),
  maidRoom: yup.string().required("Maid room status is required"),
  driverRoom: yup.string().required("Driver room status is required"),
  storeRoom: yup.string().required("Store room status is required"),
  otherRoom: yup.string().required("Other room status is required"),
  propertyTypes: yup.string().required("Property types is required"),
  typeOfFurnished: yup.string().required("Type of furnished is required"),
  typeOfKitchen: yup.string().required("Type of kitchen is required"),
  noOfParking: yup
    .number()
    .required("Number of parking is required")
    .positive()
    .integer(),
  parkingBayNumber: yup.string().required("Parking bay number is required"),
  dewaPremisesNo: yup.string().required("DEWA premises number is required"),
  emicoolEmpowerPalmDistrict: yup
    .string()
    .required("EMICOOL / EMPOWER / PALM DISTRICT is required"),
  ownerAssociation: yup.string().required("Owner association is required"),
  embedGoogleLocation: yup
    .string()
    .url("Invalid Google location URL")
    .required("Embed Google location is required"),
  propertyImages: yup.mixed().required("Property images are required"),
  youtubeLink: yup
    .string()
    .url("Invalid YouTube link")
    .required("YouTube link is required"),
  ownerName: yup.string().required("Owner name is required"),
  ownerRepresentativeName: yup
    .string()
    .required("Owner representative name is required"),
  purchasedDate: yup.date().required("Purchased date is required"),
  numberOfOwnerName: yup
    .number()
    .required("Number of owners as per title deed is required")
    .positive()
    .integer(),
  purchaseValueTitleDeed: yup
    .number()
    .required("Purchase value (As Per Title Deed) is required")
    .positive(),
  titleDeedNo: yup.string().required("Title deed number is required"),
  purchaseValueActualPaid: yup
    .number()
    .required("Purchase value (Actual Paid) is required")
    .positive(),
  transferAndOtherCostAmount: yup
    .number()
    .required("Transfer and other cost amount is required")
    .positive(),
  titleDeedDocument: yup.mixed().required("Title deed document is required"),
});

// Booking
const bookingSchema = yup.object().shape({
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  unitNumber: yup.string().required("Unit number is required"),
  floor: yup.string().required("Floor is required"),
  communityName: yup.string().required("Community name is required"),
  projectName: yup.string().required("Project name is required"),
  buildingName: yup.string().required("Building name is required"),
  usage: yup.string().required("Usage is required"),
  category: yup.string().required("Category is required"),
  managedBy: yup.string().required("Managed by is required"),
  transactionType: yup.string().required("Transaction type is required"),
  typeLayout: yup.string().required("Type layout is required"),
  buildUpArea: yup
    .number()
    .required("Build-Up area is required")
    .positive()
    .integer(),
  measuringUnitArea: yup.string().required("Measuring unit area is required"),
  propertyView: yup.string().required("Property view is required"),
  unitFloorPlan: yup.mixed().required("Unit floor plan is required"),
  typeOfBalcony: yup.string().required("Type of balcony is required"),
  streetNo: yup
    .number()
    .required("Street number is required")
    .positive()
    .integer(),
  subCategory: yup.string().required("Sub category is required"),
  totalBedroom: yup
    .number()
    .required("Total bedroom is required")
    .positive()
    .integer(),
  fullBathroom: yup
    .number()
    .required("Full bathroom is required")
    .positive()
    .integer(),
  halfBathroom: yup
    .number()
    .required("Half bathroom is required")
    .positive()
    .integer(),
  totalNoOfBathroom: yup
    .number()
    .required("Total number of bathrooms is required")
    .min(0)
    .integer(),
  maidRoom: yup.string().required("Maid room status is required"),
  driverRoom: yup.string().required("Driver room status is required"),
  storeRoom: yup.string().required("Store room status is required"),
  otherRoom: yup.string().required("Other room status is required"),
  propertyTypes: yup.string().required("Property types is required"),
  typeOfFurnished: yup.string().required("Type of furnished is required"),
  typeOfKitchen: yup.string().required("Type of kitchen is required"),
  noOfParking: yup
    .number()
    .required("Number of parking is required")
    .positive()
    .integer(),
  parkingBayNumber: yup.string().required("Parking bay number is required"),
  dewaPremisesNo: yup.string().required("DEWA premises number is required"),
  emicoolEmpowerPalmDistrict: yup
    .string()
    .required("EMICOOL / EMPOWER / PALM DISTRICT is required"),
  ownerAssociation: yup.string().required("Owner association is required"),
  embedGoogleLocation: yup
    .string()
    .url("Invalid Google location URL")
    .required("Embed Google location is required"),
  propertyImages: yup.mixed().required("Property images are required"),
  youtubeLink: yup
    .string()
    .url("Invalid YouTube link")
    .required("YouTube link is required"),
  ownerName: yup.string().required("Owner name is required"),
  ownerRepresentativeName: yup
    .string()
    .required("Owner representative name is required"),
  purchasedDate: yup.date().required("Purchased date is required"),
  numberOfOwnerName: yup
    .number()
    .required("Number of owners as per title deed is required")
    .positive()
    .integer(),
  purchaseValueTitleDeed: yup
    .number()
    .required("Purchase value (As Per Title Deed) is required")
    .positive(),
  titleDeedNo: yup.string().required("Title deed number is required"),
  purchaseValueActualPaid: yup
    .number()
    .required("Purchase value (Actual Paid) is required")
    .positive(),
  transferAndOtherCostAmount: yup
    .number()
    .required("Transfer and other cost amount is required")
    .positive(),
  titleDeedDocument: yup.mixed().required("Title deed document is required"),
});
export { propertySchema, bookingSchema };
