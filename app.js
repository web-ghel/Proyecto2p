const express = require("express")
const bodyParser = require("body-parser")
const {Usuario, Producto,  Tienda, Mensaje_Usuario, Mensaje_Producto} = require('./db')
const mongoose = require("mongoose")
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const nodemailer = require("nodemailer");
const xoauth2 = require('xoauth2');



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
const productSchema = new mongoose.Schema({
    nombre : String,
    precio : String,
    color: String,
    tamano : String,
    beneficio: String,
    vendedor: String,
    fecha: String
})
const ProdMongo = new mongoose.model("Product", productSchema)

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
    
    Usuario.findOne({
        where:{mail:req.user.username}
    }).then(user =>{
        Producto.findAll({where :{vendedor : user.idUser}}).then(products => {
            res.send( JSON.stringify(products, null, 4))
        })
    })


})

app.get("/perfil", function(req,res){
    

    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/public/vendedor.html")
    }else{
        res.sendFile(__dirname+"/public/login.html")
    }
})

app.get('/logout', function(req,res){
    req.logout()
    res.redirect('/')

})


app.post('/register' , function(req,res){
    console.log(req.body.username + " " + req.body.password)
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err)
            res.redirect(__dirname+"/public/login.html")
        }else{
            var id 
            id = Math.floor(Math.random() * 1000)
            Usuario.create({idUser: id, nombre:req.body.nombre, apellido:req.body.apellido, mail: req.body.username, telefono:req.body.telefono, direccion:req.body.direccion, esVendedor:req.body.esVendedor}).then(function(user){
                if(user){
                    console.log("registrado")
                }else{
                    console.log("error")
                }
            })

            passport.authenticate("local")(req ,res, function(){
                res.redirect("/")
            })
        }
    })
})

app.post('/login', function(req, res){

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })
    req.login(user, function(err){
        if(err){
            console.log(err)
        }else{
            
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

app.get('/all/usuarios' , function(req,res){
    Usuario.findAll().then(tiendas => {
        res.send( JSON.stringify(tiendas, null, 4))
    })
})

// Productos
app.get('/all/products' , function(req,res){
    Producto.findAll().then(products => {
        res.send( JSON.stringify(products, null, 4))
    })
})

app.post('/user/crud', function(req, res){
    Usuario.findOne({
        where:{mail:req.user.username}
    }).then(user =>{
        var dic ={}
        dic = req.body
        dic["vendedor"] = user.idUser
        Producto.create(dic).then(function(prod){
            if(prod){
                console.log("Producto ingresado")
            }
        })  
    })
})
app.post('/user/crud/admin', function(req, res){
        var dic ={}
        dic = req.body
        dic["vendedor"] = 101
        Producto.create(dic).then(function(prod){
            if(prod){
                console.log("Producto ingresado")
            }
        })  
})

app.delete('/user/crud/:id', function(req, res){
    Producto.findByPk(req.params.id).then((prod) =>{
        if(prod){
            return prod.destroy()

        }else{
            res.send("no se destruyo")
        }
    })

})

app.put('/user/crud/:id', function(req, res){
    Producto.update(req.body, {where: {idProduc: req.params.id}}).then((result) =>{
        console.log(result)
    })
})

app.get('/api/producto/all', function(req,res){
    ProdMongo.find().then(products => {
        res.send( JSON.stringify(products, null, 4))
    })
})

//tienda
app.post('/tienda/crud', function(req, res){

    Usuario.findOne({
        where:{mail:req.user.username}
    }).then(user =>{
        var dic ={}
        dic = req.body
        dic["vendedor"] = user.idUser
            
        Tienda.create(dic).then(function(prod){
            if(prod){
                console.log("Producto ingresado")
            }
        })
    })
})

app.post('/admin/crud', function(req, res){

        var dic ={}
        dic = req.body
        dic["idUser"] = 202
            
        Usuario.create(dic).then(function(prod){
            if(prod){
                console.log("usuario ingresado")
            }
        })
    
})

app.get('/tienda/crud', function(req,res){
    Usuario.findOne({
        where:{mail:req.user.username}
    }).then(user =>{
        Tienda.findAll({where :{vendedor : user.idUser}}).then(tiendas => {
            console.log(JSON.stringify(tiendas, null, 4))
            res.send( JSON.stringify(tiendas, null, 4))
            
        })
    })
})

app.put('/tienda/crud/:id', function(req,res){
    Tienda.update(req.body, {where: {idLocal: req.params.id}}).then((result) =>{
        console.log(result)
    })
})
app.put('/usuario/crud/:id', function(req,res){
    Usuario.update(req.body, {where: {idUser: req.params.id}}).then((result) =>{
        console.log(result)
    })
})

app.delete('/tienda/crud/:id', function(req, res){
    Usuario.findByPk(req.params.id).then((usuario) =>{
        if(usuario){
            return usuario.destroy()
        }else{
            res.send("no se destruyo")
        }
    })
})
app.delete('/usuario/crud/:id', function(req, res){
    Usuario.findByPk(req.params.id).then((usuario) =>{
        if(usuario){
            return usuario.destroy()
        }else{
            res.send("no se destruyo")
        }
    })
})
//Email
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'webgheldaw2019@gmail.com',
        pass: 'proyecto2019'
    }
});

app.get('/send',function(req,res){
  const mailOptions={
     to : req.query.to,
     subject : req.query.subject,
     text : req.query.text
  }
  Mensaje_Usuario.create({contenido:req.query.text}).then(function(mensaje){
    if(mensaje){
    console.log("Producto ingresado")
    }
})
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
  if(error){
    console.log(error);
    res.end("error");
  }else{
    console.log("Mensaje enviado" );
    res.end("sent");
  }
  });
});

app.get("/bases/data.csv", function(req,res){
    

    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/bases/data.csv")
    }else{
        res.sendFile(__dirname+"/bases/data.csv")
    }
})

app.listen(3000, function(){
    console.log("server listening")
})
