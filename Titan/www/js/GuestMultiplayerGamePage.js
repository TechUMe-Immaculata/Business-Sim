// Page zero is the tutorial page, 1 is the landing page. 
var CurrentPage = 0;
document.getElementById('PauseScreen').style.display='none';
var matchId = "",companyId= "",playerId = "";
var maxProduction = 0,creditLine = 0,cashAvaible= 0,unitCost = 0;
var news = "";
// add the industry 
var gametype;

$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 10).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {


            if(currentVal < input.attr('max')) {
                input.val(currentVal + 10).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    var a = false;
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
	
	
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val(minValue);
		a = true;
    }
	
	if (a == false)
	{
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val(maxValue);
    }
    }
	updatePageFour();
    
});
$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

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
	labels : ["","","","","",""],
	datasets : [
		{
				fillColor : "rgba(242,0,0,0.5)",
				strokeColor : "rgba(242,0,0,0.8)",
				highlightFill: "rgba(242,0,0,0.75)",
				highlightStroke: "rgba(242,0,0,1)",
				data : [1,2,3,4,5,6]
		}
]}
			
//var dataObject={};

//document.addEventListener('touchstart', handleTouchStart, false);        
//document.addEventListener('touchend', handleTouchMove, false);

window.onload = function(){

	var options = 
	{
				// Boolean - Whether to animate the chart
				animation: false,
				responsive : false

	};
	var ctx = document.getElementById("chart-area_1").getContext("2d");
	ctx.canvas.width = $("#plotHolder").width()-($("#plotHolder").width())*(15/100);
	ctx.canvas.height = $("#plotHolder").width()-($("#plotHolder").width())*(15/100);
	//ctx.canvas.height = $("#table_2_").width()-5;
	window.companyGrossProduct = new Chart(ctx).Bar(barChartData, options);
	
	var ctx = document.getElementById("chart-area_2").getContext("2d");
		ctx.canvas.width = $("#plotHolder").width()-($("#plotHolder").width())*(15/100);
	ctx.canvas.height = $("#plotHolder").width()-($("#plotHolder").width())*(15/100);
	window.capitalInvestment = new Chart(ctx).Bar(barChartData, options);
	var ctx = document.getElementById("chart-area_3").getContext("2d");
		ctx.canvas.width = $("#plotHolder").width()-($("#plotHolder").width())*(15/100);
	ctx.canvas.height = $("#plotHolder").width()-($("#plotHolder").width())*(15/100);
	window.marketshare = new Chart(ctx).Doughnut(doughnutData, options);
					
	Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
	Parse.$ = jQuery;	
				
	matchId = localStorage.getItem("matchId");
	console.log("ahhhhhhahhhahhahahahhhahhhhahhhahahhhh = "+ matchId);

	getDataFromServer();
	ChangeThePage();

    // These buttons have become obsolite 
	//document.getElementById("NextButton").addEventListener("click", NextButtonPress);
	//document.getElementById("PreviousButton").addEventListener("click", PreviousButtonPress);
	document.getElementById("pauseGear").addEventListener("click", pauseGearPress);
	document.getElementById("resumeButton").addEventListener("click", resumeButtonPress);
	document.getElementById("mainMenuButton").addEventListener("click", mainMenuButtonPress);
	document.getElementById("submitToServerButton").addEventListener("click", SubmitButtonPress);
	document.getElementById("tutorial_MenuButton").addEventListener("click", tutorial_MenuButtonPress);
	document.getElementById('LoadingNotifier').style.display="none";
/* check if this works*/
	if (navigator.notification) { // Override default HTML alert with native dialog
      window.alert = function (message) {
          navigator.notification.alert(
              message,    // message
              null,       // callback
              "Workshop", // title
              'OK'        // buttonName
          );
      };
  }
  
  timePerTurn();


			}
			
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

