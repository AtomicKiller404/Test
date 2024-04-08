var app = angular.module("employeeApp", []);

app.controller("employeeTable", function($scope, $http){
    $http.get('https://jsonplaceholder.typicode.com/users')
        .then(function(response) {
        $scope.employees = response.data;
        })
        .catch(function(error) {
        console.log('Error fetching employee data:', error);
        });

    $scope.showUserInfo = function(user){
        $scope.selectedUser = user;
    }   

    $scope.popAlert = function(user){
        if (confirm(" Are you sure you want to delete this record?")) {
            let index = $scope.employees.indexOf(user);
            if(index != -1){
                $scope.employees.splice(index, 1);
                $('#userInfo').modal('hide'); 
            }
        }
    }
});

app.component("userInfo", {    
    bindings: { user: '<' },
    transclude: true,
    template: '<div ng-transclude></div>'
});

app.directive("onLongPress", function($timeout){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            var timeoutPromise;

            element.on('mousedown touchstart', function(event){
                timeoutPromise = $timeout(function(){
                    console.log('Long press detected');
                }, 1000)
            });

            element.on('mouseup touchend', function(event) {
                $timeout.cancel(timeoutPromise);
            });
        }
    };
});