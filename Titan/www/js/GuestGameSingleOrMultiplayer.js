document.getElementById("backButton").addEventListener("click", backButton);

//Un comment for multiplayer play!
//document.getElementById("multiPlayerButton").addEventListener("click", multiPlayerButton);

function backButton()
{
	window.location.replace('GuestHome.html');
}

function multiPlayerButton()
{
	//no valid value.
	//window.location.replace('');
}


function makeMatchId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text=text+"_guest";
}