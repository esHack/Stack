// Commons.js

var currencyNames=[];
var currencyArr='';
var app=angular.module("myapp", []);

//Controller 
app.controller("MyController", function($scope,$http) {

  $http.get("/getStack").then(function(response) {
    currencyArr= response.data;
    $scope.myData=currencyArr.split(',');
   
  });



  $scope.convert=function(){
     $http.get('/convert', {
        params: { value:document.getElementById('currency').value} }).then(function(response) {
          console.log(response.data);
          currencyArr=response.data; 
          $scope.myData=currencyArr.split(',');
          document.getElementById('currency').value='';
          document.getElementById('textval').textContent='';
        });
    }

$scope.reset=function(){
     $http.get('/reset').then(function(response) {
          console.log(response.data);
          currencyArr=response.data; 
          $scope.myData=currencyArr.split(',');
        });
    }

    $scope.pop=function(){
     $http.get('/pop').then(function(response) {
          console.log(response.data);
          currencyArr=response.data; 
          if(currencyArr=='' ) document.getElementById('textval').textContent='No more values on the stack';
          $scope.myData=currencyArr.split(',');
        });
    }

});


