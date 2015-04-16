var CurrentPage = 4;

var maxProduction = 0,
creditLine = 0,
avaibleCash= 0,
unitCost = 0;

var news = '';


var doughnutData = [
				{
					value: 300,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Comp1"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Comp2"
				},
				{
					value: 100,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Comp3"
				},
				{
					value: 40,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Comp4"
				},
				{
					value: 120,
					color: "#4D5360",
					highlight: "#616774",
					label: "Comp5"
				},
				{
					value: 120,
					color: "#4D7360",
					highlight: "#616774",
					label: "Comp6"
				}

			];

var barChartData = {
	labels : ["first","second","third","forth","fifth","sixth"],
	datasets : [
		{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [1,2,3,4,5,6]
		}
]}
			
//var dataObject={};

window.onload = function(){

	var options = 
	{
				// Boolean - Whether to animate the chart
				animation: false,
				responsive : false
	};
	console.log($(window).width());
	var ctx = document.getElementById("chart-area_1").getContext("2d");
	ctx.canvas.width = $(window).width()-($(window).width())*(6/100);
	ctx.canvas.height = $(window).width()-($(window).width())*(6/100);
	//ctx.canvas.height = $("#table_2_").width()-5;
	window.companyGrossProduct = new Chart(ctx).Bar(barChartData, options);
	
	var ctx = document.getElementById("chart-area_2").getContext("2d");
		ctx.canvas.width = $(window).width()-($(window).width())*(6/100);
	ctx.canvas.height = $(window).width()-($(window).width())*(6/100);
	window.capitalInvestment = new Chart(ctx).Bar(barChartData, options);
	var ctx = document.getElementById("chart-area_3").getContext("2d");
		ctx.canvas.width = $(window).width()-($(window).width())*(6/100);
	ctx.canvas.height = $(window).width()-($(window).width())*(6/100);
	window.marketshare = new Chart(ctx).Doughnut(doughnutData, options);
					
	Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
	Parse.$ = jQuery;	
				
	getDataFromServer();
	testNetworth();
	 
	document.getElementById('PauseScreen').style.display='none';
	ChangeThePage();
	console.log(CurrentPage);

	document.getElementById("NextButton").addEventListener("click", NextButtonPress);
	document.getElementById("PreviousButton").addEventListener("click", PreviousButtonPress);
	document.getElementById("pauseGear").addEventListener("click", pauseGearPress);
	document.getElementById("resumeButton").addEventListener("click", resumeButtonPress);
	document.getElementById("submitToServerButton").addEventListener("click", SubmitButtonPress);
	document.getElementById("mainMenuButton").addEventListener("click", mainMenuButtonPress);
	document.getElementById("testNetWorth").addEventListener("click", testNetWorthPress);

			};
			
//Code for the info buttons.
// Create the tooltips only when document ready
//$(document).ready(function () {
    
    // This will automatically grab the 'title' attribute and replace
    // the regular browser tooltips for all <a> elements with a title attribute!
    //$('a[title]').qtip();
    
//});
//$('#myTooltip').qtip({
    //position: {
        //my: 'top right',  // Position my top left...
        //at: 'bottom left', // at the bottom right of...
        //target: $('.Price') // my target
    //}
//});

function testNetWorthPress()
{
	testNetworth()
}

//this can be made more efficient but a lack of security
function SubmitButtonPress()
{
		var dataOut = {};
		//input does not work with type number thus all these objects are null
	  dataOut.clientCapital = document.getElementById("capitalRangeInput").value;
	  dataOut.clientResearchDevelopment = document.getElementById("RAndDRangeInput").value ;
	  dataOut.clientProduction = document.getElementById("productionRangeInput").value;
	  dataOut.clientMarketing = document.getElementById("marketRangeInput").value;
	  dataOut.clientPrice = document.getElementById("priceRangeInput").value;
	  dataOut.clientCharity = document.getElementById("charityRangeInput").value;
	  
	  dataOut.companyId = localStorage.getItem("companyId");
	  dataOut.matchId = localStorage.getItem("matchId");

		console.log(dataOut);
	  $.ajax({
	  type: "POST",
	  url: "https://api.parse.com/1/functions/submitSolo/",
	  headers: {
	  "X-Parse-Application-Id": "Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci",
	  "X-Parse-REST-API-Key": "GcLEre3e2D25P14Pno5PbQ11YO0rixhvIoBxv2RG",
	  "Content-Type": "application/json"
	  },
	  data: JSON.stringify(dataOut),
	  dataType: "json"
	  
	}).done(function( msg ) {
		
			  $.ajax({
	  type: "POST",
	  url: "https://api.parse.com/1/functions/turn/",
	  headers: {
	  "X-Parse-Application-Id": "Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci",
	  "X-Parse-REST-API-Key": "GcLEre3e2D25P14Pno5PbQ11YO0rixhvIoBxv2RG",
	  "Content-Type": "application/json"
	  },
	  data: JSON.stringify(dataOut),
	  dataType: "json"
	  
	}).done(function( msg ) {
	  // all code here gets run when the POST was successful
	  // you can do things like update the console, display an alert, etc...
	   getDataFromServer();
	   testNetworth();
	   console.log(msg.result);
	  });
	  });
	  

}