//this can be made more efficient but a lack of security
function SubmitButtonPress()
{	
	deleteTimeout();
	
	document.getElementById('submitToServerButton').style.display='none';
	document.getElementById('LoadingNotifier').style.display="";

		var dataOut = {};
		//input does not work with type number thus all these objects are null
	  dataOut.clientCapital = document.getElementById("capitalRangeInput").value;
	  dataOut.clientResearchDevelopment = document.getElementById("RAndDRangeInput").value ;
	  dataOut.clientProduction = document.getElementById("productionRangeInput").value;
	  dataOut.clientMarketing = document.getElementById("marketRangeInput").value;
	  dataOut.clientPrice = document.getElementById("priceRangeInput").value;
	  dataOut.clientCharity = document.getElementById("charityRangeInput").value;
	  
	  dataOut.companyId = companyId;//localStorage.getItem("companyId");
	  dataOut.matchId = matchId;//localStorage.getItem("matchId");
	  console.log("matchId submit");
	  console.log(matchId);

		console.log(dataOut);
	  $.ajax({
	  type: "POST",
	  url: "https://api.parse.com/1/functions/submitMulti/",
	  headers: {
	  "X-Parse-Application-Id": "Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci",
	  "X-Parse-REST-API-Key": "GcLEre3e2D25P14Pno5PbQ11YO0rixhvIoBxv2RG",
	  "Content-Type": "application/json"
	  },
	  data: JSON.stringify(dataOut),
	  dataType: "json"
	  
	}).done(function( msg ) {
		/*
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
	*/	
	  // all code here gets run when the POST was successful
	  // you can do things like update the console, display an alert, etc...
	   getDataFromServer();
	   CurrentPage = 1;
	   ChangeThePage();
	  });
	//  });
var matchid=matchId;//localStorage.getItem("matchId");
var Match = Parse.Object.extend("Match");
var matchquery = new Parse.Query("Match");
matchquery.equalTo("objectId" , matchid);
matchquery.find({



success: function(match){
match[0].increment("ActiveTurns");

var turns = match[0].get("turn");
console.log("////////////////////////////yop : "+turns);

if (turns>= 4){
	console.log("////////////////////////////yop 1A " + matchid);
	gameOver(matchid);

	

}
else if (turns < 4){
	console.log("not yet");
	console.log("////////////////////////////yop 1B ");
}


},
error: function(error){
    console.log("not working");
    console.log("////////////////////////////yop 1C ");
}


});

/*
setInterval(function MultiplayerTurns(){
 if( document.getElementById('submitToServerButton').style.display =="none"){
var CompMatch = Parse.Object.extend("CompMatch");
console.log(matchId);
console.log(companyId);
query = new Parse.Query("CompMatch");

query.equalTo("matchId", matchId);
query.equalTo("companyId", companyId);
query.find({
   
   //find the Active Turns in the match 
    success: function(CompMatch) {
    	console.log(CompMatch);

		if (CompMatch[0].get("isSubbed") == false){
			
		document.getElementById('submitToServerButton').style.display='';
		alert("Submit button is back");
		}
		else if ( CompMatch[0].get("isSubbed") == true){
			return null;
		}	


  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
}

			else(){
				console.log("nothing to see here");
				return null;
			}

} , 10000);
*/
}



//When the next button is pressed, run this code. now also runs when the page is swiped** 
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

//when the previous button is pressed, run this code, now also runs when the page is swiped** 
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
	console.log(CurrentPage);
	
	//if (document.getElementById('Tutorial').style.display == 'block')
	//{document.getElementById('Tutorial').style.display = 'none'
	//console.log("woking on thekPHSDfuisadelgf")}

