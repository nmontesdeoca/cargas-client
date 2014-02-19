var express = require('express'),
    app = express();

app.configure(function () {
    app.use(express.static(__dirname));

    app.use(function (request, response, next) {
        if (request.path === '/manifest.appcache') {
            response.set('Content-Type', 'text/cache-manifest');
        }
        next.apply(this);
    });

    app.use(function (request, response, next) {
        response.sendfile('index.html');
    });
});

app.listen(process.env.PORT || 3001);