//When the next button is pressed, run this code.
function NextButtonPress()
{
	CurrentPage = CurrentPage + 1; 
	console.log(CurrentPage); 
	
	//Error checking for if the game is trying to set the number to high or to low. 
	if (CurrentPage < 1) {
		console.log("Number too low")
		CurrentPage = 1;
		console.log(CurrentPage);
	}
	else if (CurrentPage > 4) {
		console.log("Number too high")
		CurrentPage = 4;
		console.log(CurrentPage);
	}
	else{
		ChangeThePage();
	}
	
}

//when the previous button is pressed, run this code. 
function PreviousButtonPress()
{
	CurrentPage = CurrentPage - 1; 
	console.log(CurrentPage); 
	
	//Error checking for if the game is trying to set the number to high or to low. 
	if (CurrentPage < 1) {
		console.log("Number too low")
		CurrentPage = 1;
		console.log(CurrentPage);
	}
	else if (CurrentPage > 4) {
		console.log("Number too high")
		CurrentPage = 4;
		console.log(CurrentPage);
	}
	else{
		ChangeThePage();
	}
	
}
function ChangeThePage()
{
if (CurrentPage == 1) {
	document.getElementById('GamePageOne').style.display='block';
	document.getElementById('GamePageTwo').style.display='none';
	document.getElementById('GamePageThree').style.display='none';
	document.getElementById('GamePageFour').style.display='none';
}
else if (CurrentPage == 2) {
	document.getElementById('GamePageTwo').style.display='block';
	document.getElementById('GamePageOne').style.display='none';
	document.getElementById('GamePageThree').style.display='none';
	document.getElementById('GamePageFour').style.display='none';
}
else if (CurrentPage == 3) {
	document.getElementById('GamePageThree').style.display='block';
	document.getElementById('GamePageOne').style.display='none';
	document.getElementById('GamePageTwo').style.display='none';
	document.getElementById('GamePageFour').style.display='none';
	
	var data = {};
		//input does not work with type number thus all these objects are null
	  data.capital = Number(this.$("#capitalRangeInput").val());
	  data.researchDevelopment = Number(this.$("#RAndDRangeInput").val());
	  data.production = Number(this.$("#productionRangeInput").val());
	  data.marketing = Number(this.$("#marketRangeInput").val());
	  data.price = Number(this.$("#priceRangeInput").val());
	  data.charity = Number(this.$("#charityRangeInput").val());
	  
	  var expense = 0, 
	  resources = 0, 
	  result = 0, 
	  costPerUnit = 7, 
	  utilization = 0, 
	  costPerUnit = unitCost, 
	  maxProductionlocal = maxProduction, 
	  cash = cashAvaible, 
	  credit = creditLine;
	  

	  //Price per unit = __________get data
	  console.log(data.production +" ____product");
	  var productionCost = data.production * costPerUnit;
	  
	  resources = cash + credit;
	  expense = data.capital + data.researchDevelopment + productionCost + data.marketing + data.charity;
	  result = resources - expense; 
	  console.log(data.production);
	  console.log(maxProductionlocal);
	  console.log(data.production / maxProductionlocal);
	  utilization = Math.round((data.production / maxProductionlocal)*1000)/10;
	  
	  //______________________________________________
	  
	  var afterCash= cash,
	  afterCredit = credit;
	//define varibles
	const MAX_CREDIT = 50000;
	var netWorth = resources - expense;
	//determine users state
	if(netWorth > MAX_CREDIT)
	{
		//adding cash and fill up mac credit
		afterCash = netWorth - MAX_CREDIT;
		console.log(netWorth);
		afterCredit = MAX_CREDIT;
	}
	else if ( netWorth <= MAX_CREDIT)
	{
		//no cash and subtracting what credit you have left
		afterCash = 0;
		afterCredit = MAX_CREDIT - netWorth;
		
		//check if player is bankrupt or not then declares bankruptcy
		if (netWorth < 0 )
		{
			afterCash = 0;
			afterCredit = netWorth;
		}
	}
	
	//table one data displaying changes made based off their decisions before submit
	document.getElementById("table_1_input_1").innerHTML = cash;
    document.getElementById("table_1_input_2").innerHTML = credit; 
	document.getElementById("table_1_input_3").innerHTML = resources;
	document.getElementById("table_1_input_4").innerHTML = productionCost;
	document.getElementById("table_1_input_5").innerHTML = data.marketing;
	document.getElementById("table_1_input_6").innerHTML = data.capital;
	document.getElementById("table_1_input_7").innerHTML = data.researchDevelopment;
	document.getElementById("table_1_input_8").innerHTML = expense;
	document.getElementById("table_1_input_9").innerHTML = afterCash;
	document.getElementById("table_1_input_10").innerHTML = afterCredit;
	document.getElementById("table_1_input_11").innerHTML = (afterCredit + afterCash);
	document.getElementById("table_1_input_12").innerHTML = costPerUnit;
	document.getElementById("table_1_input_13").innerHTML = utilization + "%";
	document.getElementById("table_1_input_14").innerHTML = data.charity;
}
else if (CurrentPage == 4) {
	document.getElementById('GamePageFour').style.display='block';
	document.getElementById('GamePageOne').style.display='none';
	document.getElementById('GamePageTwo').style.display='none';
	document.getElementById('GamePageThree').style.display='none';
}
else {
	console.log("error");//error
}

}

