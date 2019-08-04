$(document).ready(function() {
 
  $.ajax({
    url:'data/productos.json',
    dataType: 'json',
    type:'get',
    cache:'false',
    success: function(data){
      $(data.productos).each(function(index,value){
        
        var div = $('<div></div>').addClass('col-lg-4 col-md-6 mb-4') ;
        var div2 = $('<div></div>').addClass('card text-center card-product') ;
        var div3 = $('<div></div>').addClass('card-product__img') ;

        var img = $("<img>").addClass("card-img img-list");
        img.attr("src",value.imagen);

        var ul = $('<ul></ul>').addClass('card-product__imgOverlay') ;
        var li = $('<li></li>');
        var li2 = $('<li></li>');
        var btn1 = $('<button></button>');
        var btn2 = $('<button></button>');
        var i = $('<i></i>').addClass('fas fa-heart');
        var i2 = $('<i></i>').addClass('fas fa-address-book');

        var divBody = $('<div></div>').addClass('card-body') ;
        var p = $('<p></p>');
        var h4 = $('<h4></h4>').addClass('card-product__title') ;

        var a = $('<a></a>') ;
        a.attr("href", "single-product.html");
        a.text(value.descripcion);
        var sml =  $('<small></small>') ;
        sml.text(value.tags) ;

        h4.append(a);
        divBody.append(p);
        divBody.append(h4);
        divBody.append(sml);

        btn1.append(i);
        btn2.append(i2);
        li.append(btn1);
        li2.append(btn2);
        ul.append(li) ;
        ul.append(li2) ;
        div3.append(img) ;
        div3.append(ul);
        div2.append(div3);
        div2.append(divBody) ;
        div.append(div2) ;
        $("#productosMain").append(div);

      });

    }

  });
    $(".btn-success").click(function(){
      value = $('#busqueda').val().toLowerCase();
      $("#productosMain .col-lg-4").filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });


      return false ;
    });
});
