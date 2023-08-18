"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./app/players/controller");
var express = require("express");
var app = express();
var port = 8084;
var router = express.Router();
router.get("/", function (req, res) {
    res.json({ message: "Hi there, welcome to NativeScripting!" });
});
router.get("/players", controller_1.getPlayers);
router.get("/players/:id", controller_1.getPlayerById);
app.use("/api", router);
app.listen(port);
