(function() {
    angular
        .module("FotoTag")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            listUsers: listUsers,
            searchUserByImage:searchUserByImage
        };
        return api;

        function createUser(username, password, imageurl) {
            var url = "/project/api/user";
            var user = {
                username: username,
                password: password,
                imageurl: imageurl
            };
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/project/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/project/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/project/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url="/project/api/user/" + userId;
            return $http.delete(url);
        }

        function listUsers() {
            var url="/project/api/user";
            return $http.get(url);
        }
        
        function searchUserByImage(imageurl){
            url = "/project/user/get_images?imageurl=" + imageurl ;
            //console.log(url);
            return $http.get(url)
        }
    }


})();