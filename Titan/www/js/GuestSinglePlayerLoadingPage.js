CreateMatch();

function CreateMatch(){
Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
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


Parse.Cloud.run('createMatch', running, {

	success: function(works){
	
	window.location = "GuestSinglePlayerGamePage.html";
		
	},
	error:function(error){

		console.log("Nah boi");
	}
});




};