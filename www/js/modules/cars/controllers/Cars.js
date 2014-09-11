angular.module('cars')

.controller('Cars', [
    '$scope',
    'Car',
    function ($scope, Car) {

        $scope.cars = [Car.query()];
        console.log($scope.cars);
        /*

        $scope.cars = [{
            image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcShKm0XEVPb4XeyQtn4jfJqpGrh5KZWfiR-2Oi943nW6VsnHtJ4pipMdPs',
            name: 'Peugeot 307',
            description: 'Best car in the world'
        }];*/

}]);
