let productArr = [];
let idNum = 1;

function post(req) {
  idNum = idNum + 1;
  console.log(req.name);
  
  let newProduct = {
    name: req.name,
    price: parseFloat(req.price),
    inventory: parseFloat(req.inventory),
    id: idNum
  }
  productArr.push(newProduct);
console.log(productArr);
}



module.exports = {
  post:post

};