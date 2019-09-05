var dat = [];

d3.csv("/bases/data.csv",conversor, function(data){
    console.log(data)
    dat=data.map(function(d) { return [d.precio,d.fecha] });
    console.log(dat)
    gratic(dat)
});

function conversor(d){
    pres = d.fecha.substring(0,4);
    d.fecha = parseFloat(pres);
    return d;
}

function gratic(data){
//The following code chains a bunch of methods. Method chaining is what makes d3 very simple and concise.
d3.select("body").append("svg").selectAll()  //'d3' calls the d3 library
                                             //'.select' selects the object (in this case the body of HTML)
                                             //'.append' adds SVG element to the body
                                             //'.selectAll()' selects all SVG elements
    .data(data)                              //'.data' gets the data from the variable 'data'
  .enter().append("circle")                  //'.enter' enters the data into the SVG 
                                             //the data enter as circles with '.append("circle")'
    .attr("r", 3)                            //'.attr' adds/alters atributes of SVG, 
                                             //such as radius ("r"), making it 3 pixels
    .attr("cx", function(d) { return d.x; }) //coordinates "cx" (circles' x coordinates)
    .attr("cy", function(d) { return d.y; }) //coordinates "cy" (circles' y coordinates)
    .style("fill", "darkblue");              //'.style' changes CSS of the SVG
                                             //in this case, fills circles with "darkblue" color
}