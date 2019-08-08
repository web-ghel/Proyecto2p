const express = require("express")
const bodyParser = require("body-parser")
const {Usuario, Producto,  Tienda, Mensaje_Usuario, Mensaje_Producto} = require('./db')


const app = express()


app.use(bodyParser.urlencoded({extended : true}))

app.use(express.static("public"))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})



app.get('/api/usuario', function(req, res){
    Usuario.findAll().then(users => {
        res.send( JSON.stringify(users, null, 4))
    })    
})
app.get('/api/producto', function(req, res){
    Producto.findAll().then(products => {
        res.send( JSON.stringify(products, null, 4))
    })    
})

app.listen(3000, function(){
    console.log("server listening ")
})