function pauseGearPress(){
	document.getElementById('PauseScreen').style.display="block";
	document.getElementById('NextButton').style.display='none';
	document.getElementById('PreviousButton').style.display='none';
	document.getElementById('pauseGear').style.display='none';
}


function resumeButtonPress(){
	console.log("Works");
	document.getElementById('PreviousButton').style.display='';
	document.getElementById('NextButton').style.display='';
	document.getElementById('pauseGear').style.display='';
	document.getElementById('PauseScreen').style.display="none";

}

function getDataFromServer()
{

	var userObjectId = Parse.User.current().id;
	
	console.log(userObjectId);
  
	var Company = Parse.Object.extend("Company");
	var queryCompany = new Parse.Query(Company);
	 
	queryCompany.equalTo("userId",userObjectId);
	 
	queryCompany.first().then(function(company){
	
	console.log(company.id);
	localStorage.setItem("companyId",company.id);
	 
	var Match = Parse.Object.extend("Match");

	var queryMatch = new Parse.Query(Match);
	
	queryMatch.equalTo("companyIds" , company.id);
	 
	return queryMatch.first();
	}).then(function(match)
	{
	localStorage.setItem("matchId",match.id);
	
	var CompMatch = Parse.Object.extend("CompMatch");
	var queryCompMatch = new Parse.Query(CompMatch);
	
	queryCompMatch.equalTo("companyId",localStorage.companyId);
	queryCompMatch.equalTo("matchId",localStorage.matchId);
	return queryCompMatch.first();
	}).then(function(compMatch)
	{
		console.log(compMatch);
		

		var dataOut = {};
		//input does not work with type number thus all these objects are null
		document.getElementById("capitalRangeInput").defaultValue = compMatch.get("capital");
		document.getElementById("RAndDRangeInput").defaultValue = compMatch.get("researchDevelopment");
		document.getElementById("productionRangeInput").defaultValue = compMatch.get("production");
		document.getElementById("marketRangeInput").defaultValue = compMatch.get("marketing");
		document.getElementById("priceRangeInput").defaultValue = compMatch.get("price");
		document.getElementById("charityRangeInput").defaultValue = compMatch.get("charity");
		
		maxProduction = compMatch.get("maxProduction");
		creditLine = compMatch.get("creditLine");
		cashAvaible = compMatch.get("cashAvailable");
		unitCost = compMatch.get("unitCost");
		console.log(maxProduction);
		console.log(creditLine);
		console.log(cashAvaible);
		
		//set max on input boxes
		document.getElementById("capitalRangeInput").max = 10000;
		document.getElementById("RAndDRangeInput").max = 10000;
		document.getElementById("productionRangeInput").max = Math.round(compMatch.get("maxProduction"));
		document.getElementById("marketRangeInput").max = 10000;
		document.getElementById("priceRangeInput").max = 100;
		document.getElementById("charityRangeInput").max = 10000;
	})
}

