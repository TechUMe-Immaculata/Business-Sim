document.getElementById("backButton").addEventListener("click", backButton);
document.getElementById("singlePlayerButton").addEventListener("click", singlePlayerButton);
document.getElementById("multiPlayerButton").addEventListener("click", multiPlayerButton);

function backButton()
{
	window.location.replace('Home.html');
}
function singlePlayerButton()
{
	window.location.replace('GuestSinglePlayerGamePage.html');
}
function multiPlayerButton()
{
	window.location.replace('Home.html');
}
