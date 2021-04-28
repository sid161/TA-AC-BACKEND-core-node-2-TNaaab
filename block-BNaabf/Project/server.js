var http = require('http');
var fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req,res){
    if(req.method === "GET" && req.url === '/form'){
        req.setHeader('Content-type', 'text/html')
        fs.createReadStream('./file.html').pipe(res);
    }
    if(req.method === "POST" && req.url === '/form'){
        let store = '';
        req.on("data", (chunk) => {
            store = store + chunk;
        })

        req.on('end', () => {
            res.setHeader('Content-type', 'text/html')
            res.end(``)
        })
    }

}

server.listen(5678, () => {
    console.log("Server listening on port 5678")
})
