"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
var util_1 = require("../../../app/shared/util");
var data_access_1 = require("../../../app/data/data-access");
var jwtDecode = require("jwt-decode");
function registerUser(req, res) {
    var hashedPassword = (0, util_1.hashPassword)(req.body.password);
    var userData = {
        email: req.body.email,
        password: hashedPassword,
    };
    (0, data_access_1.createUser)(userData);
    return res.json({ message: "User registered!" });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    var user = (0, data_access_1.getUser)(req.body.email);
    if (user) {
        var passwordMatches = (0, util_1.verifyPassword)(req.body.password, user.password);
        if (passwordMatches) {
            var jwt = (0, util_1.createToken)(user);
            var decodedJwt = jwtDecode.default(jwt);
            return res.json({
                message: "User logged!",
                access_token: jwt,
                expires: decodedJwt.exp,
            });
        }
        else {
            res.status(403).json({ message: "Invalid credentials!" });
        }
    }
    else {
        res.status(403).json({ message: "Invalid credentials!" });
    }
}
exports.loginUser = loginUser;
