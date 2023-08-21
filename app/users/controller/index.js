"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
var data_access_1 = require("../../../app/data/data-access");
function registerUser(req, res) {
  var userData = {
    email: req.body.email,
    password: req.body.password,
  };
  (0, data_access_1.createUser)(userData);
  return res.json({ message: "User registered!" });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
  return res.json({ message: "User logged!" });
}
exports.loginUser = loginUser;
