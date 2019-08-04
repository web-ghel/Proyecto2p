const app = new Vue({
    el: '#app',
    data: {
        search: "",
        objeto : [], 
    },
    created: function(){
        this.loadJson();
    },
    computed :{
        filtered: function(){
            return this.objeto.filter((prod)=> {
                return prod.descripcion.match(this.search); 
            })

        }

    },
    methods :{
        loadJson (){   
            var app = this
            tmp = []
            axios.get('./data/productos.json')
            .then(function(response){
                var arr = response.data.productos
                for (let index = 0; index < arr.length; index++) {
                    console.log(arr[index])
                    //tmp.push({nombre: arr[index].nombre, imagen: arr[index].imagen , descripcion: arr[index].descripcion, tags: arr[index].tags})  
                    Vue.set(app.objeto,index,{nombre: arr[index].nombre, imagen: arr[index].imagen , descripcion: arr[index].descripcion, tags: arr[index].tags}   )
                }
                //this.objeto = tmp
            })
            .catch(function(error){
                app.titulo = "error"
            })
        }
            
    }
  })