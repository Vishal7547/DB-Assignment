import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  inventory_id: {
    type: Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount_id: {
    type: Schema.Types.ObjectId,
    ref: "Discount",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    required: false,
  },
});

const Category = mongoose.model("Category", categorySchema);

const inventorySchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    required: false,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

const discountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: {
    type: String,
    required: true,
  },
  discount_percent: {
    type: Number,
    required: false,
  },

  active: {
    type: Boolean,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    required: false,
  },
});

const Discount = mongoose.model("Discount", discountSchema);

export { Product, Category, Inventory, Discount };
