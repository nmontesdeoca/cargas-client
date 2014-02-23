var express = require('express'),
    app = express(),
    middleware = {
        manifestMiddleware: function (request, response, next) {
            if (request.path === '/manifest.appcache') {
                response.set('Content-Type', 'text/cache-manifest');
            }
            next.apply(this);
        },
        redirectToDomain: function (request, response, next) {
            if (request.host === 'cargas.herokuapp.com') {
                response.redirect(301, 'http://www.cargasapp.com' + request.path);
                response.end();
            } else {
                next.apply(this);
            }
        },
        sendIndex: function (request, response, next) {
            response.sendfile('index.html');
        }
    };

app.configure(function () {
    app.use(middleware.redirectToDomain);

    app.use(express.static(__dirname));

    app.use(middleware.manifestMiddleware);

    app.use(middleware.sendIndex);
});

app.listen(process.env.PORT || 3001);