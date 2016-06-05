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
            deleteUser: deleteUser
        };
        return api;

        function createUser(username, password, imageurl) {
            var url = "/api/new_user";
            var user = {
                username: username,
                password: password,
                imageurl: imageurl
            };
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/new_user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url="/api/user/" + userId;
            return $http.delete(url);
        }
    }

})();