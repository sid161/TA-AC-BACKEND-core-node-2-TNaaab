var http = require('http');

var server = http.createServer(handleRequest)
var qs = require("querystring");

function handleRequest(req,res){
    var dataFormat = req.headers('Content-Type')
    var store = '';
    req.on('data', (chunk) => {
     store = store + chunk;
    })

    req.on('end', () => {
    if(dataFormat === "application/json"){
        var parsedData = JSON.parse(store);
        res.end(store);
    }
     
    if(dataFormat === "application/x-www-form-urlencoded"){
        var parsedData = qs.parse(store);
        res.end(JSON.stringify(parsedData));
    }

    })

}

server.listen(7000, () => {
    console.log("Server listening on port 7000");
})