angular.module('CarGas.Main')
.directive('uploadImage', ['User', function (User) {
    return function (scope, element, attrs) {

        element.on('change', function (e) {
            angular.forEach(this.files, function (file, index) {
                var reader;

                if (file.type.match('image.*')) {
                    reader = new FileReader();

                    reader.onload = function (e) {
                        scope.user.set({ image: e.target.result });
                        scope.$apply();
                    };

                    reader.readAsDataURL(file);
                }

            });
        });

    };
}]);