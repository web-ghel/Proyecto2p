var data = [10, 20, 100,50,62];

var graf = d3.select("#pie-chart-1");
  var titulo = graf.append("h2")
  titulo.html("Grafico de vendedores");
  
  var width = 748,
      height = 530,
      radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888"]);

  var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var labelArc = d3.arc()
      .outerRadius(radius - 50)
      .innerRadius(radius - 50);

  var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d; });

  var svg = d3.select("#pie-chart-1").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")";   })
        .attr("dy", ".35em")
        .text(function(d) { return d.data; });

  