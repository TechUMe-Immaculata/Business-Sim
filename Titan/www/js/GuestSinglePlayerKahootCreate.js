Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
document.getElementById("createMatch").addEventListener("click", CreateMatch);;
var matchId;
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
	document.getElementById("password").innerHTML = running.matchName;
	;
		
	},
	error:function(error){

		console.log("");
	}
});

window.location = "GuestMultiplayerGamePage.html";


};
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
   
   //find the Active Turns in the match 
    success: function(Match) {
    	
    	Match.get("companyIds");
			
		}	


  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
    console.log("not working for the CompMatch Turns");
  }
});

}
	, 1000)

