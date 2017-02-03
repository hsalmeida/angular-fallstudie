angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function($resource) {

        return $resource('/v1/fotos/:fotoId', null, {
            'update' : {
                method: 'PUT'
            }
        });
    })
    .factory("cadastroDeFotos", function(recursoFoto, $q, $rootScope) {
        var service = {};
        var evento = 'fotoCadastrada';
        service.cadastrar = function(foto) {
            return $q(function(resolve, reject) {
                if(foto._id) {
                    recursoFoto.update({fotoId: foto._id}, foto, function() {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso',
                            inclusao: false
                        });
                    }, function(erro) {
                        console.log(erro);
                        reject({
                            mensagem: 'N�o foi poss�vel atualizar a foto ' + foto.titulo
                        });
                    });

                } else {
                    recursoFoto.save(foto, function() {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem: 'Foto ' + foto.titulo + ' inclu�da com sucesso',
                            inclusao: true
                        });
                    }, function(erro) {
                        console.log(erro);
                        reject({
                            mensagem: 'N�o foi poss�vel incluir a foto ' + foto.titulo
                        });
                    });
                }
            });
        };
        return service;
    });