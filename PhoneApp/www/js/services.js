angular.module('starter.services', [])
.factory('userService',function($rootScope){
    return {getUserId:function(){
    var localStorageKey = "qrToken";
      if(!window.localStorage.getItem(localStorageKey))
        window.localStorage.setItem(localStorageKey,Math.floor((Math.random() * 100000) + 1));
      return window.localStorage.getItem(localStorageKey);
    }}
})
.factory('firebaseService', function($q, $firebaseArray) {

    var objectArray = [];
 var service = {};

  return{
    initialize : initialize,
 getAll : getAll,
 create : create,
 getById : getById,
 findDevice : findDevice
  };

 

 function initialize(objectName) {
   return getDataArray(objectName);
 }

 function getAll(objectName) {
   return objectArray;
 }

 function getById(id, array) {
   return array.$getRecord(id);
 }

 function create(object, array) {
   return array.$add(object)
   .then(function(data) {
     return data.key;
   });
 }

 function update(object, array) {
   return array.$save(object);
 }

 function getDataArray(objectName) {
     var ref = firebase.database().ref().child(objectName); //jshint ignore:line
     return $firebaseArray(ref);
   }

   function findDevice(array, deviceId) {
     var deferred = $q.defer();
     array.$ref().orderByChild("deviceId").equalTo(deviceId)
     .once("value", function(dataSnapshot) {
       var clockin = dataSnapshot.val();
       if (clockin) {
         deferred.resolve(clockin);
       } else {
         deferred.reject(false);
       }
     });

     return deferred.promise;
   }
});
