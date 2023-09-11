"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./app/players/controller");
var express = require("express");
var bodyParser = require("body-parser");
var controller_2 = require("./app/users/controller");
var expressjwt = require("express-jwt");
var fs = require("fs");
var https = require("https");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var jwtCheckMiddleware = expressjwt.expressjwt({
    secret: process.env["SECRET"],
    algorithms: ["HS256"],
});
//const port = 8084;
var router = express.Router();
router.get("/", function (req, res) {
    res.json({ message: "Hi there, welcome to NativeScripting!" });
});
router.post("/register", controller_2.registerUser);
router.post("/login", controller_2.loginUser);
router.get("/players", jwtCheckMiddleware, controller_1.getPlayers);
router.get("/players/:id", jwtCheckMiddleware, controller_1.getPlayerById);
app.use("/api", router);
//app.listen(port);
var httpsPort = 8443;
var httpsServer = https.createServer({
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
}, app);
httpsServer.listen(httpsPort);
