(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            login: login,
            register: register,
            logout: logout,
            checkLoggedin: checkLoggedin,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function login(username, password) {
            var url = "/api/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function register(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/register", user);
        }

        function logout() {
            return $http.post('/api/logout');
        }

        function checkLoggedin() {
            return $http.get("/api/loggedin");
        }

        function createUser(username, password) {
            var url = "/api/user";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
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