if (CurrentPage == 0) {
	document.getElementById('Tutorial').style.display='block';
	document.getElementById('GamePageOne').style.display='none';
	document.getElementById('GamePageTwo').style.display='none';
	document.getElementById('GamePageThree').style.display='none';
	document.getElementById('GamePageFour').style.display='none';
	document.getElementById('pauseGear').style.display='none';
}
else if (CurrentPage == 1) {
	document.getElementById('pauseGear').style.display='';
	document.getElementById('Tutorial').style.display='none';
	document.getElementById('GamePageOne').style.display='block';
	document.getElementById('GamePageTwo').style.display='none';
	document.getElementById('GamePageThree').style.display='none';
	document.getElementById('GamePageFour').style.display='none';
}
else if (CurrentPage == 2) {
	document.getElementById('Tutorial').style.display='none';
	document.getElementById('GamePageTwo').style.display='block';
	document.getElementById('GamePageOne').style.display='none';
	document.getElementById('GamePageThree').style.display='none';
	document.getElementById('GamePageFour').style.display='none';
}
else if (CurrentPage == 3) {
	document.getElementById('Tutorial').style.display='none';
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
	const MAX_CREDIT = 25000;
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
	document.getElementById("table_1_input_1").innerHTML = " $"+cash;
    document.getElementById("table_1_input_2").innerHTML = " $"+credit; 
	document.getElementById("table_1_input_3").innerHTML = " $"+resources;
	document.getElementById("table_1_input_4").innerHTML = " $"+productionCost;
	document.getElementById("table_1_input_5").innerHTML = " $"+data.marketing;
	document.getElementById("table_1_input_6").innerHTML = " $"+data.capital;
	document.getElementById("table_1_input_7").innerHTML = " $"+data.researchDevelopment;
	document.getElementById("table_1_input_8").innerHTML = " $"+expense;
	document.getElementById("table_1_input_9").innerHTML = " $"+resources;
	document.getElementById("table_1_input_10").innerHTML = " $"+(-expense);
	document.getElementById("table_1_input_11").innerHTML = " $"+(afterCredit + afterCash);
	document.getElementById("table_1_input_12").innerHTML = " $"+costPerUnit;
	document.getElementById("table_1_input_13").innerHTML = utilization + " %";
	document.getElementById("table_1_input_14").innerHTML = " $"+data.charity;
}
else if (CurrentPage == 4) {
	document.getElementById('GamePageFour').style.display='block';
	document.getElementById('GamePageOne').style.display='none';
	document.getElementById('GamePageTwo').style.display='none';
	document.getElementById('GamePageThree').style.display='none';
	
	
	updatePageFour();
	
	
	document.getElementById("productionCharacters").innerHTML = "Production(max "+maxProduction+"u):";
}
else {
	console.log("error");//error
}

}

function pauseGearPress(){
	document.getElementById('PauseScreen').style.display="block";
	document.getElementById('pauseGear').style.display='none';
	document.getElementById('GamePageFour').style.display='none';
	document.getElementById('GamePageOne').style.display='none';
	document.getElementById('GamePageTwo').style.display='none';
	document.getElementById('GamePageThree').style.display='none';
}


function resumeButtonPress(){
	document.getElementById('pauseGear').style.display='';
	document.getElementById('PauseScreen').style.display="none";
	ChangeThePage();

}

function mainMenuButtonPress(){
exit();	
document.getElementById('pauseGear').style.display='';
document.getElementById('PauseScreen').style.display="none";


window.location = "GuestHome.html";

}

