document.getElementById("guestPlayButton").addEventListener("click", guestPlayPress);
document.getElementById("serverLoginButton").addEventListener("click", serverLoginPress);
document.getElementById("registerButton").addEventListener("click", registerPress);
document.getElementById("facebookLoginButton").addEventListener("click", facebookLoginPress);
//window.location.replace('...');
function guestPlayPress()
{
	window.location="GuestGamePage.html";
}

function serverLoginPress()
{
  window.location="ServerLoginPage.html";
}

function registerPress()
{
  window.location="Register.html";
}

function facebookLoginPress()
{
  window.location="Register.html";
}
