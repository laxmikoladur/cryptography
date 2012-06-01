'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var servicesModule = angular.module('myApp.services', []);


servicesModule.factory('WordService', function($http) {

  var newServiceInstance = {};
  var wordList = [];
  
  $http({method: 'GET', url: 'lib/wordList/2of12-unix.txt'}).
        success(function(data, status, headers, config) {

          // this callback will be called asynchronously
          // when the response is available

          wordList = data.split("\r\n");

        }).
        error(function(data, status, headers, config) {

          // called asynchronously if an error occurs
          // or server returns response with status
          // code outside of the <200, 400) range

      });

  newServiceInstance.getWords = function(requestedWordCount) {
      
      var randomWords = [];
      var totalWordCount = wordList.length;
      var randomIndex;
      
      for (var i=0; i<requestedWordCount; i++) {

        randomIndex = Math.floor(Math.random()*totalWordCount);

        randomWords.push(wordList[randomIndex]);

      }

      return randomWords.join(' ');
 
    };
    
    return newServiceInstance;

});