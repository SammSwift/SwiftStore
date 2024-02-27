import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  return res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch top products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(5);

  return res.json(topProducts);
});

// @desc Fetch a single product
// @route GET /api/products
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});

// @desc Create new product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, brand, countInStock, description, image } =
    req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    category,
    brand,
    countInStock,
    numReviews: 0,
    description,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update product
// @route PUT /api/products
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, category, brand, countInStock, description, image } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.price = price;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create Review
// @route POST /api/products/:id/review
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You've already reviewed this product");
    }

    const review = {
      rating: Number(rating),
      comment,
      profileImage: req.user.profileImage,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc Fetch a single product
// @route DELETE /api/products
// @access private admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    return res.json({ message: "Product deleted successfully" });
  }

  throw new Error("Product not found");
});

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  createProductReview,
  updateProduct,
  getTopProducts,
};
