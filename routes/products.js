const express = require('express');
const router = express.Router();
const dbProducts = require(`../db/productsDB`);
const knex = require(`../db/knex/knex.js`);

router.post('/', (req, res) => {
  let data = {name, price, inventory} = req.body;
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
  let data = {name, price, inventory} = req.body;
  let id = req.params.id;

   return knex('products').where('id', id).update({
      name : data.name,
      price: data.price,
      inventory: data.inventory,
  },'*')
  .then(result => {
    res.redirect(`/products/${id}`);
  })
  .catch(err => {
    res.json('error');
  })

})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  return knex.select(`*`).from(`products`).where(`id`, id).del()
  .then(result => {
    res.redirect("/products");
  })
  .catch(err => {
    res.json(`error`);
  })




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
  return knex.select(`*`).from(`products`).where(`id`,id)
  .then(result => {
    res.render('partials/edit', result[0]);
  })
  .catch(err => {
    res.json('error');
  })


});

router.get('/:id', (req, res) => {
  let id = req.params.id;

  return knex.select(`*`).from('products').where(`id`, id)
  .then(result =>{
    console.log("CONSOLE"+result[0]);
    res.render('partials/product', result[0]);
  })
  .catch(err =>{
    res.json('Error');
  })

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
  .catch(err =>{
    res.json('Error');
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