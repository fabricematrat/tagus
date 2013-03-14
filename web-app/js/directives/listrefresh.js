friend.directive('listRefresh', function () {

    var directiveDefinitionObject = {
        priority: 554,
        compile:function compile(tElement, tAttrs) {
            return function postLink(scope, element, attrs) {
                // watch the expression, and update the UI on change.
                scope.$watch(attrs.listRefresh, function (value) {
                    $('#list-' + attrs.listRefresh).listview('refresh');
                });
            }
        }
    };

    return directiveDefinitionObject;
});
