  var doughnutData = [
				{
					value: 300,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Green"
				},
				{
					value: 100,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Yellow"
				},
				{
					value: 40,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Grey"
				},
				{
					value: 120,
					color: "#4D5360",
					highlight: "#616774",
					label: "Dark Grey"
				}

			];
			

			
			window.onload = function(){
			
				var options = {
				// Boolean - Whether to animate the chart
				animation: false,
				responsive : true
				};
				
				var ctx = document.getElementById("graph").getContext("2d");
				var myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
				
				  var hitter = [
				{
					value: 300,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "green"
				}];
				
				//myDoughnut.addData(,hitter);
				//myDoughnut.doughnutData[0].value = 100;
				console.log(myDoughnut);
				
				//myDoughnut.segments[0].value = 100;
				//myDoughnut.update();
				
			};