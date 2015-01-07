//Links to all the differnt Pages
document.getElementById("homeButton").addEventListener("click", homeButtonPress);
function homeButtonPress()
{
  window.location="Home.html";
}

document.getElementById("friendsPic").addEventListener("click", friendsPickPress);
function friendsPicPress()
{
  window.location="FriendsPage.html";
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