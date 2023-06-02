const router = require("express").Router();
const Product = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");
const { cloudinary_js_config } = require("../config/cloudinaryConfig");
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
router.get("/get-products", async (req, res) => {
    try {
        const products = await Product.find().sort({createdAt : -1});
        res.send({
            success : true,
            products
        })
    } catch (error) {
        res.send({
            success : false,
            message : error.message,
        })
    }
});

// edit a product
router.put("/edit-product/:id",authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success : true,
            message: "Product updated successfully",
        })
  } catch (error) {
    res.send({
      success : false,
      message : error.message,
    })
  }
});

// delete a product
router.delete("/delete-product/:id",authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
        res.send({
            success : true,
            message: "Product deleted successfully",
        })
  } catch (error) {
    res.send({
      success : false,
      message : error.message,
    })
  }
});

//get image from pc

// sm shortly: multer is getting the image from system here
const storage = multer.diskStorage({
  filename: function(req, file, callback) {          //sm configuration code as per the multer documentation
    callback(null, Date.now() + file.originarlname); //sm standard multer code to create the callback with the file.
  },
});


router.post("/upload-image-to-product", authMiddleware, multer({storage: storage}).single('file'), async(req, res) => {
// sm 1. Get the imageUrl in the req.body.imageUrl.
// sm 2. After passing authMiddleware, go to the try-catch block to handle the logic to pass the imageUrl to the images array for the product
  try {
    // upload image to cloudinary
    const result = await cloudinary_js_config.uploader.upload(req.file.path);  // sm shortly: sending the image to the cloudinary
    
    const productId = req.body.productId;
    // sm push the req.imageUrl(secure_url) to the images array
    await Product.findByIdAndUpdate(productId,{
      $push: {images: result.secure_url} // sm push the images with result.secure_url( imageUrl from the cloudinary = secure_url)
    })
    res.send({
      success: true,
      message: "Image uploaded successfully",
      result,
    })
  } catch (error) {
    
  }
})
module.exports = router;