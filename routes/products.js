//Modules

const express = require('express');
const app = express();
const router = express.Router();
const dbProducts = require(`../db/productsDB`);


// router.get('/', (req, res)=>{

// });
router.post('/', (req, res)=>{
  console.log(req.body);
  dbProducts.post(req.body);
});







module.exports = router;