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
export const GetProduct = async () => {
  try {
    const response = await axiosInstance.get("/api/products/get-products");
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
}
