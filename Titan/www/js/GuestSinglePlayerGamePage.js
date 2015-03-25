var CurrentPage = 4; 
document.getElementById('PauseScreen').style.display='none';
ChangeThePage();
console.log(CurrentPage);

document.getElementById("NextButton").addEventListener("click", NextButtonPress);
document.getElementById("PreviousButton").addEventListener("click", PreviousButtonPress);
document.getElementById("pauseGear").addEventListener("click", pauseGearPress);
document.getElementById("ReturnButton").addEventListener("click", ReturnButtonPress);
document.getElementById("submitToServerButton").addEventListener("click", SubmitButtonPress);

function SubmitButtonPress()
{
  var dataOut = {};
  dataOut.clientCapital =  document.getElementById("txtCapital");
  dataOut.clientResearchDevelopment = document.getElementById("txtRnD");
  dataOut.clientProduction = document.getElementById("txtProduction");
  dataOut.clientMarketing = document.getElementById("txtMarketing");
  dataOut.clientPrice = document.getElementById("txtPrice");
  dataOut.clientCharity = document.getElementById("txtCharity");

  dataOut
  
  

  $.ajax({
  type: "POST",
  url: "https://api.parse.com/1/functions/submitSolo/",
  headers: {
  "X-Parse-Application-Id": "Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci",
  "X-Parse-REST-API-Key": "GcLEre3e2D25P14Pno5PbQ11YO0rixhvIoBxv2RG",
  "Content-Type": "application/json"
  },
  data: JSON.stringify(clientUser),
  dataType: "json"
  
})
  .done(function( msg ) {
  // all code here gets run when the POST was successful
  // you can do things like update the console, display an alert, etc...
   console.log(msg.result);
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
