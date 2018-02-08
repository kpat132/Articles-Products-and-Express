const express = require('express');
const router = express.Router();
const dbProducts = require(`../db/productsDB`);
const knex = require(`../db/knex/knex.js`);

router.post('/', (req, res) => {
  let body = req.body;

  let data = {
    name: body.name,
    price: body.price,
    inventory: body.inventory
  }
    return knex('products').insert(data, '*')
      .then(result => {
        console.log(result);
        return res.redirect('/products');
      })
   .catch(err =>{
    return res.redirect('/products/new');
   })
 
});







router.put('/:id', (req, res) => {
  let id = req.params.id;
  let body = req.body;
  dbProducts.editProduct(body, id);
  return res.redirect(`/products/${id}`)
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  const deleteItem = dbProducts.deleteProduct(id);
  if (deleteItem) {
    res.redirect("/products");
  }
  else {
    console.log("TEST");
  }

});


router.get('/new', (req, res) => {
  return res.render('partials/new');
});

router.get(`/:id/edit`, (req, res) => {
  let id = req.params.id;
  let elemIndex = dbProducts.findIndex(id);
  res.render('partials/edit', elemIndex);

});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  let elemIndex = dbProducts.findIndex(id);
  res.render('partials/product', elemIndex);

});
router.get('/', (req, res) => {

 return knex.select(`*`).from('products')
  
 .then(result=>{
   console.log(result);

    let productObj = {
      name: result.name,
      price: result.price,
      inventory: result.inventory
    }
    res.render('partials/index',{pro:result});
  })
});









//Helper Functions
function validate(data) {

  let isValid = true;
  let error = { name: data.name, price: data.price, inv: data.inventory };
  if (typeof (data.name) !== 'string') {
    error.name = "Name is not a string";
    isValid = false;
  }
  if (isNaN(data.price)) {
    //console.log(typeof(data.price));
    error.price = "Price is not a number";
    isValid = false;
  }
  if (isNaN(data.inventory)) {
    error.inv = "Inventory is not a number";
    isValid = false;
  }
  if (isValid) {
    return true;
  }
  else {
    return error;
  }
}



module.exports = router;