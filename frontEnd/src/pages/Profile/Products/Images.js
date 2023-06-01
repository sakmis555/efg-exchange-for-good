import { Button, Upload } from "antd";
import React, { useState } from "react";

function Images({selectedProduct, getData, setShowProductForm}) {
    const [file = null, setFile] = useState(null);

    const upload = () => {
        console.log(file);
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
