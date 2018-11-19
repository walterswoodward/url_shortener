// This is our Angular Application

// Angular App name is "shortUrlApp", the dependencies go inside the brackets,
// in this case there are none.
var app = angular.module("shortUrlApp", [])

// Each controller is a mini application
// $scope allows us to connect our javascript variables with our HTML variables
app.controller('shortAppCtrl', function($scope){
  $scope.urlToShorten = "Hello World";
})