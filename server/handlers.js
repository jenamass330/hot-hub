"use strict";

const testing = (req, res) => {
    res.status(200).json({status: 200, data: "success"})
}

module.exports = {
    testing
}