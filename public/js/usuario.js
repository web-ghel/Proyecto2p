const app = new Vue({
    el: '#app',
    data: {
        search: "",
        objeto : [],
        objeto2: []
        
       
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
               axios.get('http://localhost:3000/api/producto'),
               axios.get('http://localhost:3000/loginperfil')
           ])
           .then(axios.spread((productores, usuariores)=>{
               var arr = productores.data
               var perfil = usuariores.data
               for (let index = 0; index < arr.length; index++) {
                    Vue.set(app.objeto,index,{nombre: arr[index].nombre, precio: arr[index].precio , color: arr[index].color, tamano: arr[index].tamano, beneficio: arr[index].beneficio } )
                }
                Vue.set(app.objeto2,0,{nombre: perfil.nombre + " " + perfil.apellido, mail: perfil.mail , telefono: perfil.telefono, direccion: perfil.direccion } )


           }))
        },
        
            
    }
  })