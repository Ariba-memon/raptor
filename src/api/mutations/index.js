import { useMutation } from "react-query";
import { endpoints } from "../axios/endpoints";
import { handleError } from "../errorHandling";
import { handleSuccess } from "../sucsessHandling";

// ** Company
export const useCreateCompany = () => {
  return useMutation(async (body) => {
    try {
      const res = await endpoints.useCreateCompany(body);
      handleSuccess(res, "Company Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      // throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useUpdateCompany = () => {
  return useMutation(async ({ id, body }) => {
    console.log("body", body);
    try {
      const res = await endpoints.useUpdateCompany(id, body);
      handleSuccess(res, "Update Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
    }
  });
};

// -------------

// ** Scooter
export const useCreateScooter = () => {
  return useMutation(async (body) => {
    try {
      const res = await endpoints.useCreateScooter(body);
      handleSuccess(res, "Scooter Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      // throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useUpdateScooter = () => {
  return useMutation(async ({ id, body }) => {
    try {
      const res = await endpoints.useUpdateScooter(id, body);
      handleSuccess(res, "Update Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
    }
  });
};

// -------------

// ** Scooter
// export const useCreateClients = () => {
//   return useMutation(async (body) => {
//     try {
//       const res = await endpoints.useCreateClients(body);
//       handleSuccess(res, "Clients Created Successfully");
//       return res.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Operation failed";
//       handleError(errorMessage);
//       // throw new Error(errorMessage || "Operation failed");
//     }
//   });
// };

export const useUpdateClients = () => {
  return useMutation(async ({ id, body }) => {
    try {
      const res = await endpoints.useUpdateClients(id, body);
      handleSuccess(res, "Update Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
    }
  });
};

// -------------

export const useCreatePermissions = () => {
  return useMutation(async (body) => {
    try {
      const res = await endpoints.usePermission(body);
      handleSuccess(res, "Permission Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

// Property Hooks
export const useCreatePropertyImages = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreatePropertyImages(data);
      handleSuccess(res, "Property Images Uploaded Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useCreateProject = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateProject(data);
      handleSuccess(res, "Project Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useCreateMultiplePlanAttachments = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateMultiplePlanAttachments(data);
      handleSuccess(res, "Attachments Uploaded Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useCreateBuilding = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateBuildingCreate(data);
      handleSuccess(res, "Building Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useCreateAmenities = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateAmenities(data);
      handleSuccess(res, "Amenities Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      // throw new Error(errorMessage || "Operation failed");
    }
  });
};

// Mutation hook for updating Sale Purchase
// Mutation hook for updating Sale Purchase
export const useUpdateSalePurchase = () => {
  return useMutation(async ({ id, body }) => {
    console.log("id, body", id, body);
    try {
      const res = await endpoints.useUpdateSalePurchase(id, body);
      handleSuccess(res, "Un-list Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
    }
  });
};

// Mutation hook for updating Rent Purchase
export const useUpdateRentPurchase = () => {
  return useMutation(async ({ id, body }) => {
    console.log("id, body", id, body);
    try {
      const res = await endpoints.useUpdateRentPurchase(id, body);
      handleSuccess(res, "Un-list Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
    }
  });
};

export const useCreateSubtype = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateSubtype(data);
      handleSuccess(res, "Subtype Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useCreateDeveloper = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateDeveloper(data);
      handleSuccess(res, "Developer Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useCreateCommunity = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateCommunity(data);
      handleSuccess(res, "Community Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useCreateProperty = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateProperty(data);
      handleSuccess(res, "Property Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

// Customer Hooks
export const useCreateCustomer = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateCustomer(data);
      handleSuccess(res, "Customer Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useCreateSingleAttachment = () => {
  return useMutation(async (data) => {
    try {
      const res = await client.post("/customers/single/attachment", data);
      handleSuccess(res, "Attachment Uploaded Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const uploadEmployeeImageProfile = async (image) => {
  console.log("image???", image);
  try {
    const res = await endpoints.useEmployeeProfile(image);
    console.log("res<><>", res);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Upload failed");
  }
};

export const useCreateEmployee = async (data) => {
  try {
    const res = await endpoints.useCreateEmployee(data);
    handleSuccess(res, "Employee Created Successfully");
    console.log("res?????", res);
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Operation failed";
    console.log("errorMessage", errorMessage);
    handleError(errorMessage);
    throw new Error(errorMessage || "Operation failed");
  }
};

// Availability
export const useCreateSalePurchase = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateSalePurchase(data);
      handleSuccess(res, "Sale Purchase Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};

export const useCreateRentPurchase = () => {
  return useMutation(async (data) => {
    try {
      const res = await endpoints.useCreateRentPurchase(data);
      handleSuccess(res, "Sale Purchase Created Successfully");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Operation failed";
      handleError(errorMessage);
      throw new Error(errorMessage || "Operation failed");
    }
  });
};
