//Instalar sequelize
//Instalar mysql2

const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize('proyectodaw','adproyecto','adproyecto',{
	host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexion exitosa');
  })
  .catch(err => {
    console.error('Erro al abrir la base de datos', err);
  });

class Usuario extends Model{}
Usuario.init({
	idUser: { type: Sequelize.STRING, primaryKey: true },
	nombre: Sequelize.STRING,
	apellido: Sequelize.STRING,
	mail: Sequelize.STRING,
	telefono: Sequelize.STRING,
	direccion: Sequelize.STRING,
	esvendedor: Sequelize.BOOLEAN,
	escliente: Sequelize.BOOLEAN,
	esadministrador: Sequelize.BOOLEAN
},{ sequelize, modelName: 'usuario'});

class Producto extends Model{}
Producto.init({
	idProduc: { type: Sequelize.INTEGER, primaryKey: true },
	nombre: Sequelize.STRING,
	precio: Sequelize.DECIMAL,
	color: Sequelize.STRING,
	tamano: Sequelize.STRING,
	beneficio: Sequelize.STRING,
	vendedor: { type:Sequelize.STRING, references: {
		model: Usuario, key: 'idUser'
	}}
},{ sequelize, modelName: 'producto'});

class Tienda extends Model{}
Tienda.init({
	idLocal: { type: Sequelize.INTEGER, primaryKey: true },
	nombre: Sequelize.STRING,
	telefono: Sequelize.STRING,
	direccion: Sequelize.STRING,
	vendedor: { type:Sequelize.STRING, references: {
		model: Usuario, key: 'idUser'
	}}
},{ sequelize, modelName: 'tienda'});

class Mensaje_Usuario extends Model{}
Mensaje_Usuario.init({
	idMU: { type: Sequelize.INTEGER, primaryKey: true },
	contenido: Sequelize.TEXT,
	vendedor: { type:Sequelize.STRING, references: {
		model: Usuario, key: 'idUser'
	}},
	cliente: { type:Sequelize.STRING, references: {
		model: Usuario, key: 'idUser'
	}}
},{ sequelize, modelName: 'mensajeusuario'});

class Mensaje_Producto extends Model{}
Mensaje_Producto.init({
	idMU: { type: Sequelize.INTEGER, primaryKey: true },
	contenido: Sequelize.TEXT,
	producto: { type:Sequelize.INTEGER, references: {
		model: Producto, key: 'idProduc'
	}},
	cliente: { type:Sequelize.STRING, references: {
		model: Usuario, key: 'idUser'
	}}
},{ sequelize, modelName: 'mensajeproducto'});

module.exports = {Usuario, Producto, Tienda, Mensaje_Producto, Mensaje_Usuario};
