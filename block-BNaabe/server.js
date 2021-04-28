// __server.js // absolute path
// __dirname + "./app.js" // absolute path
// "./index.js" // relative path
// var path = require('path')
// path.join(__dirname, 'index.html')

var http = require('http');
var server = http.createServer(handleRequest)

function handleRequest(req,res){
    if(req.method=== "POST" && req.url === "/"){
        var store = '';
        req.on('data', (chunk) => {
            store = store + chunk;
        })

        req.on('end',() => {
            var parsedData = JSON.parse(store);
            res.end(store);
        })
    }

}

server.listen(2600, () => {
    console.log("Server listening on port 2600");
})