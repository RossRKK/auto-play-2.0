//track whether the user ha logged in
var loggedIn = false;
var apikey = "AIzaSyAWhQ7D5jjmH0u95S8_XyoqXQk7Uhts4O8";

var baseURL = "https://accounts.google.com/o/oauth2/auth";
var clientID = "715393641613-h6qvdb3ev8p7co0mhdh6l02fuf49fgsc.apps.googleusercontent.com";
var redirectURI = "http%3A%2F%2Flocalhost%2Fauto-play-2.0%2F";
var responseType = "token";
var scope = "https://www.googleapis.com/auth/youtube";
var tUrl = baseURL+"?client_id="+clientID+"&redirect_uri="+redirectURI+"&response_type="+responseType+"&scope="+scope;

var response = window.location.hash;
var token;

if (response != "") {
  //client has been authorised
  if (response.slice(response.indexOf("=")-1) == "access_denied") {
    //access was denied
    alert("Access Denied"); //change to something better
  } else {
    //validate the users token
    token = response.slice(response.indexOf("=")+1, response.indexOf("&"));
    url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=";
    var userData;
    $.get(url+token, function(data) {
      userData = data;
      if (userData.error != null) {
        //token is invalid
        getToken();
      } else {
        loggedIn=true;
        $(".login").hide();
        window.location.href="#";
      }
    }).error(function () {
      //error with the request we probably need a new token
      loggedIn=false;
      alert("Error Loging in"); // change to something better
    });
  }
}

function getToken() {
  window.location.href=tUrl;
}

function toggleFilters() {
  html = $("#filterbutton").html();
  if (html == "[+]") {
    $("#filterbutton").html("[-]");
  } else {
    $("#filterbutton").html("[+]");
  }
  $("#filters").toggle();
}

//get videos
if (loggedIn) {
  //pull the users videos
} else {
  //pull popular videos
  url = "https://www.googleapis.com/youtube/v3/videos?part=player&chart=mostPopular&key=" + apikey;
  $.getJSON(url, function (data) {
    items = data.items;
    for (var i = 0; i < items.length; i++) {
      html = "<div class='video'>" + items[i].player.embedHtml + "</div>";
      console.log(html)
      $(html).appendTo($("#videos"));
    }
  });
}