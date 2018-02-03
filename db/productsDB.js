let productArr = [];
let idNum = 3;

let fakeData = {
  id: 1,
  name: 'coffee',
  price: 2,
  inventory: 10
}
let fakeData2 = {
  id: 2,
  name: 'tea',
  price: 3,
  inventory: 15
}
productArr.push(fakeData)
productArr.push(fakeData2)

function getArray() {
  return productArr;
}

function post(data) {
  idNum = idNum + 1;

  let newProduct = {
    id: parseFloat(idNum),
    name: data.name,
    price: parseFloat(data.price),
    inventory: parseFloat(data.inventory)
  }

  productArr.push(newProduct);
  console.log(newProduct.price);
}

function findIndex(id) {
  // console.log(id);
  id = parseInt(id);
  const index = productArr.findIndex(element => element.id === id);
  console.log(index);
  return productArr[index];
}

function editProduct(product, id) {
  console.log('ID ' + id);
  id = parseInt(id);
  productArr.filter((element) => {
    if (element.id === id) {
      return element;
    } else {
      return false;
    };
  }).map((element) => {
    element.inventory = parseFloat(product.inventory);
    element.name = product.name;
    element.price = parseFloat(product.price);
    return element;
  });
};

function deleteProduct(id) {
  id = parseInt(id);
  const index = productArr.findIndex(element => element.id === id);
  console.log(index);
  if (index > -1) {
    productArr.splice(index, 1);
   // res.send({ 'success': true });
    return true;
  }
  else {
    return false;
   // res.send({ 'success': false });
  }
  //return productArr[index];
}


module.exports = {
  post: post,
  getArray: getArray,
  findIndex: findIndex,
  editProduct: editProduct,
  deleteProduct:deleteProduct
};