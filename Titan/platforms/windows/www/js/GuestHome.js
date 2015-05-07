

//SideBar Button event listeners
// ****disabled for app jam****
// document.getElementById("registerPic").addEventListener("click", registerPress);
document.getElementById("settingsPic").addEventListener("click", settingsPicPress);




//Side Bar Button Links
function registerPress()
{
  window.location="Register.html";
}
function settingsPicPress()
{
  window.location="GuestSettings.html";
}



//swipe code for moving the menue to the left when swiped
$(window).load(function(){
        $("[data-toggle]").click(function() {
          var toggle_el = $(this).data("toggle");
          $(toggle_el).toggleClass("open-sidebar");
        });
        /*
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

          }); */
      });