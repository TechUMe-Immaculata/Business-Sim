document.getElementById("quickPlayButton").addEventListener("click", quickPlayButtonPress);

//window.location.replace('...');
function quickPlayButtonPress(){
	window.location="GuestGamePage.html";
}

document.getElementById('profile').ondragstart = function() { return false; };