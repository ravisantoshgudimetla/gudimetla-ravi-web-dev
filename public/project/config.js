(function() {
    angular
        .module("FotoTag")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
        
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            

            

            //default route - login
            .otherwise({
                // redirectTo: "views/user/login.view.client.html"
                redirectTo: "/login"
            });
    }
})();