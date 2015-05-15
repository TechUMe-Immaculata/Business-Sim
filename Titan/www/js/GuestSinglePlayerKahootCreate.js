
Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
document.getElementById("createMatch").addEventListener("click", joinMatch);
var matchId;
CreateMatch();
function CreateMatch(){

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

	var  running = {};
running.objectId = currentUser.id;
running.matchTime = 5;
running.matchName = makeMatchId();


Parse.Cloud.run('createMatch_Multi', running, {

	success: function(works){
	
	

	matchId = works.clientMatchId; 
	console.log(works);
	console.log(matchId);
	localStorage.setItem("matchId",matchId);
	console.log(localStorage.getItem("matchId"));

	var password = works.password;
	document.getElementById("password").innerHTML = "Match id : " + password;
	},
	error:function(error){

		console.log("");
	}
});




};

function joinMatch()
{

var  running = {};
running.matchId = matchId;

Parse.Cloud.run('createMatch_Multi_Ready', running, {
	success: function(works)
	{




	console.log("works");
	window.location = "GuestMultiplayerGamePage.html";
	},
	error:function(error){

		console.log("");
	}
});


}
function makeMatchId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text=text+"_game";
}
setInterval(function Match(){

query = new Parse.Query("Match");

query.equalTo("objectId", matchId);

query.find({
   

    success: function(Match) {
    	console.log(Match);
    	var companies = Match[0].get("companyIds").length;
    	document.getElementById("playersInMatch").innerHTML = " Players in game : " + companies;

			
		



  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
    console.log("not working for the CompMatch Turns");
  }
});

}
	, 1000);

