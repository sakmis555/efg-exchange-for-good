const router = require("express").Router();
const Product = require("../models/productModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Notification = require("../models/notificationsModel");

// add new product
router.post("/add-product", authMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    // send notification to admin
    const admins = await User.find({ role: "admin"});
    admins.forEach( async (admin) => {
      const newNotification = new Notification({
        user: admin._id,
        message: `New Product added by ${req.user.name}`,
        title: "New Product added",
        onClick: "/admin",
        read: false,
      });
      await newNotification.save();
    })
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
    const { seller, category = [], age = [], status } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }

    // filter by category
    if (category.length > 0) {
      filters.category = { $in: category };
    }
    // filter by age
    if( age.length > 0) {
      age.forEach((item) => {
        const fromAge = item.split("-")[0];
        const toAge = item.split("-")[1];
        filters.age = {$gte: fromAge, $lte: toAge};
      })
    }
    const products = await Product.find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get product by id
router.get("/get-product-by-id/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller");
    res.send({
      success: true,
      data: product,
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
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { status });

    // send notification to seller when admin approves
    const newNotification = new Notification({
      user : updatedProduct.seller,
      message: `Your Product ${updatedProduct.name} has been ${status}`,
      title: "Product status updated",
      onClick: "/profile",
      read: false,
    })
    await newNotification.save();
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
