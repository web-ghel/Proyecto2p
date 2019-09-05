const app = new Vue({
    el: '#app',
    data: {
        id: "",
        id2:"",
        objeto : [],
        tienda:[],
        nuevoProd:{nombre: "", precio: "" ,tamano:"", color:""
        },
        actProd:{nombre: "", precio: "" ,tamano:"", color:""
        },
        editTienda:{nombre: "", direccion: "" ,telefono:""
        } 
    },
    created: function(){
        this.loadJson();
    },
    /*computed :{
        filtered: function(){
            return this.objeto.filter((prod)=> {
                return prod.descripcion.match(this.search); 
            })

        }

    },*/
    methods :{
        loadJson (){   
            var app = this
            tmp = []
            axios.all([
                axios.get('http://localhost:3000/all/products'),
                axios.get('http://localhost:3000/all/usuarios')
            ])
            .then(axios.spread((response, tiendas)=>{
                var arr = response.data
                var arr2 = tiendas.data
                for (let index = 0; index < arr.length; index++) {
                    Vue.set(app.objeto,index,{nombre: arr[index].nombre, precio: arr[index].precio , color: arr[index].color, tamano: arr[index].tamano, beneficio: arr[index].beneficio , id: arr[index].idProduc}  )
                    
                }
                for (let index2 = 0; index2 < arr2.length; index2++) {
                    Vue.set(app.tienda,index2,{nombre: arr2[index2].nombre, telefono: arr2[index2].telefono , direccion: arr2[index2].direccion,  id: arr2[index2].idUser, mail: arr2[index2].mail})
                }

  
            }))
            .catch(function(error){
                app.titulo = "error"
            })
        },
        agregarProd(){
            var app = this
            var postStr = 'nombre='+app.nuevoProd.nombre+"&precio="+app.nuevoProd.precio+"&tamano="+app.nuevoProd.tamano+"&color="+app.nuevoProd.color
            console.log("Agrego producto " + app.nuevoProd )
            axios.post('http://localhost:3000/user/crud/admin',postStr,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(function(response){
                
            })
            .catch(function(error){
                
            })
        },
        removerProd(){
            axios.delete('http://localhost:3000/user/crud/' + this.id)
            .then(function(response){
                console.log(this.response);
            })
            console.log("removiendo prod " + this.id)
        },
        actualizarProd(){
            var postStr = 'nombre='+app.actProd.nombre+"&precio="+app.actProd.precio+"&tamano="+app.actProd.tamano+"&color="+app.actProd.color
            axios.put('http://localhost:3000/user/crud/' + this.id2, postStr,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            console.log("actualizando prod " + this.id2,)
        },
        editarTienda(){
            console.log(this.id2)
            var postStr = 'nombre='+app.editTienda.nombre+"&direccion="+app.editTienda.direccion+"&telefono="+app.editTienda.telefono
            axios.put('http://localhost:3000/usuario/crud/' + "102", postStr,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            console.log("actualizando prod " + this.id2,)
        },
        removerTienda(){
            axios.delete('http://localhost:3000/usuario/crud/' + this.id)
            .then(function(response){
                console.log(this.response);
            })
            console.log("removiendo usuario " + this.id)
        },
            
    }
  })