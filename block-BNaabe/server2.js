var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest)

function handleRequest(req,res){
if(req.method === "POST" && req.url === "/"){
    var store = '';
    req.on("data", (chunk) => {
        store = store + chunk;
 })
  req.on("end" ,() => {
    var parsedData = qs.parse(store);
    res.end(JSON.stringify(parsedData));
  })

}
}

server.listen(3400,() => {
    console.log("server listening on port 3400");
})