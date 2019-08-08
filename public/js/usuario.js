const app = new Vue({
    el: '#app',
    data: {
        search: "",
        objeto : [], 
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
                console.log(response.data[0].nombre)
                var arr = response.data
                //console.log(arr)
                for (let index = 0; index < arr.length; index++) {
                    Vue.set(app.objeto,index,{nombre: arr[index].nombre, precio: arr[index].precio , color: arr[index].color, tamano: arr[index].tamano , beneficio : arr[index].beneficio } )
                }
            })
            .catch(function(error){
                app.titulo = "error"
            })
        }
            
    }
  })