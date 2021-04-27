var http = require('http');
var server = http.createServer(handleRequest);
var fs = require('fs');

function handleRequest(req,res){
 res.setHeader("Content-Type", "text/plain")
 fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(2400, () => {
    console.log("Server listening on port 2400")
})