function getDataFromServer()
{

	var userObjectId = Parse.User.current().id;
	var player = Parse.User.current();


	document.getElementById("displayCompany").innerHTML = " Your company is : " + player.get("username")+"Company";
	
	console.log("_______"+userObjectId);
  
	var Company = Parse.Object.extend("Company");
	var queryCompany = new Parse.Query(Company);
	 
	queryCompany.equalTo("userId",userObjectId);
	 
	queryCompany.first().then(function(company){
	
	console.log(company.id);
	companyId = company.id;//localStorage.setItem("companyId",company.id);
	 
	var Match = Parse.Object.extend("Match");

	var queryMatch = new Parse.Query(Match);
	
	queryMatch.equalTo("companyIds" , company.id);
	 
	return queryMatch.first();
	}).then(function(match)
	{
	matchId = match.id;//localStorage.setItem("matchId",match.id);
	document.getElementById("pageOneQuater").innerHTML = "Quarter " + match.get("turn");
	console.log("get data from sever");
	console.log(matchId);
	
	var CompMatch = Parse.Object.extend("CompMatch");
	var queryCompMatch = new Parse.Query(CompMatch);
	
	queryCompMatch.equalTo("companyId",companyId);
	queryCompMatch.equalTo("matchId",matchId);
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

		//set max on input boxes
		document.getElementById("capitalRangeInput").max = 10000;
		document.getElementById("RAndDRangeInput").max = 10000;
		document.getElementById("productionRangeInput").max = Math.round(compMatch.get("maxProduction"));
		document.getElementById("marketRangeInput").max = 10000;
		document.getElementById("priceRangeInput").max = 100;
		document.getElementById("charityRangeInput").max = 10000;
		
		testNetworth();

			if (compMatch.get("isBankrupt") ==true){

			window.alert("Your bankrupt");
				gameOver(matchId);
			}
			else if ( compMatch.get("isBankrupt")==false){
				console.log("not hotty");
				return null
			}


	})
}
// This function is called to end the game after the user has played a certain amount of times
function gameOver(cop){


// this can be replaced with the match query which is done at the bottom..
console.log("////////////////////////////yop 2A ");


var matchid=cop;





// query to get who can in what place
var CompMatch = Parse.Object.extend("CompMatch");
var query = new Parse.Query("CompMatch");
query.equalTo("matchId" , matchid);
query.descending("networth");

 
query.find().then(function(rankings){
  


// tells the user who the winnners are
alert("The winner is " + rankings[0].get("companyName") + ". Second place is : "+ rankings[1].get("companyName")  + ". Third winner is : " + rankings[2].get("companyName") + ". Fourth place is : " + rankings[3].get("companyName")  + ". Fith place is : " + rankings[4].get("companyName")  + ". Last place is : " + rankings[5].get("companyName") + "." );
localStorage.clear();
var retVal = confirm("Do you want to play again?");
   if( retVal == true ){
     window.location = " NewUserHome.html"; 
	 
   }else{

      window.location= "NewUserHome.html";
	 marco
	}

}).then(function(result){



	return null;
})














	


};
//This function gets the top players and puts them in the leaderboard
function testNetworth(){
	console.log("Works")
//get the keys to do the search

var matchid=matchId;//localStorage.getItem("matchId");
console.log("test networth");
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

document.getElementById('LoadingNotifier').style.display="none";

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
if(companyId === rankings[i].get("companyId"))
{
console.log("||___||__||__||__||__||__||");
document.getElementById('displayProfit').innerHTML = "Profit : $" + rankings[i].get("stats").profit;

if(rankings[i].get("stats").profit < 0)
document.getElementById("displayProfit").style.color = "red";
else if (rankings[i].get("stats").profit > 0)
document.getElementById("displayProfit").style.color = "green";
else
document.getElementById("displayProfit").style.color = "black";

}

}
companyGrossProduct.update();
capitalInvestment.update();
marketshare.update();


document.getElementById("company_first").innerHTML = "#1  " + rankings[0].get("companyName");
document.getElementById("company_second").innerHTML ="#2  " + rankings[1].get("companyName");
document.getElementById("company_third").innerHTML = "#3  " +rankings[2].get("companyName");
document.getElementById("company_fourth").innerHTML = "#4  " +rankings[3].get("companyName");
document.getElementById("company_fifth").innerHTML = "#5  " +rankings[4].get("companyName");
document.getElementById("company_sixth").innerHTML = "#6  " +rankings[5].get("companyName"); 
newsfeed(rankings);

return null;
}).then(function(result){
})
}
/* 
var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
	
    var xUp = evt.changedTouches[0].clientX;                                      
    var yUp = evt.changedTouches[0].clientY; 
    //var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) 
	{/*most significant
        if ( xDiff > 200 ) {
            /* left swipe  
			console.log("left");
			NextButtonPress()
        } else if(xDiff < 200) {
		console.log("right");
            /* right swipe 
		PreviousButtonPress();
        }                       
    } 
    /* reset values 
    xDown = null;
    yDown = null;                                             
};*/

