var http = require('http');

var server = http.createServer(handleRequest)
var qs = require('querystring');


function handleRequest(req,res){
    
    var store = '';
    req.on('data', (chunk) => {
     store = store + chunk;
    })

    req.on('end', () => {
    if(req.method === "POST" && req.url === "/json"){
        res.setHeader('Content-Type', "application/json")
        res.end(store);
    }
     
    if(req.method === "POST" && req.url === "/form"){
        var parsedData = qs.parse(store)
        res.end(JSON.stringify(parsedData));
    }

    })

}

server.listen(7000, () => {
    console.log("Server listening on port 7000");
})