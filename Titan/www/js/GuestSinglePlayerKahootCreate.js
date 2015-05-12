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
	
	//window.location = "GuestSinglePlayerGamePage.html";
<<<<<<< HEAD
	console.log(works);
	matchId = works.clientMatchId;
=======
	document.getElementById("password").innerHTML = running.matchName;
	console.log(works);
	;
>>>>>>> origin/Marcio(current-Branch)
		
	},
	error:function(error){

		console.log("Nah boi");
	}
});

//window.location = "GuestMultiplayerGamePage.html";


};

function joinMatch()
{
window.location = "GuestMultiplayerGamePage.html";
}
function makeMatchId()
{

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

<<<<<<< HEAD
    return text=text+"_guest";
}
function readyToPlay()
{
console.log(matchId);
	 var currentUser = Parse.User.current();

	var  running = {};
	//running.objectId = currentUser.id;
	running.matchId = matchId;



	Parse.Cloud.run('createMatch_Multi_Ready', running, {

		success: function(works)
		{
		//window.location = "GuestSinglePlayerGamePage.html";
		console.log(works);
		matchId = works.clientMatchId;
			
		},
		error:function(error){

			console.log("Nah boi");
		}
	});

}
=======
    return text=text+"_game";
}
setInterval(function Match(){

query = new Parse.Query("Match");

query.equalTo("objectId", matchId);

query.find({
   
   //find the Active Turns in the match 
    success: function(Match) {
    	
    	Match.get("companyIds");
			
		



  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
    console.log("not working for the CompMatch Turns");
  }
});

}
	, 1000)

>>>>>>> origin/Marcio(current-Branch)
