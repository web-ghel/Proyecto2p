
var data = [4, 8, 15, 16, 23, 22,20,30,20,10,5];
var dat = [];
var ds=[];

var graf = d3.select("#grafo");
var titulo = graf.append("h2")
var div = graf.append("div").attr("id","graf");
titulo.html("Grafico de ventas");

d3.select("#grafo")
    .style("color", "black")
    .style("background-color", "white");
d3.csv("/bases/data.csv",conversor, function(data){
    console.log(data)
    dat=data.map(function(d) { return d.precio });
    console.log(dat)
    grafic(dat)
});

function conversor(d){
	pres = d.precio.substring(1);
    d.precio = parseFloat(pres);
    return d;
}

function grafic(dat){
	var divp= d3.select("#graf").attr("class","chart");


d3.select(".chart")
  .selectAll("div")
    .data(dat)
  .enter().append("div")
    .style("width", function(d) { return d * 20 + "px"; })
    .text(function(d) { return d; });

}

