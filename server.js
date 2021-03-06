//Modules
const express = require('express');
const handlebars = require('express-handlebars');


//Constants
const PORT = process.env.PORT || 8080;

//Application
const app = express();
app.engine('.hbs', handlebars({ default: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs' );

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
const articles = require(`./routes/articles`);
const products = require(`./routes/products`);

app.use( `/products`, products);
app.use(`/articles`, articles);

//Server
app.listen(PORT, (err) => {
  if(err){throw err};
  console.log(`Server is listening on: ${PORT}`)
});