function testNetworth(){
	console.log("Works")
//get the keys to do the search

var matchid=localStorage.getItem("matchId");
console.log(matchid);
console.log()
var CompMatch = Parse.Object.extend("CompMatch");

var query = new Parse.Query("CompMatch");
query.equalTo("matchId" , matchid);
query.ascending("rank");
//query.include("objectId");

query.find().then(function(rankings){
 	console.log(companyGrossProduct);
for(i=0;i < rankings.length;i++)
{
console.log("iteration" + i);
networthValue = rankings[i].get("networth");
capitalInvestmentValue = rankings[i].get("capitalTotal");
marketShareValue = Math.round(rankings[i].get("marketShare").totalMS * 1000)/10;
company = rankings[i].get("companyName");
if (networthValue < 0){networthValue = 0;}else{}
if (capitalInvestmentValue == 0 ){capitalInvestmentValue = 1;}else{}
companyGrossProduct.datasets[0].bars[i].value = networthValue;
companyGrossProduct.datasets[0].bars[i].label = company;
//companyGrossProduct.datasets[0].bars[i].datasetLabel = company;
capitalInvestment.datasets[0].bars[i].value = capitalInvestmentValue;
capitalInvestment.datasets[0].bars[i].label = company;
marketshare.segments[i].value = marketShareValue;
marketshare.segments[i].label = company;

//companyGrossProduct.datasets[0].label = ["Comffp1","Coffmp2","Cossmp3","Comaap4","Comp5","Compdd6"];
}
companyGrossProduct.update();
capitalInvestment.update();
marketshare.update();

document.getElementById("company_first").innerHTML = rankings[0].get("companyName");
document.getElementById("company_second").innerHTML = rankings[1].get("companyName");
document.getElementById("company_third").innerHTML = rankings[2].get("companyName");
document.getElementById("company_fourth").innerHTML = rankings[3].get("companyName");
document.getElementById("company_fifth").innerHTML = rankings[4].get("companyName");
document.getElementById("company_sixth").innerHTML = rankings[5].get("companyName"); 

newsfeed(rankings);

return null;
}).then(function(result){
})
}

function newsfeed(players){

var player1 = players[0];
var player2= players[1] ;
var player3= players[2];
var player4= players[3];
var player5= players[4];
var player6= players[5];

news1(player1);
news2(player2);


function news1(cat){


var feed1 = "The leader is " + cat.get("companyName") + "." + "They broke records with " + cat.get("stats").profit + "profit.";
var feed2 = "The new leader in the indrsutry is" + cat.get("companyName") + "." + "They made $" + cat.get("revenue")+ "revenue. The market seems to love thier price point of $" + cat.get("price");
var feed3 = "Wow" + cat.get("companyName") +" has just taken first play in the indrustry with a revenue of $" + cat.get("stats").revenue + "";
var feed4 = "The leader is " + cat.get("companyName") + "." + "They broke records with " + cat.get("stats").profit + "profit.";
var feed5 = "The leader is " + cat.get("companyName") + "." + "They broke records with " + cat.get("stats").profit + "profit.";
var feed6 = "The leader is " + cat.get("companyName") + "." + "They broke records with " + cat.get("stats").profit + "profit.";
var feeds
news = news + feed1;
document.getElementById("newspaper").innerHTML = news;
}

function news2(cat){

var feed2 = " Runner up is " + cat.get("companyName") + "." + " They had a modest $" + cat.get("stats").profit + " profit. "; 
news = news + feed2;
document.getElementById("newspaper").innerHTML = news;
}


}
