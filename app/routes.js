module.exports = function(app, passport) {

    // This would eventually be a route to the home page (with link to the login page) ========

    app.get('/', function(req, res) {
        res.render('about'); // load the home page
    });

    app.get('/about', function(req,res){
        res.render('about', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/forgotPassword', function(req,res){
        res.render('forgotPW');
    });

    app.get('/checkauth', function(req, res){

        res.render('checkauth', {
            user : req.user // get the user out of session and pass to template
        });
        // res.status(200).json({
        //     status: 'Login successful!'
        // });
    });

    app.get('/placeorder', function(req, res){

        res.render('placeorder.handlebars', {
            user : req.user // get the user out of session and pass to template
        });
        // res.status(200).json({
        //     status: 'Login successful!'
        // });
    });


    // LOGIN ===============================
    // show the login form
    app.get('/login', function(req, res) {
        //logic if user redirect to index makes sure they dont see login again
        // render the page and pass in any flash data if it exists
        res.render('login', { user : req.user });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/checkauth', // redirect to the secure profile section
            failureRedirect : '/about', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; //cookie expires after 30 days
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/about');
        });

    // SIGNUP
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup', { layout: 'main.handlebars', action: 'Sign up', message: req.flash('signupMessage')});
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // PROFILE SECTION =========================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isAuthenticated, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



};

// route middleware to make sure
// function isLoggedIn(req, res, next) {
//
//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();
//
//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }
function isAuthenticated(req,res,next){
    if(req.user)
        return next();
    else
        return res.status(401).json({
            error: 'User not authenticated'
        })

}
