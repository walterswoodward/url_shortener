// This is our Angular Application

// Angular App name is "shortUrlApp", the dependencies go inside the brackets,
// in this case there are none.
var app = angular.module("shortUrlApp", [])

// Each controller is a mini application
// $scope allows us to connect our javascript variables with our HTML variables
// note*: In order to use our Angular variables in HTML we will need to include:
// 1. `ng-app="shortUrlApp"` inside the html tag
// 2. `ng-model="urlToShorten"` inside whichever element you plan to use this variable
app.controller('shortAppCtrl', function($scope){
  // This was just to test, commented out now because no default value is necessary
  // $scope.urlToShorten = "Hello World";
})