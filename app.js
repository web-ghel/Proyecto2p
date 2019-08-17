const express = require("express")
const bodyParser = require("body-parser")
const {Usuario, Producto,  Tienda, Mensaje_Usuario, Mensaje_Producto} = require('./db')
const mongoose = require("mongoose")
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')




const app = express()


app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  
app.use(session({
    secret: "a secret secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// mongoose connect and schema  
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser : true})
const userSchema = new mongoose.Schema({
    username: String, 
    password: String
})

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", userSchema)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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

app.get("/perfil", function(req,res){
    console.log(req.user)
   
    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/public/vendedor.html")
    }else{
        res.send("error")
    }
})


app.post('/register' , function(req,res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err)
            res.redirect(__dirname+"/public/login.html")
        }else{
            passport.authenticate("local")(req ,res, function(){
                res.redirect("/")
            })
        }
    })
})

app.post('/login', function(req, res){

    const user = new User({
        username: req.body.username,
        password: req.body.passport,
    })
    req.login(user, function(err){
        if(err){
            console.log(err)
        }else{
            console.log(user)
            passport.authenticate("local")(req,res,function(){
                res.redirect("/perfil")
                console.log("autenticado")
            })
        }
    })
})

app.get('/loginperfil' , function(req,res){
    console.log(req.user)
    Usuario.findOne({
        where:{mail:req.user.username}
    }).then(user =>{
       res.send(JSON.stringify(user))
    })
})

app.listen(3000, function(){
    console.log("server listening ")
})