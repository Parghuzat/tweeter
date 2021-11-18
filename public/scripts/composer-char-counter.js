$(document).ready(function() {
  $("#tweet-text").keyup(function () {
    $("#errormsg").hide();
    let current = $("#tweet-text").val().length; 
    $(".counter").html(140 - current);
    if (current > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    } 
  });
});