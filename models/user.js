var orm = require("../config/orm");

var users = {
    all: function(cb) {
        orm.all("orders", function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("orders", cols, vals, function(result) {
            cb(result);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = users;
