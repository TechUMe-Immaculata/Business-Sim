Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
document.getElementById("btnJoin").addEventListener("click", joinMatch);
var matchId;
var ableToJoin = false;
function joinMatch(){

/*
var rowCount = $('#matchlist tr').length;
console.log(rowCount);
if ( rowCount == 4)
{

alert("You have to many open matches, please finish a current match before starting another new one");

}
else if ( rowCount <4)
{
*/

 var currentUser = Parse.User.current();

 var password = document.getElementById("password").value;
console.log(password);


	var  running = {};
running.objectId = currentUser.id;
running.password = password;



Parse.Cloud.run('createMatch_Multi_Join', running, {

	success: function(works){
	
	if (works == false)
	{
		console.log(works + "works");
		ableToJoin = false;
	}
	else
	{
		ableToJoin = true;
		matchId = works.clientMatchId; 
		console.log(works);
		localStorage.setItem("matchId",works);
	}
	},
	error:function(error){

		console.log("Nah boi");
	}
});
// get the companyId so you can use it later for the query
var Company = Parse.Object.extend("Company");
var userId = currentUser.id;
var companyId;
nquery = new Parse.Query("Company");

nquery.equalTo("userId", userId);

nquery.find({
   
   //find the Active Turns in the match 
    success: function(Company) {
    	

		companyId = Company[0].get("objectId");
		console.log("Yes I got the company id")


  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
    console.log("not working for company Turns")
  }
});


// code for user to check when hes ready 
setInterval(function MultiplayerTurns(){

var Match = Parse.Object.extend("Match");


query = new Parse.Query("Match");

query.equalTo("password", password);

query.find({
   
   //find the Active Turns in the match 
    success: function(Match) {
    	
	console.log(Match);
	if (ableToJoin == true)
	{
		if (Match[0].get("isReady") == false)
		{
			console.log("is not ready yet");
			document.getElementById("joinMatch1").innerHTML = "You have succesfully joined the match , please wait for it to start.";
			return null;
		
		}
		else if (Match[0].get("isReady") == true )
		{
			window.location = "GuestMultiplayerGamePage.html";
			
		}	
	}

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
    console.log("not working for the CompMatch Turns");
    document.getElementById("joinMatch1").innerHTML = "There was an issue with your Code. Please enter it again.";

  }
});
///


} , 10000);

};
