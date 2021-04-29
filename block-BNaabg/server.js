var http = require('http');
var path = require('path');
var fs = require('fs');
var userDir = path.join(___dirname, "users/");

var server = http.createServer(handleRequest)

function handleRequest(req,res){
if(req.method === "POST" && req.url === '/users'){
    var username = J
}
}

server.listen(3300 , () => {
    console.log("server listening on port 3300")
})