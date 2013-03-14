friend.directive("grailsLinked",function(){
    return function (scope, element, attrs) {
        var id = attrs["linked"];
        element.on("click",function(){
            if (document.getElementById(id)) {
                document.getElementById(id).click();
            }

        });
    };
});