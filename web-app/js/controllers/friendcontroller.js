'use strict';

friend.controller('FriendCtrl', function ($scope, $http, friends, friendService) {
    var feedService = friendService.feed;
    $scope.friends = friends;
    $scope.currentId = 0;
    $scope.actionButton = "ADD";

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    $scope.init = function () {
        feedService.listItems(function (data) {
            var _friends = [];
            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                if (element) {
                    _friends[element.id] = element;
                }
            }
            $scope.friends = _friends;
//            $scope.$apply();
        });
//        $http.get('http://localhost:8080/tagus/friend/list').success(function (data) {
//            for (var i = 0; i < data.length; i++) {
//                var element = data[i];
//                if (element) {
//                    $scope.friends[element.id] = element;
//                }
//
//            }
//        });
    };

    $scope.init();

    $scope.dispatch = function (event) {
        if (event) {
            event.stopPropagation();
        }
        if ($scope.actionButton == 'ADD') {
            addItem();
        } else if ($scope.actionButton == 'UPDATE') {
            updateItem();
        } else if ($scope.actionButton == 'CREATE') {
            createItem();
        }

    };

    $scope.gotoList = function(event) {
        if(event) {
           event.stopPropagation();
        }
        $scope.actionButton = "ADD";
        delete $scope.friends[0];
        $scope.currentId = 0;
        $.mobile.changePage($('#section-list-friend'), {changeHash: false});
    };

    //------------ Update item -----------------
    $scope.clicked = function (val) {
        $scope.currentId = val;
        $scope.actionButton = "UPDATE";
        $.mobile.changePage($('#section-show-friend'), {changeHash: false});
    };

    var updateItem = function () {
        //TODO remove view specific code to directive
        if ($('#input-friend-registrationDate')) {
          $scope.friends[$scope.currentId].registrationDate =  $('#input-friend-registrationDate').scroller('getDate', true);
        }

        var toJson = {friend:JSON.stringify($scope.friends[$scope.currentId])};
        toJson = $.param(toJson);
        feedService.updateItem(toJson, function (item) {
            $scope.gotoList();
//            $scope.$apply();
        });

//        var toJson = {friend:JSON.stringify($scope.friends[$scope.currentId])};
//        toJson = $.param(toJson);
//        $http.post("http://localhost:8080/tagus/friend/update", toJson)
//            .success(function (item, status, headers, config) {
//                if (item.errors || item.message) {
//                    return false;
//                }
//                $scope.gotoList();
//                $.mobile.changePage($('#section-list-friend'));
//            }).error(function (item, status, headers, config) {
//                //var eltOnError = item;
//
//            });
    };
    //------------ End update item -----------------

    //------------ Add new item -----------------
    var addItem = function () {
        $scope.friends[0] = {firstname:''};
        $.mobile.changePage($('#section-show-friend'), {changeHash: false});
        $scope.actionButton = "CREATE";
    };

    var createItem = function () {
        //TODO remove view specific code to directive
        if ($('#input-friend-registrationDate')) {
            $scope.friends[$scope.currentId].registrationDate =  $('#input-friend-registrationDate').scroller('getDate', true);
        }

        var toJson = {friend:JSON.stringify($scope.friends[0])};
        toJson = $.param(toJson);
        feedService.createItem(toJson, function (item) {
            $scope.friends[item.id] = item;
            delete $scope.friends[0];
            $scope.gotoList();
//            $scope.$apply();
        });

//        var toJson = {friend:JSON.stringify($scope.friends[0])};
//        toJson = $.param(toJson);
//        $http.post("http://localhost:8080/tagus/friend/save", toJson)
//            .success(function (item, status, headers, config) {
//                if (item.errors || item.message) {
//                    return false;
//                }
//                $scope.friends[item.id] = item;
//                delete $scope.friends[0];
//                $scope.gotoList();
//            }).error(function (item, status, headers, config) {
//
//
//            });
    };
    //------------ End add new item -----------------

    //------------ Delete item -----------------
    $scope.delete = function (event) {
        if (event) {
            event.stopPropagation();
        }
        deleteItem();
    };

    var deleteItem = function () {

        var toJson = {id:$scope.currentId};
        toJson = $.param(toJson);
        feedService.deleteItem(toJson, function (item) {
            delete $scope.friends[$scope.currentId]
            $scope.gotoList();
            //$scope.$apply();
        });

//        var toJson = {id:$scope.currentId};
//        toJson = $.param(toJson);
//        $http.post("http://localhost:8080/tagus/friend/delete", toJson)
//            .success(function (item, status, headers, config) {
//                if (item.errors || item.message) {
//                    return false;
//                }
//                delete $scope.friends[$scope.currentId]
//                $scope.gotoList();
//            }).error(function (item, status, headers, config) {
//
//
//            });
    };
    //------------ Delete item -----------------
});
