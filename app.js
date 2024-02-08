const http = require("node:http");
const fs = require("node:fs");

const hostname = "127.0.0.1";
const port = 3000;
const serverUrl = "http://" + hostname + ":" + port + "";

const solarSystem = require("./solar-system-data.json");

const server = http.createServer((req, res) => {
    const requestUrl = new URL(serverUrl + req.url);
    const pathComponents = requestUrl.pathname.split("/");
    console.log(req.method);
     if(req.method == "GET") {

        switch(pathComponents[1]) {
            case "data":
                if(pathComponents.length > 2){
                    console.log(pathComponents[2]);
                    switch(pathComponents[2]) {
                        case "10":
                            var solarSysStar = JSON.stringify(solarSystem.star);
                            sendResponse(res, 200, "application/json", solarSysStar);
                        break;
                        default:

                            sendResponse(res, 200, "application/json", JSON.stringify(solarSystem.planets[pathComponents[2]]));
                    }
                }
                else {
                    sendResponse(res, 200, "application/json", JSON.stringify(solarSystem));
                }
            break;
            case "image":
                let imageFilePath;
                if (pathComponents[2] === "Sun") {
                    imageFilePath = solarSystem.star.image_src;
                }
                else {
                    imageFilePath = solarSystem.planets.find(p => p.name === pathComponents[2]).image_src;
                }
                console.log(imageFilePath);
                //const imageFilePath = "./media/" + pathComponents[2] + ".png";
                fs.readFile(imageFilePath, (err, data) => {
                    if (err) {
                        res.statusCode = 404;
                        res.setHeader("Content-Type", "text/plain");
                        res.end("An error occurred while reading the file.");
                    }
                    else {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "image/png");
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.setHeader("Access-Control-Allow-Headers", "*");
                        res.end(data);
                    }
                });
            break;
            case "neighbor":
                const planetKey = parseInt(pathComponents[2]);
                console.log(planetKey);
                switch(planetKey) {
                    case 0:
                        var sun = JSON.stringify(solarSystem.star.name);
                        var planet1 = JSON.stringify(solarSystem.planets[planetKey + 1].name);
                        var sendNeighbor = sun + " and " + planet1;
                        sendResponse(res, 200, "text/plain", sendNeighbor);
                    break;
                    case 7:
                        var planet1 = JSON.stringify(solarSystem.planets[planetKey - 1].name);
                        var sendNeighbor = planet1;
                        sendResponse(res, 200, "text/plain", sendNeighbor);
                    break;
                    case 10:
                        var planet1 = JSON.stringify(solarSystem.planets[0].name);
                        var sendNeighbor = planet1;
                        sendResponse(res, 200, "text/plain", sendNeighbor);
                    break;
                    default:
                        var planet1 = JSON.stringify(solarSystem.planets[planetKey - 1].name);
                        var planet2 = JSON.stringify(solarSystem.planets[planetKey + 1].name);
                        var sendNeighbor = planet1 + " and " + planet2;
                        sendResponse(res, 200, "text/plain", sendNeighbor);
                    break;
                }
            break;
        }
        
    }
    else if (req.method == "OPTIONS") {
        sendResponse(res, 204, null, null);
    }
    /*
    else if (req.method == "POST") {
        switch(pathComponents[1]) {
            case "score":
                //Container for recieved 'chunks'
                const bodyChunks = [];

                //an error has occurred:
                req.on("error", (err) => {
                    console.log("An error occurred when reading the HTTP POST message's body: " 
                    + err.message);
                    sendResponse(res, 500, null, null);
                });

                // a new chunk of data has been recieved: "collect it"
                req.on("data", (chunk) => {
                    bodyChunks.push(chunk);
                });

                // the last chunk of data has beem recieved
                req.on("end", () => {
                    const messageBody = Buffer.concat(bodyChunks).toString();
                    routing_score(res, messageBody);
                });
                break;

            default:
                sendResponse(res, 400, "text/plain", "bad grr");
            
        } */
    //}
});

server.listen(port, hostname, () => {
    console.log("Server is running against it's will at:\n" + serverUrl);
});

function sendResponse(res, statusCode, contentType, data) {
    res.statusCode = statusCode;
    if(contentType != null) res.setHeader("Content-Type", contentType);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (data != null) res.end(data);
    else res.end();
}
