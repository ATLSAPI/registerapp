angular.module('starter.controllers', ['ngCordova','starter.services'])
.controller('SigninCtrl', function($scope, firebaseService, userService, $state, $rootScope) {
	var firebase =  {
	     apiKey: "AIzaSyAuDjUfXcS056IJnyP6qyqSbCFADEE6IWw",
	     authDomain: "intechnica-register.firebaseapp.com",
	     databaseURL: "https://intechnica-register.firebaseio.com",
	     storageBucket: "intechnica-register.appspot.com",
	     messagingSenderId: "783060087254",
	     entityKey: "clockins",
         usersKey: "users"
   };
   $rootScope.$on('ionicLoaded',load)

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
                        var userList = firebaseService.initialize(firebase.usersKey);
                        userList.$loaded().then(function (list) {
                        	var user;
							for (var i = userList.length - 1; i >= 0; i--) {
								var currentUser = userList[i];
								if(!user)
									if(currentUser.userId == $rootScope.token)
										user = currentUser;
							}
							if(!user || !user.firstName){
								$rootScope.userId = user.$id;
                                $state.go('tab.account');
							}

                        });
		     		}
	     		});

	     	}
	     });
	   }
})
.controller('AccountCtrl', function($scope, firebaseService, $rootScope) {
	var firebase =  {
	     apiKey: "AIzaSyAuDjUfXcS056IJnyP6qyqSbCFADEE6IWw",
	     authDomain: "intechnica-register.firebaseapp.com",
	     databaseURL: "https://intechnica-register.firebaseio.com",
	     storageBucket: "intechnica-register.appspot.com",
	     messagingSenderId: "783060087254",
	     entityKey: "clockins",
         usersKey: "users"
   };
	$scope.user = {firstName:"",surname:""}
	load();
	function load(){
		firebaseService.initialize(firebase.usersKey).$loaded().then(function (list) {
			userList = list;
			var user;
			for (var i = userList.length - 1; i >= 0; i--) {
				var currentUser = userList[i];
				if(!user)
					if(currentUser.userId == $rootScope.token)
						user = currentUser;
			}
			if(user){
				$scope.user.firstName = user.firstName;
				$scope.user.surname	 = user.surname;
			}

		});
	}
  $scope.updateUser = function(){
  	var userList = [];

	firebaseService.initialize(firebase.usersKey).$loaded().then(function (list) {
		userList = list;
		var user;
		for (var i = userList.length - 1; i >= 0; i--) {
			var currentUser = userList[i];
			if(!user)
				if(currentUser.userId == $rootScope.token)
					user = currentUser;
		}
        // firebaseService.findKey('userId', $rootScope.token, list)
        // .then(function(userFound){
    	user.firstName = $scope.user.firstName;
    	user.surname = $scope.user.surname;
    	firebaseService.update(user, userList).then(function(){
    		alert("User Saved");
    	}).catch(function(e){
    		console.log(e);
    		alert("Error saving user");
    	});
        // })
    });
      console.log("Firstname: ", $scope.user.firstName);
      console.log("surname: ", $scope.user.surname);
      console.log("token: ", $scope.token);
    };
});
