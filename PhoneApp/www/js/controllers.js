angular.module('starter.controllers', ['ngCordova','starter.services'])
.controller('SigninCtrl', function($scope, firebaseService, userService, stateProvider) {
	console.log(firebaseService);
	var firebase =  {
	     apiKey: "AIzaSyAuDjUfXcS056IJnyP6qyqSbCFADEE6IWw",
	     authDomain: "intechnica-register.firebaseapp.com",
	     databaseURL: "https://intechnica-register.firebaseio.com",
	     storageBucket: "intechnica-register.appspot.com",
	     messagingSenderId: "783060087254",
	     entityKey: "clockins",
         usersKey: "users"
   };
	load();


	function load() {
	     var list = firebaseService.initialize(firebase.entityKey);
	     list.$loaded()
	       .then(function(data) {
	         firebaseService.findDevice(data, '27194')
	           .then(function(blob) {
	             console.log(blob);
	           });
	       });

	     list.$watch(function(event) {

	     	if(event.event == "child_added"){
	     		var id = event.key;
	     		var queryList = firebaseService.initialize(firebase.entityKey);
	     		queryList.$loaded(function(cb){
	     			var getById = firebaseService.getById(id,cb);
		     		if(getById && getById.userId == userService.getUserId()){
		     			console.log("Found yourself");
                        var userList = firebase.initialize(firebase.usersKey);
                        userlist.$loaded.then(function (list) {
                            firebaseService.findKey('userId', $scope.token, list)
                            .then($.noop())
                            .catch(function () {
                                location.path = '/account';
                            });
                        });
		     		}
	     		});

	     	}
	     });
	   }
})
.controller('AccountCtrl', function($scope) {
    $scope.user = { firstName: "JACK",
                    surname: "SCOTSON" };
  $scope.updateUser = function(){
      console.log(accountForm);
      console.log("Firstname: ", $scope.user.firstName);
      console.log("surname: ", $scope.user.surname);
      console.log("token: ", $scope.token);
    };
});
