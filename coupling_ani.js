
function animate(systemSize) {	
	// Model paramaters
	var alpha = 1.
	var beta = 1.
	var mu = 1.
	var lam = 1.
	// SETUP
	
	var r =systemSize;
	
	var X1 = r;
	var X2 = 0;
	var Z1 = 1;
	var Z2 = 0;
	var Y1 = 1;
	var Y2 = 0;
	
	var DIFF = 0; // different between PDMP and 
	
	var historyX1 = [];
	var historyX2 = [];
	
	var historyZ1 = [];
	var historyZ2 = [];

	var historyDIFF = [];

	var w = 600;
	var h = 300;
	var drawFlag = true
	var dt = 0.01 // timestep for tau leaping and forward Euler
	var frameRate = 10 // 50 milliseconds
	var offset =  1// amount to offset graph on each update 
	var color = "black"
	
	var xMax = d3.max(X1, function(d) { return d;} ); 
	
	var svg = d3.select("body")
					.append("svg")
					.attr("width", w+10)
					.attr("height", h+10)
					//.attr("style", "steelblue");

	// var pointX1  = svg
// 		   .append("circle")
// 		   .attr("cx", function(d) {return w-20; })
// 		   .attr("cy", function(d) {return h-(X1/r)*h;})
// 		   .attr("r", 4).attr("fill","steelblue");
// 	
// 	var pointZ1  = svg
// 		   .append("circle")
// 		   .attr("cx", function(d) {return w-20; })
// 		   .attr("cy", function(d) {return h-(X1/r)*h;})
// 		   .attr("r", 4).attr("fill","black");

	    
	var lineFunction = d3.svg.line()
		.x(function(d) { return d[0]; })
 		.y(function(d) { return d[1]; })
		.interpolate("basis");
		
	var areaFunction = d3.svg.area()
    .x(function(d) { return d[0]; })
    .y0(function(d) { return d[1]; })
    .y1(function(d) { return d[1]; });

		
	var pathX1 = svg.append("path")
		 .attr("d", lineFunction(historyX1))
		.attr("stroke", "steelblue")
		.attr("stroke-width", 2)
		.attr("fill", "none");
	
	var pathZ1 = svg.append("path")
		 .attr("d", lineFunction(historyZ1))
		.attr("stroke", "black")
		.attr("stroke-width", 4)
		.attr("fill", "none")
		.attr("stroke-opacity", 0.2);
		
	// var pathDIFF = svg.append("path")
// 		//.attr("class","area")
// 		 .attr("d", lineFunction(historyDIFF))
// 		.attr("stroke", "red")
// 		.attr("stroke-width", 1)
// 		.attr("fill", "none")
// 		.attr("stroke-opacity", 0.4);
	
	// Create x-axis
	svg.append("line")
		.attr("x1", 10)
		.attr("y1", h)
		.attr("x2", w)
		.attr("y2", h)
		.attr("stroke-width", 2)
		.attr("stroke", "gray");
	// Create y-axis
	svg.append("line")
		.attr("x1", 20)
		.attr("y1", h+10)
		.attr("x2", 20)
		.attr("y2", 0)
		.attr("stroke-width", 2)
		.attr("stroke", "gray");
		// y-axis label
	// svg.append("text")
// 			.attr("class", "y label")
// 			.attr("text-anchor", "end")
// 			.text("No. of Particles")
// 			.attr("transform", "translate(15, 40) rotate(-90)")
// 			.attr("font-size", "20px")
// 			.attr("font-family", "'Open Sans', sans-serif");
		
	
	// MAKE LEGEND
	
	var legendx = 60;
	var legendy = 30; 
	svg.append("text")
			.attr("x", function(d) { return legendx; })
	        .attr("y", function(d) { return legendy; })
			.text("Full Model")
			.attr("font-size", "15px")
			.attr("font-family", "'Open Sans', sans-serif");
	svg.append("line")
		.attr("x1", legendx +80)
		.attr("y1", legendy -3)
		.attr("x2", legendx +120)
		.attr("y2", legendy -3)
		.attr("stroke-width", 3)
		.attr("stroke", "steelblue");
	svg.append("text")
			.attr("x", function(d) { return legendx; })
	        .attr("y", function(d) { return legendy+20; })
			.text("PDMP")
			.attr("font-size", "15px")
			.attr("font-family", "'Open Sans', sans-serif");
	svg.append("line")
		.attr("x1", legendx +80)
		.attr("y1", legendy -3+20)
		.attr("x2", legendx +120)
		.attr("y2", legendy -3+20)
		.attr("stroke", "black")
		.attr("stroke-width", 4)
		.attr("fill", "none")
		.attr("stroke-opacity", 0.2);
	// MAKE TITLE
	svg.append("text")
			.attr("x", function(d) { return w/2; })
	        .attr("y", function(d) { return 20; })
			.text("r = "+r)
			.attr("font-size", "25px")
			.attr("font-family", "'Open Sans', sans-serif");
	
	// MAKE SLIDER
	var slider = svg.append("g")
    .attr("class", "slider")

	// slider.selectAll(".extent,.resize")
//     	.remove();
// 
// 	slider.select(".background")
//     	.attr("height", height);
// 
// 	var handle = slider.append("circle")
//     	.attr("class", "handle")
//     	.attr("transform", "translate(0," + height / 2 + ")")
//     	.attr("r", 9);

	
	
	// ANIMATE	
	var anim = d3.interval(function (elapsed) {if (drawFlag) {draw(elapsed);}},frameRate);
	

	function draw(elapsed) {
	
		// Take step in simulations 
	    step()	
	    
		// update point data
		// pointX1.data([X1]);
// 		pointZ1.data([Z1]);
		
		// animate step 
		// pointX1
// 			.transition()
// 			.duration(frameRate/5.) 
// 			.ease("linear") 
// 			.attr("cy", function(d) {return h-(d/r)*h;})
// 		
// 		pointZ1
// 			.transition()
// 			.duration(frameRate/5.) 
// 			.ease("linear") 
// 			.attr("cy", function(d) {return h-d*h;})
		
		pathX1.transition().duration(frameRate).attr("d", lineFunction(historyX1))
		pathZ1.transition().duration(frameRate).attr("d", lineFunction(historyZ1))
		//pathDIFF.transition().duration(frameRate).attr("d", lineFunction(historyDIFF))
		
		
		// if (Y1 = 0.){
// 			color = "red"
// 		}else
// 		{
// 			color = "black"
// 		}
		//d3.selectAll("path").attr("stroke", color)
		//pointx1.attr("fill", color)
		//pathx2.transition().duration(dt).attr("d", lineFunction(historyX2))
	
	
		   
       
    }
    
    function step() {
    	// Use tau-leaping with tau = dt for x
    	birth = poisson(Y1*r*alpha*dt)
    	death = poisson(X1*beta*dt)
    	
   		X1=X1 -death + birth;
		//X2=X2 +rightJumps - rightLeft;

		// Use forward Euler for Z
		Z1 = Z1+ dt*(Y1*alpha-Z1*beta)
		//Z2 = Z2+ dt*(Z1*(Y1+0.5)*alpha-Z2*(Y2+0.5)*beta)
		
    	// for y we don't want to use tau-leaping since
    	// it is easy for them to become negative
    	// this assumes 1/lam >> dt
    	nextYjump = d3.randomExponential(lam)()
    	if (nextYjump<dt) {
    		// swap Y1 and Y2
    		Y1 = 1.-Y1
    		Y2 = 1.-Y2
    		
		}
		
    
		// Update history 
		historyX1.push([w-20,h-(X1/r)*h])
		historyZ1.push([w-20,h-Z1*h])
		//historyDIFF.push([w-20,h-Math.abs(Z1*h-(X1/r)*h)])
		for(var i=0;i<historyX1.length-1;i++){
			historyX1[i][0]=historyX1[i][0] - offset;
			historyZ1[i][0]=historyZ1[i][0] - offset ; 
			//historyDIFF[i][0]=historyZ1[i][0] - offset ; 
		}
    }
    
    function poisson(rate) {
    	L = Math.pow(2.7182,-rate);
    	//if (L<dt) {
    		// swap Y1 and Y2
    	//	return 1.
		//}else{
		//	return 0.
		//}
		
     	count = 0.
		p = 1.
		do {
			count = count+1
			u = d3.randomUniform(0,1)();
			p = p*u	
		}	while (p>L) ;
		return count-1

    
    }
 }


  //  d3.slider().min(5).max(100).on("slide", function(evt, value) {
  //		r = value
	//})

