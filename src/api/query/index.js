import { useQuery } from "react-query";
import { endpoints } from "../axios/endpoints";
import { handleError } from "../errorHandling";

// ** Company

// Async function to fetch all properties with pagination
const getCompanies = async (skip, limit) => {
  try {
    const { data } = await endpoints.getCompanies(skip, limit);
    return data.data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// React Query hook for fetching all properties with pagination
export const useGetCompanies = (skip, limit) => {
  return useQuery(["companies", skip, limit], () => getCompanies(skip, limit), {
    refetchOnWindowFocus: false,
  });
};

// ---------------
// ** Company

// Async function to fetch all properties with pagination
const getScooters = async (skip, limit) => {
  try {
    const { data } = await endpoints.getScooters(skip, limit);
    return data.data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// React Query hook for fetching all properties with pagination
export const useGetScooters = (skip, limit) => {
  return useQuery(["scooters", skip, limit], () => getScooters(skip, limit), {
    refetchOnWindowFocus: false,
  });
};

// Async function to fetch all properties with pagination
const getScooterCompanyNames = async () => {
  try {
    const { data } = await endpoints.getScooterCompanyNames();
    return data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// React Query hook for fetching all properties with pagination
export const useGetCompanyNames = () => {
  return useQuery("companyNames", () => getScooterCompanyNames(), {
    refetchOnWindowFocus: false,
  });
};

// Async function to fetch all properties with pagination
const getAllScootersLocations = async (skip, limit) => {
  try {
    const { data } = await endpoints.getAllScootersLocations(skip, limit);
    return data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// React Query hook for fetching all properties with pagination
export const useGetScooterLocations = () => {
  return useQuery("scootersLocations", () => getAllScootersLocations(), {
    refetchOnWindowFocus: false,
  });
};

// Async function to fetch all properties with pagination
const getScootersById = async (id) => {
  try {
    const { data } = await endpoints.getScootersById(id);
    return data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// React Query hook for fetching all properties with pagination
export const useGetScooterById = (id) => {
  return useQuery(["scooter", id], () => getScootersById(id), {
    refetchOnWindowFocus: false,
  });
};

// ---------------

// ---------------
// ** Clients

// Async function to fetch all properties with pagination
const getClients = async (skip, limit) => {
  try {
    const { data } = await endpoints.getClients(skip, limit);
    return data.data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// React Query hook for fetching all properties with pagination
export const useGetClients = (skip, limit) => {
  return useQuery(["clients", skip, limit], () => getClients(skip, limit), {
    refetchOnWindowFocus: false,
  });
};

// ---------------

// Permissions

// Async function to fetch permissions by role with pagination
const getPermissionByParam = async (limit) => {
  try {
    const { data } = await endpoints.getPermissionByParam(limit);
    return data?.data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// Async function to fetch all permission roles
const getPermissionWithRoles = async () => {
  try {
    const { data } = await endpoints.getPermissionWithRoles();
    console.log("data", data);
    return data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// Async function to fetch permissions by ID
const getPermissionsById = async (id) => {
  try {
    const { data } = await endpoints.getPermissionsById(id);
    return data?.data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// Async function to fetch user profile
const getUserProfile = async () => {
  try {
    const { data } = await endpoints.getUserProfile();
    console.log("data", data);
    return data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// Async function to fetch all properties with pagination
const getAllProperty = async (page, limit) => {
  try {
    const { data } = await endpoints.getAllProperty(page, limit);
    return data?.data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// Async function to fetch tenant by property ID
export const getTenantByPropertyId = async (id) => {
  try {
    const { data } = await endpoints.getTenantByPropertyId(id);
    return data?.data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// Async function to fetch tenant by Tenant ID
export const getTenantDetailsTenantId = async (id) => {
  try {
    const { data } = await endpoints.getTenantDetailsTenantId(id);
    console.log("data>????", data);

    return data;
  } catch (error) {
    console.log("data>????err", error);

    handleError(error);

    return error;
  }
};

const getBankDetails = async (page, limit) => {
  try {
    const { data } = await endpoints.getBankDetails(page, limit);
    return data?.data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

const getPoADetails = async (page, limit) => {
  try {
    const { data } = await endpoints.getPoADetails(page, limit);
    return data;
  } catch (error) {
    handleError(error);
    return error;
  }
};

// Permission Query Hooks
// React Query hook for fetching permissions by role with pagination
export const useGetPermissionByParam = (limit) => {
  return useQuery(
    ["permissionsByParam", limit],
    () => getPermissionByParam(limit),
    {
      refetchOnWindowFocus: false,
    }
  );
};

// React Query hook for fetching all permission roles
export const useGetPermissionWithRoles = (limit) => {
  return useQuery("permissionWithRoles", getPermissionWithRoles, {
    refetchOnWindowFocus: false,
  });
};

// React Query hook for fetching permissions by ID
export const useGetPermissionsById = (id) => {
  return useQuery(["permissionsById", id], () => getPermissionsById(id), {
    refetchOnWindowFocus: false,
  });
};

// React Query hook for fetching user profile
export const usegetUserProfile = () => {
  return useQuery("userProfile", getUserProfile, {
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
};

// React Query hook for fetching all properties with pagination
export const usegetAllProperty = (page, limit) => {
  return useQuery(
    ["properties", page, limit],
    () => getAllProperty(page, limit),
    {
      refetchOnWindowFocus: false,
    }
  );
};

// React Query hook for fetching tenant by property ID
export const usegetTenantByPropertyId = (id) => {
  return useQuery(
    ["tenancyByPropertyId", id],
    () => getTenantByPropertyId(id),
    {
      refetchOnWindowFocus: false,
    }
  );
};

// React Query hook for fetching tenant by property ID
export const usegetTenantDetailsTenantId = (id) => {
  return useQuery(
    ["tenantDetailsTenantId", id],
    () => getTenantDetailsTenantId(id),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const usegetBankDetails = (page, limit) => {
  return useQuery(
    ["bankdetails", page, limit],
    () => getBankDetails(page, limit),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const usegetPoADetails = (page, limit) => {
  return useQuery(
    ["poadetails", page, limit],
    () => getPoADetails(page, limit),
    {
      refetchOnWindowFocus: false,
    }
  );
};
