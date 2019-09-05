const app = new Vue({
    el: '#app',
    data: {
        search: "",
        form : {nombre : "", username: "", apellido: "", password : "", esVendedor: 1,
                telefono: "" , direccion : ""}, 
    },


    methods :{
        registrar (){   
            var app = this
            var postStr = 'nombre='+app.form.nombre + '&apellido='+app.form.apellido + "&username="+app.form.username+"&password="+app.form.password+"&direccion="+app.form.direccion+"&telefono="+app.form.telefono+"&esVendedor=1"
           
            axios.post('http://localhost:3000/register',postStr,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(function(response){
                
            })
            .catch(function(error){
                
            })
        }
            
    }
  })