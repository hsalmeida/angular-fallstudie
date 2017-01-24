angular.module('alurapic')
    .controller('FotoController', function($scope, $http, $routeParams) {

        $scope.foto = {};
        $scope.mensagem = "";

        if($routeParams.fotoId) {{
            $http.get('v1/fotos/' + $routeParams.fotoId)
                .success(function (foto) {
                    $scope.foto = foto;
                })
                .error(function (erro) {
                    $scope.mensagem = "Não foi possivel obter a foto";
                });
        }}

        $scope.submeter = function () {
            if ($scope.formulario.$valid) {
                if($scope.foto._id) {
                    $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
                        .success(function () {
                            $scope.mensagem = "Foto " + $scope.foto.titulo + " alterada com sucesso";
                        })
                        .error(function (erro) {
                            $scope.mensagem = "Não foi possível alterar a foto";
                        });
                } else {
                    $http.post('/v1/fotos', $scope.foto)
                        .success(function () {
                            $scope.foto = {};
                            $scope.mensagem = "Foto adicionada com sucesso";
                        })
                        .error(function (erro) {
                            $scope.mensagem = "Não foi possível cadastrar a foto";
                        });
                }
            }
        };

    });