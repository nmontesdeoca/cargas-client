var express = require('express'),
    app = express();

app.configure(function () {
    app.use(express.static(__dirname));
    app.use(app.router);
});

app.use(function (request, response, next) {
    response.sendfile('index.html');
});

app.listen(process.env.PORT || 3001);