// This generates a newsfeed for the players based on what position they are in
function newsfeed(players){

var player1 = players[0];
var player2= players[1] ;
var player3= players[2];
var player4= players[3];
var player5= players[4];
var player6= players[5];

news1(player1);
news2(player2);
news3(player6);
news = "";

function news1(cat){
// This is just a set of statements that will be put into an array , than randomly choosen.

var feed1 = "The leader is " + cat.get("companyName") + ". " + "They broke records with $" + cat.get("stats").profit + " in profits.";
var feed2 = "The new leader in the industry is " + cat.get("companyName") + ". " + "They made $" + cat.get("stats").revenue+ " in revenue. The market seems to love their price point of $" + cat.get("price")+". ";
var feed3 = "Wow " + cat.get("companyName") +" has just taken first place in the industry with a revenue of $" + cat.get("stats").revenue + ".";
var feed4 = "Amazingly " + cat.get("companyName") + " is the leader with a record $" + cat.get("networth")+ " in net worth. ";
var feed5 = cat.get("companyName") + " is now in first place. " + "Their smart investments have earned them top stop with $" + cat.get("stats").profit + " in profit. ";
var feed6 = " Now this is a surprise  " + cat.get("companyName") + " has the top place in the market. " + " Their donations of $" + cat.get("charity") + " has really earned them love from their community. ";
var feeds = [
feed1,feed2 , feed3 , feed4, feed5 , feed6
];

var todaysfeed =feeds[Math.floor(Math.random() * feeds.length)];

news = news + todaysfeed;
document.getElementById("newspaper").innerHTML = news;
}

function news2(cat){
// This is just a set of statements that will be put into an array , than randomly choosen.
var feed1 = " Runner up is " + cat.get("companyName") + ". " + "They had a modest $" + cat.get("stats").profit + " in profit. ";
var feed2 = " On the rise is " + cat.get("companyName") + ". " + "They are doing well with $" + cat.get("stats").profit + "in profit. ";
var feed3 = " Don't sleep on " + cat.get("companyName") + ". " + "They are the rise with a net worth of $" + cat.get("networth") + ". ";
var feed4 = " Looks like " + cat.get("companyName") + " is set make a big splash. " + " Their popularity with teens has earned $" + cat.get("stats").profit + " profit. ";
var feed5 = " Runner up is " + cat.get("companyName") + "." + " They had a modest $" + cat.get("stats").profit + " profit. ";
var feed6 = " Second in market-share is " + cat.get("companyName") + ". " + " They are close to being in first place. Their impressive revenue of $" + cat.get("stats").revenue + " has many analysts excited. ";
var feeds = [
feed1, feed2 , feed3 , feed4, feed5 , feed6
];

var todaysfeed =feeds[Math.floor(Math.random() * feeds.length)];


news = news + todaysfeed;
document.getElementById("newspaper").innerHTML = news;
}


function news3(cat){
// This is just a set of statements that will be put into an array , than randomly choosen.
var feed1 =  cat.get("companyName") + " is terrible. " + "They only donate $" + cat.get("charity") + ". Some are calling them greedy. ";
var feed2 = "This is unexpected " + cat.get("companyName") + " is last in market-share. " + "Their profit of $" + cat.get("stats").profit + " is awful.";
var feed3 = " Things are looking grim for " + cat.get("companyName") + ". " + " Their net worth is the lowest of all companies , with $" + cat.get("networth")+"." ;
var feed4 = cat.get("companyName") + " clearly needs more business lessons. " + "Their popularity with adults has plummeted. ";
var feed5 = "Do not invest in " + cat.get("companyName") + ". "+ "They are last in market-share. " + "If they don't do something drastic soon they will face bankruptcy. ";
var feed6 = "Poor investments has lead " + cat.get("companyName") + " to last place in market-share. " + "The community thinks that they are too greedy with profits and their total donations of $" + cat.get("charity")+ " not enough";
var feeds = [
feed1,feed2 , feed3 , feed4, feed5 , feed6
];

var todaysfeed =feeds[Math.floor(Math.random() * feeds.length)];


news = news + todaysfeed;
document.getElementById("newspaper").innerHTML = news;
}

}

$(function(){
  // Bind the swipeHandler callback function to the swipe event on div.box
	$( "body" ).on( "swipe", swipeHandler );
	$.event.special.swipe.scrollSupressionThreshold = 30;
	$.event.special.swipe.horizontalDistanceThreshold =60;
	
  // Callback function references the event target and adds the 'swipe' class to it
  function swipeHandler( event ){
  var x1 = event.swipestart.coords[0];
  var x2 = event.swipestop.coords[0];
  var dif = x2 - x1;
  if (dif > 0)
  {
  PreviousButtonPress()
  }
  else if (dif < 0)
  {
  NextButtonPress();
  }
  }
});

