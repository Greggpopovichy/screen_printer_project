//require passport-local, define strategy
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');

//creating database connection
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

// expose this function to our app using module.exports
module.exports = function(passport) {

    // passport session setup
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to save the user in session and terminate the users session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // LOCAL SIGNUP
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
                // by default, local strategy uses username and password
                usernameField : 'username',
                passwordField : 'password',
                firstNameField: 'user_first_name',
                lastNameField: 'user_last_name',
                numberField: 'user_number',
                emailField: 'user_email',
                passReqToCallback : true // allows us to pass back the entire request to the callback
        },
            function(req, username, password, done) {
                // find a user whose username is the same as the forms username
                // we are checking to see if the user trying to login already exists
                connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        // if there is no user with that username
                        // create the user with encrypted password
                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null),
                            user_first_name: req.body.user_first_name,
                            user_last_name: req.body.user_last_name,
                            user_number: req.body.user_number,
                            user_email: req.body.user_email
                        };

                        var insertQuery = "INSERT INTO users (username, password, user_first_name, user_last_name, user_number, user_email) VALUES (?,?,?,?,?,?)";

                        connection.query(insertQuery,[
                            newUserMysql.username,
                            newUserMysql.password,
                            newUserMysql.user_first_name,
                            newUserMysql.user_last_name,
                            newUserMysql.user_number,
                            newUserMysql.user_email
                        ], function(err, rows) {
                                newUserMysql.id = rows.insertId;
                                return done(null, newUserMysql);
                        });
                    }
                });
            })
        );

    // LOCAL LOGIN =============================================================
    // we are using named strategies since we have one for login and one for signup
    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) { // callback with email and password from form
                connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, rows[0], req.flash('loginMessage', 'Success'));
                });
            })
    );
};
