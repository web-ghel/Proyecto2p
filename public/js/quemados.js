var data = [4, 8, 15, 16, 23, 22,20,30,20,10,5];

var graf = d3.select("#grafo");
var titulo = graf.append("h2")
var div = graf.append("div").attr("id","graf");
titulo.html("Grafico de ventas");

d3.select("#grafo")
    .style("color", "black")
    .style("background-color", "white");





var divp= d3.select("#graf").attr("class","chart");

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 20 + "px"; })
    .text(function(d) { return d; });

