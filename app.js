const express = require('express')
const parser = require('body-parser')
const routes = require('./routes/routes')

const app = express()
app.set('view engine', 'ejs')

//middleware
app.use(parser.urlencoded({extended:false}))
app.use(express.static('./public'))
app.use(routes)

// 404 handling
app.use( function( req, res, next ){
  res.status( 404 ); 
  res.render( '404.ejs', {title: "404 page"}); 
});

//server starts
app.listen(8000)