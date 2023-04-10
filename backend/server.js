const http = require('http');

const dbo = require("./database/connection");
const app = require("./app")

const port = process.env.PORT || 5000;

let server = http.createServer(app);

server.listen(port, () => {
    dbo.connectToServer();
    console.log(`Server is running on port: ${port}`);
});