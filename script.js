var baseURL = "https://accounts.google.com/o/oauth2/auth";
var clientID = "715393641613-h6qvdb3ev8p7co0mhdh6l02fuf49fgsc.apps.googleusercontent.com";
var redirectURI = "http%3A%2F%2Flocalhost%2Fauto-play-2.0%2F";
var responseType = "token";
var scope = "https://www.googleapis.com/auth/youtube";
var tUrl = baseURL+"?client_id="+clientID+"&redirect_uri="+redirectURI+"&response_type="+responseType+"&scope="+scope;

var response = window.location.hash;
var token;

if (response == "") {
  //client hasn't been authorised
  //probably want to change this to show a login page
  getToken();
} else {
  //client has been authorised
  if (response.slice(response.indexOf("=")-1) == "access_denied") {
    //access was denied
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
      }
    }).error(function () {
      //error with the request we probably need a new token
      getToken();
    });
  }
}

function getToken() {
  window.location.href=tUrl;
}