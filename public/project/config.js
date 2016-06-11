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
            .when("/project/admin/user/:uid", {
                templateUrl: "views/user/userlist.view.client.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/project/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/project/home/user/:uid", {
                templateUrl: "views/user/userhome.view.client.html",
                controller: "HomePageController",
                controllerAs: "model"
            })

            .when("/project/user/:uid/search_images", {
                templateUrl: "views/user/image-search.view.client.html",
                controller: "ImageSearchController",
                controllerAs: "model"
            })
            

            

            

            //default route - login
            .otherwise({
                // redirectTo: "views/user/login.view.client.html"
                redirectTo: "/login"
            });
    }
})();