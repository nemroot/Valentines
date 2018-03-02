app.service('CategoriesService', CategoriesService);
CategoriesService.$inject = ['$http'];

function CategoriesService($http) {
    this.getListOfCategoriesService = function(category) {
        return $http({
            url: 'http://doorsaround.com:3000/categoryList',
            method: 'GET'
        }).success(function(data){
            console.log(data);
        }).error(function(data, status, headers, config) {
        });
    }
}