(function() {
    angular
        .module("FotoTag")
        .factory("RelationService", RelationService);

    function RelationService($http) {

        var api = {
            //createRelation: createRelation,
            updateFollowing: updateFollowing,
            getFollowers: getFollowers,
            getFollowing:getFollowing
        };
        return api;

        function updateFollowing(followingid) {
            var url = "/project/api/user/relationship/" + followingid;
            //console.log(followingid);
            return $http.post(url);
        }

        function getFollowers(userId){
            //console.log('hi');
            var url = "/project/api/user/followers/"+ userId;
            return $http.get(url)
        }
        
        function getFollowing(userId){
            //console.log('hi');
            var url = "/project/api/user/following/"+ userId;
            return $http.get(url)
        }
    }

})();