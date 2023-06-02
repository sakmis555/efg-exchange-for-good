import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";

function Images({selectedProduct, getData, setShowProductForm}) {
    const [file = null, setFile] = useState(null);
    const dispatch = useDispatch();
    const upload = () => {
        try {
            dispatch(SetLoader(true));
            // upload image to cloudinary

            dispatch(SetLoader(false));
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
  return (
  <div>
    <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
            setFile(info.file);
        }}
    >
        <Button type="primary">
            Upload Image
        </Button>
    </Upload>
    <div className="flex justify-end gap-5 mt-5">
        <Button
            type="default"
            onClick={() => setShowProductForm(false)}
        >
            Cancel
        </Button>
        <Button
            type="primary"
            onClick={upload}
            disabled={!file}
        >
            Upload
        </Button>
    </div>
  </div>
  );
}

export default Images;
