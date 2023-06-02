import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { EditProduct, UploadProductImage } from "../../../apicalls/products";

function Images({ selectedProduct, getData, setShowProductForm }) {
  const [showPreview = false, setShowPreview] = useState(true);
  const [images = [], setImages] = useState(selectedProduct.images);
  const [file = null, setFile] = useState(null);
  const dispatch = useDispatch();
  const upload = async () => {
    try {
      dispatch(SetLoader(true));
      // upload image to cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      console.log(formData);
      const response = await UploadProductImage(formData);
      console.log(response);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteImage = async(image) => {
    try {
        const updatedImagesArray = images.filter((img) => img !== image);
        const updatedProductAfterDeletion = { ...selectedProduct, images: updatedImagesArray};
        dispatch(SetLoader(true));
        const response = await EditProduct(selectedProduct._id, updatedProductAfterDeletion);
        dispatch(SetLoader(false));
        if(response.success) {
            message.success(response.message);
            setImages(updatedImagesArray);
            getData();
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        dispatch(SetLoader(false));
        message.error(error.message);
    }
  }

  return (
    <div>
      <div className="flex gap-5 mb-5">
        {images.map((image) => {
          return (
            <div className="flex gap-2 border border-solid border-gray-500 rounded p-3 items-end">
              <img
                className="object-cover w-20 h-20 rounded"
                src={image}
                alt=""
              />
              <i
                className="ri-delete-bin-7-fill cursor-pointer"
                onClick={() => deleteImage(image)}
              ></i>
            </div>
          );
        })}
      </div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
      >
        <Button type="primary">Upload Image</Button>
      </Upload>
      <div className="flex justify-end gap-5 mt-5">
        <Button type="default" onClick={() => setShowProductForm(false)}>
          Cancel
        </Button>
        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Images;
