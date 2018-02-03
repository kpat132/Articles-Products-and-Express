//Modules
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Constants
const PORT = process.env.PORT || 8080;

//Application
const app = express();
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.hbs', handlebars({ default: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs' );


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
