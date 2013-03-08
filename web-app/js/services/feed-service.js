'use strict';


friend.factory('baseURL', function() {
    return "http://localhost:8080/tagus/";
});

friend.factory('store', function() {
    return grails.mobile.storage.store(null, 'friend');
});

friend.factory('friendService', function(baseURL, store) {
    var _feed = grails.mobile.feed.feed(baseURL + 'friend/', store);
    return {
       store: store,
       feed: _feed
    };
});
