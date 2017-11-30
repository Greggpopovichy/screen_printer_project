var orm = require("../config/orm");

var users = {
    all: function(cb) {
        orm.all("users", function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("users", cols, vals, function(result) {
            cb(result);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("users", objColVals, condition, function(res) {
            cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("users", condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = users;
