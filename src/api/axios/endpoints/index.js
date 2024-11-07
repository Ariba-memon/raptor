import { client } from "../axios";

export const endpoints = {
  // ** Company

  useCreateCompany: (data) => client.post("company/create", data),
  useUpdateCompany: (id, body) => client.patch(`company/update/${id}`, body),
  getCompanies: (skip, limit) =>
    client.get(`company/all?skip=0&limit=${limit}`),

  // ----------------------------------

  // ** Scooter
  // ** Scooter List

  useCreateScooter: (data) => client.post("scooter/create", data),
  useUpdateScooter: (id, body) => client.patch(`scooter/update/${id}`, body),
  getScooters: (skip, limit) =>
    client.get(`scooter/all?skip=0&limit=${(skip, limit)}`),
  getScooterCompanyNames: () => client.get(`/company/all/names`),
  
  getScootersById: (id) => client.get(`scooter/${id}`),

  getAllScootersLocations: () => client.get(`scooter/all/location`),

  // ----------------------------------

  // ** Clients

  getClients: (skip, limit) =>
    client.get(`users/all?skip=0&limit=${(skip, limit)}`),
  getClientsById: (id) => client.patch(`users/${id}`),
  useUpdateClients: (id, body) => client.patch(`users/update/${id}`, body),

  // ----------------------------------

  // ** Batteries

  useCreateBatteries: (data) => client.post("battery/create", data),
  getBatteries: (limit) => client.get(`batteries/all?skip=0&limit=${limit}`),
  useUpdateBatteries: (id, body) =>
    client.patch(`batteries/update/${id}`, body),
  getBatteriesCompanyNames: () => client.patch(`/company/all/names`),
  getBatteriesById: (id) => client.patch(`batteries/${id}`),

  // ----------------------------------
  // ----------------------------------

  usePermission: (data) => client.post("permissions", data),
  // Permissions
  useUpdateAllPermissions: () => client.put("permissions/updateAll"),
  getPermissionByParam: (limit) =>
    client.get(`permissions/roles?limit=${limit}`),
  getPermissionWithRoles: () => client.get("permissions/role/names"),
  useUpdatePermissions: (id) => client.put(`permissions/update/${id}`),
  getPermissionsById: (id) => client.get(`permissions/${id}`),

  useUpdateSalePurchase: (id, body) =>
    client.patch(`/salepurchase/unlist/${id}`, body),
  useUpdateRentPurchase: (id, body) =>
    client.patch(`/rentpurchase/unlist/${id}`, body),

  // Employees
  useEmployee: (body) => client.post(`employees/${body}`),
  useEmployeeUploadProfilePic: (data) =>
    client.post("employees/profile_pic", data),
  getEmployeeProfile: () => client.get("auth-employees/profile"),
  getAllEmployees: (email) =>
    client.get(`employees/all${email ? `?filter={"email":"${email}"}` : ""}`),

  //Extras
  getUserProfile: () => client.get("auth-employees/profile"),
  getAllProperty: (limit, skip) =>
    client.get(`/property/?limit=${limit}&skip=0`),
  getTenantByPropertyId: (propertyId) => client.get(`/tenancy/${propertyId}`), // /tenancy/:propertyid
  getTenantDetailsTenantId: (tenancyid) =>
    client.get(`/tenancy/detail/${tenancyid}`), // /tenancy/:tenancyid
  getBankDetails: (limit, skip) => client.get(`/bank?limit=${limit}&skip=0`),
  getPoADetails: (limit, skip) => client.get(`/poa?limit=${limit}&skip=0`),
  useEmployeeProfile: (image) =>
    client.post("employees/single/attachment", image),
  useCreateEmployee: (data) => client.post("/employees", data),

  // Property
  useCreatePropertyImages: (data) =>
    client.post("/property/multiple/attachments", data),
  useCreateProject: (data) => client.post("/project/create", data),
  useCreateMultiplePlanAttachments: (data) =>
    client.post("/building/multiple/attachments", data),
  useCreateBuildingCreate: (data) => client.post("/building/create", data),
  useCreateAmenities: (data) => client.post("/amenities/create", data),
  useCreateSubtype: (data) => client.post("/subtype/create", data),
  useCreateDeveloper: (data) => client.post("/developer/create", data),
  useCreateCommunity: (data) => client.post("/community/create", data),
  useCreateProperty: (data) => client.post("/property/create", data),
  useCreateSalePurchase: (data) => client.post("/salepurchase/create", data),
  useCreateRentPurchase: (data) => client.post("/rentpurchase/create", data),
  getSalePurchase: () => client.get("/salepurchase/all"),
  getRentPurchase: () => client.get("/rentpurchase/all"),

  getAllProject: () => client.get("/project/all"),

  getAllBuilding: () => client.get("/building/all"),
  getAllAmenities: () => client.get("/amenities/all"),
  getAllSubtype: () => client.get("/subtype/all"),
  getAllCommunity: () => client.get("/community/all"),
  getAllCommunityNames: () => client.get("/community/names"),
  getAllPropertyNames: () => client.get("/property/names"),
  getAllSubtypesNames: () => client.get("/subtype/names"),
  getAllProjectsNames: () => client.get("/project/names"),
  getAllAmenitiesNames: () => client.get("/amenities/names"),
  getAllBuildingNames: () => client.get("/building/names"),

  getAllDeveloper: () => client.get("/developer/all"),
  getAllProperty: () => client.get("/property/all"),

  // Customer
  useCreateCustomer: (data) => client.post("/customers/create", data),
  useCreateSingleAttachment: (data) =>
    client.post("/customers/single/attachment", data),
  useCreateMultiplePlanAttachments: (data) =>
    client.post("/building/multiple/attachments", data),
  getAllCustomer: () => client.get("/customers/all"),
  getAllCustomerNames: () => client.get("/customers/names"),
  getAllEmployeeNames: () => client.get("/employees/names"),
};