function tutorial_MenuButtonPress() {
	document.getElementById('pauseGear').style.display='';
	document.getElementById('PauseScreen').style.display="none";
	CurrentPage = 0;
	ChangeThePage();
}

function updatePageFour()
{
	  //+++++++++++++++++++++++ a 
	  
		var data = {},
		cash = cashAvaible, 
		credit = creditLine;
	  
		data.capital = Number(this.$("#capitalRangeInput").val());
		data.researchDevelopment = Number(this.$("#RAndDRangeInput").val());
		data.production = Number(this.$("#productionRangeInput").val());
		data.marketing = Number(this.$("#marketRangeInput").val());
		data.price = Number(this.$("#priceRangeInput").val());
		data.charity = Number(this.$("#charityRangeInput").val());
		
		var productionCost = data.production * unitCost;
			  
		expense = data.capital + data.researchDevelopment + productionCost + data.marketing + data.charity;
		resources = cash + credit;

		var netWorth = resources - expense;

		document.getElementById("table_2_input_1").innerHTML = "$"+(cash + credit);
		document.getElementById("table_2_input_2").innerHTML = "$"+(-expense);
		document.getElementById("table_2_input_3").innerHTML = "$"+(netWorth);
	  
	  //+++++++++++++++++++++++ b
}


// This function handles the rounds. It checks if everybody has submitted , than allows you to resubmit
setInterval(function MultiplayerTurns(){
// This checks if the submit button is hidden , if it is than it runs the function to chekc when everybody is read
 if( document.getElementById('submitToServerButton').style.display =="none"){
var CompMatch = Parse.Object.extend("CompMatch");
console.log(matchId);
console.log(companyId);
query = new Parse.Query("CompMatch");

query.equalTo("matchId", matchId);
query.equalTo("companyId", companyId);
query.find({
   
   
    success: function(CompMatch) {
    	console.log(CompMatch);
    	// If everybody has submitted , than it brings back the submit button
		if (CompMatch[0].get("isSubbed") == false){
			
		document.getElementById('submitToServerButton').style.display='';
		alert("Submit button is back");
		getDataFromServer();
		CurrentPage=1;
		ChangeThePage();
		timePerTurn();

		}
		else if ( CompMatch[0].get("isSubbed") == true){
			return null;
		}	


  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
}
			// if the submit button is already , there it does nothing
			else if (document.getElementById('submitToServerButton').style.display ==""){
				console.log("nothing to see here");
				return null;
			}

} , 1000);


//This function checks if you are bankrupt , and closes the game if you are

function bankrupt(){

var CompMatch = Parse.Object.extend("CompMatch");
console.log(matchId);
console.log(companyId);
query = new Parse.Query("CompMatch");

query.equalTo("matchId", matchId);
query.equalTo("companyId", companyId);
query.find({
   
   //find the Active Turns in the match 
    success: function(CompMatch) {
    	
	


  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

	alert("YOu went bankrupt");



}
// This function is called when the user decides to quit a game.
function exit(){

var names= ["Floyd Inc" , "Matt Inc" , "Tom Inc" , "Marcio Inc", "Stan Lee Inc"];
var name = names.pop(); 

var CompMatch = Parse.Object.extend("CompMatch");
console.log(matchId);
console.log(companyId);
query = new Parse.Query("CompMatch");

query.equalTo("matchId", matchId);
query.equalTo("companyId", companyId);
query.first({
   
   //This turns the user's accounts into bots , so the match can continue.
    success: function(CompMatch) {
    	console.log(CompMatch);
    	CompMatch.set("isBot",true);
    	CompMatch.set("companyName",name);
    	CompMatch.set("isSubbed" , true);



    	CompMatch.save();





  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
}
//variable for a time-out
var aTurnTime;

//function for timing a turn using a time-out
function timePerTurn() {
    aTurnTime= setTimeout(function(){ endTime(); },3*60000);
}

//function that 
function endTime(){

SubmitButtonPress();
alert("Turn is Over");
}

function deleteTimeout()
{
	clearTimeout(aTurnTime);
}
