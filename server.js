var express = require("express");
var app = express();
var appData = require('./priceData.json');
console.log(appData);
var apiRoutes = express.Router();



apiRoutes.get('/priceList', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers","content-type");
    res.json({
        errno: 0,
        data: appData
    });
});

app.use('/api', apiRoutes);

app.listen(8081);
console.log("server run at  port :8081");