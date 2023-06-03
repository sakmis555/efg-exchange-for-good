const router = require("express").Router();
const Product = require("../models/productModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");

// add new product
router.post("/add-product", authMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send({
      success: true,
      message: "Product added Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all products
router.post("/get-products", async (req, res) => {
  try {
    const { seller, categories = [], age = [] } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    const products = await Product.find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// edit a product
router.put("/edit-product/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete a product
router.delete("/delete-product/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
/*
//get image from pc

// sm shortly: multer is getting the image from system here
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    //sm configuration code as per the multer documentation
    callback(null, Date.now() + file.originarlname); //sm standard multer code to create the callback with the file.
  },
});


router.post(
  "/upload-image-to-product",
  authMiddleware,
  multer({ storage: storage }).single("file"),
      // sm 1. Get the imageUrl in the req.body.imageUrl.
    // sm 2. After passing authMiddleware, go to the try-catch block to handle the logic to pass the imageUrl to the images array for the product
  async (req, res) => {

    try {
      // upload image to cloudinary
      // sm shortly: sending the image to the cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        
        folder: "ecg",
      });
      console.log(result);
      const productId = req.body.productId;
      // sm push the req.imageUrl(secure_url) to the images array
      // sm push the images with result.secure_url( imageUrl from the cloudinary = secure_url)
      await Product.findByIdAndUpdate(productId, {
        $push: { images: result.secure_url }, 
      });
      res.send({
        success: true,
        message: "Image uploaded successfully",
        result,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);
*/
// get image from pc
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post(
  "/upload-image-to-product",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "efg",
      });

      const productId = req.body.productId;
      await Product.findByIdAndUpdate(productId, {
        $push: { images: result.secure_url },
      });
      res.send({
        success: true,
        message: "Image uploaded successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

// update product status - admin
router.put("/update-product-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;

