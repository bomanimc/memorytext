var ref = new Firebase('https://memorytext.firebaseio.com');

$("#loginButton").click(function() {
    console.log("Login Button Clicked");

    ref.authWithOAuthPopup("facebook", function(error, authData) {
       if (error) {
            if (error.code === "TRANSPORT_UNAVAILABLE") {
              // fall-back to browser redirects, and pick up the session
              // automatically when we come back to the origin page
              console.log("Auth Did Not Work. " + error);
              ref.authWithOAuthRedirect("facebook", function(error, authData) {});
            }
        } 
        else if (authData) {
            // user authenticated with Firebase
            console.log("Auth Worked");
            $("#loginButton").hide();
            $("getStarted").show();
            $("#logoutButton").show();
        }
    });

    
});


var ref = new Firebase("https://memorytext.firebaseio.com");
ref.onAuth(function(authData) {
  if (authData) {
    // user authenticated with Firebase
    console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
  } else {
    // user is logged out
    console.log("Already Logged In.");
  }
});

// we would probably save a profile when we register new users on our site
// we could also read the profile to see if it's null
// here we will just simulate this with an isNewUser boolean
var isNewUser = true;

var ref = new Firebase("https://memorytext.firebaseio.com");
ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into Firebase so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child('users').child(authData.uid).set(authData);
  }
});


$("#submitButton").click(function() {
      console.log("Submit Button Clicked");

      //var phoneNumber = document.getElementById("phoneNumber");
      //var textMessage = document.getElementById("bodyText");

    $(function(){
        /*
        $.ajax({
            url: '#/text', //the URL to your node.js server that has data
            type: "GET",
            
            data: {
            "to": "+16155691920",  
            "body": "Hey this is an Ajax-response text from Twilio!",  
          }, 
           success: function (data, textStatus, jqXHR) { 
              console.log("Get Successful on AJAX-side."); 
              console.dir(data); 
              console.log(textStatus); 
              console.dir(jqXHR); 
          }
        });
        */
        var parameters = {"to": "+16155691920",  "body": "Hey this is an Ajax-response text from Twilio!" };
        $.get( '/text',parameters, function(data) {
          //$('#results').html(data);
          console.log('Made GET call.')
          console.dir(data); 
        });
    });

  });