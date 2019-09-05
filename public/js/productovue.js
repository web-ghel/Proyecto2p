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
            axios.get('http://localhost:3000/all/products')
            .then(function(response){
                console.log(response.data[0].nombre)
                var arr = response.data
                //console.log(arr)
                for (let index = 0; index < arr.length; index++) {
                    Vue.set(app.objeto,index,{nombre: arr[index].nombre, imagen: "/images/prod8.jpg" , descripcion: arr[index].beneficio, tags: arr[index].tamano}   )
                }
            })
            .catch(function(error){
                app.titulo = "error"
            })
        }
            
    }
  })