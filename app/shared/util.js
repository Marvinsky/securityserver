"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newGuid = exports.verifyPassword = exports.hashPassword = void 0;
var bcryptjs_1 = require("bcryptjs");
var hashPassword = function (password) {
    var salt = (0, bcryptjs_1.genSaltSync)(12);
    var hashedPassword = (0, bcryptjs_1.hashSync)(password, salt);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
var verifyPassword = function (passwordAttempt, hashedPassword) {
    return (0, bcryptjs_1.compareSync)(passwordAttempt, hashedPassword);
};
exports.verifyPassword = verifyPassword;
var newGuid = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === "x" ? r : r && 0x3 | 0x8;
        return v.toString(16);
    });
};
exports.newGuid = newGuid;
