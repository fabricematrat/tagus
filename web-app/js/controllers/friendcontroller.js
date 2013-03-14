'use strict';

friend.controller('ListCtrl', function ($scope, friendService) {
    var feedService = friendService.feed;
    $scope.init = function () {
        feedService.listItems(function (data) {
            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                if (element) {
                    $scope.$parent.friends[element.id] = element;
                }
            }
        });
    };
    $scope.init();

});


friend.controller('FormCtrl', function ($scope, friendService) {
    var feedService = friendService.feed;
    $scope.form = {};
    $scope.$watch("actionButton.state", function (value) {
        if (value == "SAVE") {
            createItem();
        } else if (value == "UPDATE") {
            updateItem();
        } else if (value == "DELETE") {
            deleteItem();
        } if (value == "READ") {
            $scope.form = $scope.friends[$scope.currentId];
        } else {
            $scope.form = {};
            $scope.formUpdateFriend.$setPristine();
        }
    });

    var updateItem = function () {
        if ($('#input-friend-registrationDate')) {
            $scope.form.registrationDate =  $('#input-friend-registrationDate').scroller('getDate', true);
        }

        var toJson = {friend:JSON.stringify($scope.form)};
        toJson = $.param(toJson);
        feedService.updateItem(toJson, function (item) {
            $scope.$parent.friends[item.id] = item;
            $scope.$parent.actionButton.state = "INIT";
            $.mobile.changePage($('#section-list-friend'), {changeHash: false});
        });

    };


    var createItem = function () {
        if ($('#input-friend-registrationDate')) {
            $scope.form.registrationDate =  $('#input-friend-registrationDate').scroller('getDate', true);
        }

        var toJson = {friend:JSON.stringify($scope.form)};
        toJson = $.param(toJson);
        feedService.createItem(toJson, function (item) {
            $scope.$parent.friends[item.id] = item;
            $scope.$parent.actionButton.state = "INIT";
            $.mobile.changePage($('#section-list-friend'), {changeHash: false});
        });
    };

    var deleteItem = function () {
        var toJson = {id:$scope.currentId};
        toJson = $.param(toJson);
        feedService.deleteItem(toJson, function (item) {
            delete $scope.$parent.friends[$scope.currentId]
            $scope.$parent.actionButton.state = "INIT";
            $.mobile.changePage($('#section-list-friend'), {changeHash: false});
        });
    };
});

friend.controller('FriendCtrl', function ($scope, $http, friends) {
    $scope.friends = friends;
    $scope.refresh = false;
    $scope.currentId = 0;
    $scope.actionButton = {state:"INIT"};  // possible values: INIT, CREATE, READ, UPDATE, DELETE

    $scope.dispatch = function (event, button) {
        if (event) {
           event.stopPropagation();
        }
        if ($scope.actionButton.state == "INIT") {
            $scope.actionButton.state = "CREATE";
            $.mobile.changePage($('#section-show-friend'), {changeHash: false});
        }
        else if ($scope.actionButton.state == "CREATE") {
            $scope.actionButton.state = "SAVE";
        }
        else if ($scope.actionButton.state == "READ") {
            $scope.actionButton.state = "UPDATE";
        }
    };

    $scope.clicked = function (val) {
        $scope.currentId = val;
        $scope.actionButton.state = "READ";
        $.mobile.changePage($('#section-show-friend'), {changeHash: false});
    };

    $scope.delete = function (event) {
        if (event) {
            event.stopPropagation();
        }
        $scope.actionButton.state = "DELETE";
        $.mobile.changePage($('#section-list-friend'), {changeHash: false});
    };


});
