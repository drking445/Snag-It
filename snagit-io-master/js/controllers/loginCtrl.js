'use strict'

var loginCtrl = app.controller('loginCtrl', function($scope, $http){
    $scope.books = []
    $scope.users = []

    $scope.usersbooks = {}
    var usersUpdate = function(){
        for(var i = 0; i < $scope.users.length; i++){
            $scope.usersbooks[$scope.users[i]["_id"]] = [$scope.users[i]["firstName"] + " " + $scope.users[i]["lastName"], $scope.users[i]["email"]];

        }
        console.log($scope.usersbooks);
    }

    

	$scope.loginComplete = false;
	$scope.signUp = function(){
		var dataObj = {
				firstName: $scope.firstName,
				lastName: $scope.lastName,
				username: $scope.username,
				email: $scope.email,
				password: $scope.password
		};
        console.log(dataObj);
        $http.post('https://snagit-morehouse.herokuapp.com/api/users', dataObj)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
                console.log($scope.PostDataResponse);
                $scope.loginComplete = true;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                console.log($scope.PostDataResponse);
            });

	}
	$scope.login = function(){
		var dataLogin = {
				email: $scope.email,
				password: $scope.password
		};
        console.log(dataLogin);
        $http.post('https://snagit-morehouse.herokuapp.com/api/authenticate_user', dataLogin)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
                console.log($scope.PostDataResponse);
                if (data.success != false){
                	$scope.username = data.username;
                	$scope.loginComplete = true;
                	console.log($scope.PostDataResponse);
                }
            })
            
	}


    $http.get('https://snagit-morehouse.herokuapp.com/api/books')
            .success(function (data, status, headers, config) {
                $scope.books = data;
                console.log($scope.books);
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                console.log('error');
            });

    $http.get('https://snagit-morehouse.herokuapp.com/api/users')
            .success(function (data, status, headers, config) {
                $scope.users = data;
                console.log($scope.users);
                usersUpdate();
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                console.log('error');
            });
});

