document.getElementById("homeButton").addEventListener("click", homeButtonPress);
document.getElementById("profilePic").addEventListener("click", profilePicPress);

//window.location.replace('...');
function homeButtonPress()
{
  window.location="Home.html";
}
function profilePicPress()
{
  window.location="ProfilePage.html";
}


//swipe code for moving the menue to the left when swiped
$(window).load(function(){
        $("[data-toggle]").click(function() {
          var toggle_el = $(this).data("toggle");
          $(toggle_el).toggleClass("open-sidebar");
        });
         $("body").swipe({
              swipeStatus:function(event, phase, direction, distance, duration, fingers)
                  {
                      if (phase=="move" && direction =="right") {
    
                          // $(".container").addClass("open-sidebar");
                           //return false;
                      }
                      if (phase=="move" && direction =="left") {
                           $(".container").removeClass("open-sidebar");
                           return false;
                      }
                  }

          }); 
      });