var homeControl = function($scope) {
    
    var ref = new Firebase('https://memorytext.firebaseio.com');

            $(function() {
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
            });


            var ref = new Firebase("https://memorytext.firebaseio.com");
            ref.onAuth(function(authData) {
              if (authData) {
                // user authenticated with Firebase
                console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
              } else {
                // user is logged out
                console.log("not logged in");
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
};

var formControl = function($scope) {

	$("#submitButton").click(function() {
                console.log("Submit Button Clicked");

                //var phoneNumber = document.getElementById("phoneNumber");
                //var textMessage = document.getElementById("bodyText");

                // Download the Node helper library from twilio.com/docs/node/install
                // These vars are your accountSid and authToken from twilio.com/user/account
                /*
                var accountSid = 'ACf1417db97ad6a449d3935f4ee970d1d4';
                var authToken = '353071a7cf8319b57b239417929acd0e'; 
                var client = require('twilio')(accountSid, authToken);
                 
                client.messages.create({
                    body: "Test Message from Bomani",
                    to: "+16155691920",
                    from: "+16159002993",
                }, function(err, message) {
                    process.stdout.write(message.sid);
                });
				*/
				$(function(){
				    $.ajax({
				        url: '/echo/json/', //the URL to your node.js server that has data
				        dataType: 'json',
				        cache: false
				    }).done(function(data){
				        //"data" will be JSON. Do what you want with it. 
				        alert(data);
				    }); 
				});

            });
    
};

