(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "1c8b0e3f03206c9e3de371dcaaaf6235";
    var secret = "0419da9e0b502357"
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {

        var api = {
            searchPhotos: searchPhotos
        };
        return api;


        function searchPhotos(searchTerm) {
            return $http.get(urlBase.replace("API_KEY", key).replace("TEXT", searchTerm));
        }

    }

})();