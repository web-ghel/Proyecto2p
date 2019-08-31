const app = new Vue({
    el: '#app',
    data: {
        id: "",
        id2:"",
        objeto : [],
        nuevoProd:{nombre: "", precio: "" ,tamano:"", color:""
        },
        actProd:{nombre: "", precio: "" ,tamano:"", color:""
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
            axios.get('http://localhost:3000/api/producto')
            .then(function(response){
                console.log(response.data[0].idProduc)
                var arr = response.data
                //console.log(arr)
                for (let index = 0; index < arr.length; index++) {
                    Vue.set(app.objeto,index,{nombre: arr[index].nombre, precio: arr[index].precio , color: arr[index].color, tamano: arr[index].tamano, beneficio: arr[index].beneficio , id: arr[index].idProduc}  )
                }
                console.log(app.objeto)
            })
            .catch(function(error){
                app.titulo = "error"
            })
        },
        agregarProd(){
            var app = this
            var postStr = 'nombre='+app.nuevoProd.nombre+"&precio="+app.nuevoProd.precio+"&tamano="+app.nuevoProd.tamano+"&color="+app.nuevoProd.color
            console.log("Agrego producto " + app.nuevoProd )
            axios.post('http://localhost:3000/user/crud',postStr,{
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
        }
            
    }
  })