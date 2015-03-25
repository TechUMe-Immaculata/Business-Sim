Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
document.getElementById("guestPlayButton").addEventListener("click", guestPlayPress);
document.getElementById("serverLoginButton").addEventListener("click", serverLoginPress);
document.getElementById("registerButton").addEventListener("click", registerPress);
document.getElementById("facebookLoginButton").addEventListener("click", facebookLoginPress);
//window.location.replace('...');
function guestPlayPress()
{

	
   Parse.User.logIn("guestUser1337", "1337", {
  success: function(user) {
      window.location = "GuestHome.html";
  },
  error: function(user, error) {
     alert("bad monkey");
  }
});
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
