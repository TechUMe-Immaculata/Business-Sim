var CurrentPage = 4; 
document.getElementById('PauseScreen').style.display='none';
ChangeThePage();
console.log(CurrentPage);

document.getElementById("NextButton").addEventListener("click", NextButtonPress);
document.getElementById("PreviousButton").addEventListener("click", PreviousButtonPress);
document.getElementById("pauseGear").addEventListener("click", pauseGearPress);
document.getElementById("ReturnButton").addEventListener("click", ReturnButtonPress);
document.getElementById("submitToServerButton").addEventListener("click", SubmitButtonPress);

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

function SubmitButtonPress()
{
	Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
	Parse.$ = jQuery;
  
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
	return null;
	}).then(function(sendData)
	{
		var dataOut = {};
		//input does not work with type number thus all these objects are null
	  dataOut.clientCapital = this.$("#capitalRangeInput").val();
	  dataOut.clientResearchDevelopment = this.$("#RAndDRangeInput").val();
	  dataOut.clientProduction = this.$("#productionRangeInput").val();
	  dataOut.clientMarketing = this.$("#marketRangeInput").val();
	  dataOut.clientPrice = this.$("#priceRangeInput").val();
	  dataOut.clientCharity = this.$("#charityRangeInput").val();
	  
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
	  
	})
	  .done(function( msg ) {
	  // all code here gets run when the POST was successful
	  // you can do things like update the console, display an alert, etc...
	   console.log(msg.result);
	  });
	}) 
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
}
else if (CurrentPage == 4) {
	document.getElementById('GamePageFour').style.display='block';
	document.getElementById('GamePageOne').style.display='none';
	document.getElementById('GamePageTwo').style.display='none';
	document.getElementById('GamePageThree').style.display='none';
}
else {
	console.log("error");//error
}}

function pauseGearPress(){
	document.getElementById('PauseScreen').style.display="block";
	document.getElementById('NextButton').style.display='none';
	document.getElementById('PreviousButton').style.display='none';
	document.getElementById('pauseGear').style.display='none';
}


function ReturnButtonPress(){
	document.getElementById('PreviousButton').style.display='';
	document.getElementById('NextButton').style.display='';
	document.getElementById('pauseGear').style.display='';
	document.getElementById('PauseScreen').style.display="none";

}
