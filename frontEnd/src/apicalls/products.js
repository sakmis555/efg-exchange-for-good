const { axiosInstance } = require("./axiosInstance");

// add new user
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products
export const GetProducts = async (filters) => {
  try {
    const response = await axiosInstance.post("/api/products/get-products", filters);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// edit a product
export const EditProduct = async(id, payload) => {
  try {
    const response = await axiosInstance.put(`/api/products/edit-product/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete a product
export const DeleteProduct = async(id) => {
  try {
    const response = await axiosInstance.delete(`/api/products/delete-product/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload product image
export const UploadProductImage = async(payload) => { // sm payload must have - 1. file, 2. productId
  try {
    const response = await axiosInstance.post("/api/products/upload-image-to-product", payload);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
}