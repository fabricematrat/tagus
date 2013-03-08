var tagus = tagus || {};

tagus.loadConfiguration = (function () {
    tagus.configuration = {
        baseURL: "http://localhost:8080/tagus/",
        //Uncomment before pushing to cloudfoundry
        //baseURL: "http://tagus.cloudfoundry.com/",
        namespace: "tagus",
        domain:[]
    };
})();

