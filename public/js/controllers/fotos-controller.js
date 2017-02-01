angular.module('alurapic').controller('FotosController', function ($scope, recursoFoto) {

    $scope.fotos = [];
    $scope.filtro = '';
    $scope.mensagem = "";

    recursoFoto.query(function (fotos) {
        $scope.fotos = fotos;
    }, function (erro) {
        console.log(erro);
    });

    $scope.remover = function (foto) {
        recursoFoto.delete({fotoId: foto._id}, function () {
            var indice = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indice, 1);
            $scope.mensagem = "Foto " + foto.titulo + " removida com sucesso";
        }, function () {
            $scope.mensagem = "Foto " + foto.titulo + " não foi removida";
        });

    };

});