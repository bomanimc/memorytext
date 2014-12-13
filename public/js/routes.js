var memoryModule = angular.module('memorytext', ['ngRoute']);

memoryModule.config(function($routeProvider){
	$routeProvider.
	when('/', 
		{templateUrl:'partials/home.html', controller: homeControl}).
	when('/form', 
		{templateUrl:'partials/form.html', controller: formControl}).
	otherwise({redirectTo: '/'});


});

memoryModule.directive('formControl', function() {
	return {
		link: function() {

			$("#submitButton").click(function() {
                console.log("Submit Button Clicked");

                //var phoneNumber = document.getElementById("phoneNumber");
                //var textMessage = document.getElementById("bodyText");
                /*
                var phoneNumber = 6155691920;
                var textMessage = "Harcoded test message";
                var data = {
                  number: phoneNumber,
                  message: textMessage
                }
               
                var jsonData = JSON.stringify(data);

                $.ajax({
                    url: 'http://textbelt.com/text',
                    type: 'POST',
                    dataType: 'jsonp',
                    data: 'jsonData', // or $('#myform').serializeArray()
                    success: function() { alert('POST completed'); }
                });
                */

                // Download the Node helper library from twilio.com/docs/node/install
                // These vars are your accountSid and authToken from twilio.com/user/account
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

            });
		}
	}
});

memoryModule.directive('homeControl', function() {
	return {
		link: function() {
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
		}
	}
});

