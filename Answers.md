# Future Skills Assignment

## Explain the relationship between the "Product" and "Product_Category" entities from the above diagram.

### The diagram shows a relational database schema for an e-commerce system. The two relevant entities fo this question are :

**Product** : This entity represents a product sold by the e-commerce store. It has attributes such as:

- name: This key defines the name of the product.
- desc: This key defines the description of the product
- SKU: This key defines the stock keeping unit of the product
- category_id: This key defines the category to which the product belongs. It is a reference to the Product_Category schema and is of type Schema.Types.ObjectId. It is required for each product.
- inventory_id: This key defines the inventory to which the product is associated. It is a reference to the Inventory schema and is of type Schema.Types.ObjectId. It is required for each product.
- price: This key defines the price of the product and is of type Number. It is required for each product.
- discount_id: This key defines the discount applicable to the product. It is a reference to the Discount schema and is of type Schema.Types.ObjectId.
- created_at: This key defines the timestamp when the product record was created and is of type Date. It has a default value of the current date and time.
- modified_at: This key defines the timestamp when the product record was last modified and is of type Date. It has a default value of the current date and time.
- deleted_at: This key defines the timestamp when the product record was soft deleted and is of type Date.

**Product_Category**: This entity represents a category that a product can belong to. It has attributes such as:

- name: This key defines the name of the product category
- desc: This key defines the description of the product category
- created_at: This key defines the timestamp when the product category record was created and is of type Date. It has a default value of the current date and time.
- modified_at: This key defines the timestamp when the product category record was last modified and is of type Date. It has a default value of the current date and time.
- deleted_at: This key defines the timestamp when the product category record was soft deleted and is of type Date.

For a one-to-many relationship where a product can belong to one category but a category can have many products, using references is a common approach.

In this scenario, the Product document would contain a reference (typically the \_id field) to the corresponding Product_Category document. This reference establishes the relationship between the two entities.

- For example, the Product document might look like this:

```json
{
  "_id": ObjectId("609c5e9d9e8c275f43531234"),
  "name": "Product Name",
  "desc": "Product Description",
  "SKU": "12345",
  "category_id": ObjectId("609c5e9d9e8c275f43530001"),
  "price": 19.99
}
In this example, the category_id field references the _id of the Product_Category document to which this product belongs.

On the other hand, the Product_Category document would look like this:


{
  "_id": ObjectId("609c5e9d9e8c275f43530001"),
  "name": "Category Name",
  "desc": "Category Description"
}


```

## How could you ensure that each product in the "Product" table has a valid category assigned to it?.

### There are a couple of ways to ensure that each product in the "Product" table has a valid category assigned to it in MongoDB:

- Schema Definition: I defined a schema for the 'Product' collection using Mongoose, including a field for the category ID as a reference to the 'Product_Category' collection:

```json

const productSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Product_Category', required: true },
    price: { type: Number, required: true }
});

```

- Validation: To ensure that each product has a valid category assigned, I implemented schema validation. This validation checks if the category ID provided for each product exists in the 'Product_Category' collection before allowing the product to be inserted or updated.
- Pre-Save Hook: I used a pre-save hook in Mongoose to perform validation before saving a product. This hook checks if the category ID exists in the 'Product_Category' collection and prevents the product from being saved if it doesn't:

```json
productSchema.pre('save', async function(next) {
   const Category = mongoose.model('Product_Category');
   const categoryExists = await Category.exists({ _id: this.category_id });
   if (!categoryExists) {
       throw new Error('Invalid category ID');
   }
   next();
});

```

- Error Handling: I ensured that any validation errors that occur during the save operation are handled properly, providing appropriate feedback to the user or application.
