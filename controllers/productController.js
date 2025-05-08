const products = [
  {
    "id": 101,
    "name": "Wireless Headphones",
    "description": "Noise-cancelling over-ear wireless headphones with 20-hour battery life.",
    "price": 999.99,
    "category": "Electronics",
    "stock": 150,
    "rating": 4.5,
     "image": "https://example.com/images/product101-front.jpg",
    },

    {
      "id": 102,
      "name": "Hair Dryer",
      "description": "Noise-less, fast with 10-hour battery life.",
      "price": 1999.99,
      "category": "Electronics",
      "stock": 10,
      "rating": 4,
       "image": "https://example.com/images/product102-front.jpg",
      },
];

exports.getProducts = (req, res) => {
  return res.status(200).json({ msg: "Products List", products }) 
}

exports.postProduct = (req, res) => {
  const { id, name, description, price, category, stock, rating, image } = req.body;
  const findProduct = products.find (product => product.id === Number(id));
  if(findProduct){
    return res.status(400).json({ msg: "Product already exists", findProduct });
  }
  const newProduct = {
    id:Number(id),
    name,
    description, 
    price, 
    category, 
    stock, 
    rating, 
    image, 
  }
  products.push(newProduct);

  return res.status(201).json({ msg: "Product Added Successfully", product: newProduct });
}

exports.findProduct = (req, res) => {
  const productId = req.params.productId;
  const product = products.find(product => product.id === Number(productId));
  if (product) {
    return res.status(200).json(product);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
}

exports.editProduct = (req, res) => {
const { id, name, description, price, category, stock, rating, image } = req.body;
const productId = req.params.productId;

const productIndex = products.findIndex(product => product.id === Number(productId));
if(productIndex === -1){
  return res.status(404).json({ msg: "Product Not found"});
}
const product = products[productIndex];
  if(name !== undefined) product.name = name;
  if(description !== undefined) product.description = description;
  if(price !== undefined) product.price = price; 
  if(category !== undefined) product.category = category;
  if(stock !== undefined) product.stock = stock; 
  if(rating !== undefined) product.rating = rating;
  if(image !== undefined) product.image = image;

  return res.status(200).json({ msg: "Product Updated", product });
}

exports.deleteProduct = (req, res) => {
  const productId = req.params.productId;
  const index = products.findIndex(product => product.id === Number(productId));
  if(index !== -1){
    const deleteProduct = products.splice(index, 1);
    return res.status(200).json({ message: "Product deleted successfully", product: deleteProduct[0] });
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
}