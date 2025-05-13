const { number } = require('zod');
const products = require('../data/products.json');

exports.getProducts = (req, res) => {
  const { name, description, price, company, category, stock, rating, sort, select, lastId } = req.query;

  const queryObject = {};
  if (name) queryObject.name = name;
  if (description) queryObject.description = description;
  if (price) queryObject.price = price;
  if (company) queryObject.company = company;
  if (category) queryObject.category = category;
  if (stock) queryObject.stock = stock;
  if (rating) queryObject.rating = rating;

  // Filtering
  let filteredProduct = products.filter(p =>
    Object.keys(queryObject).every(key =>
      String(p[key]).toLowerCase().replace(/\s+/g, '')
        .includes(String(queryObject[key]).toLowerCase().replace(/\s+/g, ''))
    )
  );

  //pagination
  let startIndex = 0;
  const parseLastId = Number(lastId);
  if (lastId) {
    const index = filteredProduct.findIndex(p => p.id === parseLastId);
    if (index !== -1) {
      startIndex = index + 1;
    }
  }

  // Sorting
  if (sort) {
    const sortKey = sort.replace('-', '');
    const isDescending = sort.startsWith('-');
    filteredProduct = filteredProduct.sort((a, b) => {
      if (!a[sortKey] || !b[sortKey]) return 0;
      if (isDescending) {
        return b[sortKey] > a[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      }
    });
  }

  // Selecting fields
  if (select) {
    const fields = select.split(',').map(field => field.trim());
    filteredProduct = filteredProduct.map(product =>
      Object.fromEntries(fields.map(field => [field, product[field]]))
    );
  }

  // Limit
  const limit = Number(req.query.limit) || 3;

  const paginatedProducts = filteredProduct.slice(startIndex, startIndex + limit);

  res.status(200).json({
    total: filteredProduct.length,
    startIndex,
    limit,
    products: paginatedProducts
  });
};


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
  const productId = req.params.id;
  const product = products.find(product => product.id === Number(productId));
  if (product) {
    return res.status(200).json(product);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
}

exports.editProduct = (req, res) => {
const { id, name, description, price, category, stock, rating, image } = req.body;
const productId = req.params.id;

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
  const productId = req.params.id;
  const index = products.findIndex(product => product.id === Number(productId));
  if(index !== -1){
    const deleteProduct = products.splice(index, 1);
    return res.status(200).json({ message: "Product deleted successfully", product: deleteProduct[0] });
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
}