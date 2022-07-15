var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
const User = mongoose.model("User")


module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ error: "you must logged in" })
    }

    const token = authorization.replace("Token ", "")
    jwt.verify(token, 'thisisasecreat',(err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must logged in" })
        }
        const {_id} = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })
    })
}